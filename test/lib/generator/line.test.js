const tape = require('tape')
const { generateImport, generateAssignment, generateReturn, generateConsoleLog, generateFunctionCall } = require('../../../lib/generator/line')

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

tape('generateReturn : Should return a return statement', t => {
  t.plan(3)

  const stringReturn = generateReturn('"Hello"')
  const fakeArrayReturn = generateReturn('[a, b, c]')
  const objectReturn = generateReturn('{ a: 1, b: 2, c: 3}')

  t.equal(stringReturn, 'return "Hello"')
  t.equal(fakeArrayReturn, 'return [a, b, c]')
  t.equal(objectReturn, 'return { a: 1, b: 2, c: 3}')
})

tape('generateConsoleLog : Should return a log', t => {
  t.plan(3)

  const basicLog = generateConsoleLog('a')
  const basicStringLog = generateConsoleLog('"a"')
  const multiValuesLog = generateConsoleLog(['a', 'b', 'c'])

  t.equal(basicLog, 'console.log(a)')
  t.equal(basicStringLog, 'console.log("a")')
  t.equal(multiValuesLog, 'console.log(a, b, c)')
})

tape('generateFunctionCall : should return a function call', t => {
  t.plan(2)

  const basicFnCall = generateFunctionCall('app.use', 'datMiddleware')
  const multiArgsFnCall = generateFunctionCall('getData', 'type, payload')

  t.equal(basicFnCall, 'app.use(datMiddleware)')
  t.equal(multiArgsFnCall, 'getData(type, payload)')
})
