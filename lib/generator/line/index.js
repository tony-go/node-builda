'use strict'

const { renderStringProperties } = require('../helpers')

function generateImport (module, defaultImportName, properties) {
  if (!module || typeof module !== 'string') throw new Error('Argument module (String) is required')
  if (!defaultImportName || (
    typeof defaultImportName !== 'string' &&
    !Array.isArray(defaultImportName)
  )) {
    throw new Error('You should pass at least a defaultImport argument (String) or a properties argument (Array)')
  }

  if (defaultImportName && Array.isArray(defaultImportName)) {
    properties = defaultImportName
    defaultImportName = null
  }

  let d = ''
  let p = ''
  if (defaultImportName) {
    if (properties) {
      d = `${defaultImportName}, `
    } else {
      d = defaultImportName
    }
  }
  if (properties) {
    if (properties.length > 1) {
      p = `{ ${renderStringProperties(properties)} }`
    } else {
      p = `{ ${properties} }`
    }
  }

  return `const ${d + p} = require('${module}')`
}

function generateAssignment (target, varName, isCall, isDeclarative) {
  if (!target || typeof target !== 'string') throw new Error('Argument target (String) is required')
  if (!varName && (
    typeof varName !== 'string' ||
    !Array.isArray(varName)
  )) {
    throw new Error('Argument varName (String || Array) is required')
  }

  let v = ''

  if (typeof varName === 'string') {
    v = varName
  } else if (Array.isArray(varName)) {
    v = `{ ${renderStringProperties(varName)} }`
  }

  const t = isCall ? `${target}()` : target

  return isDeclarative ? `const ${v} = ${t}` : `${v} = ${t}`
}

function generateReturn (target) {
  if (!target || typeof target !== 'string') throw new Error('Target argument (String) is Required')
  return `return ${target}`
}

function generateConsoleLog (targets) {
  if (!targets || (
    typeof targets !== 'string' &&
    !Array.isArray(targets)
  )) throw new Error('Target argument (String) is Required')
  return `console.log(${renderStringProperties(targets)})`
}

module.exports = {
  generateImport,
  generateAssignment,
  generateReturn,
  generateConsoleLog
}
