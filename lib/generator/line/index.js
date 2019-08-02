'use strict'

function renderStringProperties (properties) {
  let props = ''
  properties.forEach((prop, index) => {
    if (index === properties.length - 1) {
      props += prop
    } else {
      props += `${prop}, `
    }
  })
  return props
}

function generateImport (module, defaultImportName, properties) {
  if (!module) throw new Error('Module argument is required.')
  if (typeof module !== 'string') throw new Error('Module argument should be a string')
  if (!defaultImportName && !properties) throw new Error('You should pass a default import or a property at least')

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

module.exports = {
  generateImport
}
