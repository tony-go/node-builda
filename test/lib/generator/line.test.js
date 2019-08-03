const tape = require('tape')
const { generateImport, generateAssignment } = require('../../../lib/generator/line')

tape('generateImport : Should return a string within an import line', t => {
  t.plan(3)

  const defaultImport = generateImport('express', 'app')
  const multipleImport = generateImport('react', ['useEffect', 'useState'])
  const multipleImportAndDefault = generateImport('react', 'React', ['useEffect', 'useState'])

  t.equal(defaultImport, 'const app = require(\'express\')')
  t.equal(multipleImport, 'const { useEffect, useState } = require(\'react\')')
  t.equal(multipleImportAndDefault, 'const React, { useEffect, useState } = require(\'react\')')
})

tape('assign : Should return a string within assign line', t => {
  t.plan(5)

  const basicDeclarativeAssign = generateAssignment('this', 'self', false, true)
  const basicAssign = generateAssignment('"hello world"', 'ctx.body', false, false)
  const callAssign = generateAssignment('express', 'app', true, true)
  const destructuredAssign = generateAssignment('reduxForm', ['change', 'formValueSelector'], false, true)
  const destructuredCalledAssign = generateAssignment('stateFormatter', ['init', 'success'], true, true)

  t.equal(basicDeclarativeAssign, 'const self = this')
  t.equal(basicAssign, 'ctx.body = "hello world"')
  t.equal(callAssign, 'const app = express()')
  t.equal(destructuredAssign, 'const { change, formValueSelector } = reduxForm')
  t.equal(destructuredCalledAssign, 'const { init, success } = stateFormatter()')
})
