'use strict'

const { renderStringProperties, getBeautify } = require('../helpers')
const { generateAssignment, generateReturn } = require('../line')

const mapGenerator = {
  assign: generateAssignment,
  return: generateReturn
}

function generateFunction (args, lines, name, isAsync) {
  if (!args || (typeof args !== 'string' && !Array.isArray(args))) {
    throw new Error('Argument args (String || Array) is required')
  }
  if (!lines || !Array.isArray(lines)) {
    throw new Error('Lines args (Array of Object) is required')
  }
  if (!Array.isArray(args)) args = [args]

  // create start and close line
  let startLine = name
    ? `function ${name} (${renderStringProperties(args)}) {`
    : `function (${renderStringProperties(args)}) {`
  startLine = isAsync ? 'async ' + startLine : startLine
  const closeLine = '}'

  // let create content
  let content = null
  lines.forEach(line => {
    let { type, payload } = line
    let mapFunc
    if (type && payload) {
      mapFunc = mapGenerator[type]
      payload = Object.values(payload)
    } else {
      mapFunc = null
      payload = null
    }
    if (!content) {
      content = `${mapFunc ? mapFunc(...payload) : line}`
    } else {
      content = `${content}
    ${mapFunc ? mapFunc(...payload) : line}`
    }
  })

  return getBeautify(`${startLine}
    ${content}
  ${closeLine}`)
}

function generateFunctionCall () {
  return null
}

module.exports = {
  generateFunction,
  generateFunctionCall
}
