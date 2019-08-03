const tape = require('tape')
const { generateFunction } = require('../../../lib/generator/block')
const { getBeautify } = require('../../../lib/generator/helpers')

tape('generateFunction : Should return a multiline string within a function', t => {
  t.plan(3)

  const basicAsyncFunction = generateFunction(
    'ctx',
    [{
      type: 'assign',
      payload: {
        target: '"Hello World"',
        varName: 'ctx.body',
        isCall: false,
        isDeclarative: false
      } }],
    'test',
    true
  )
  const basicFunction = generateFunction(
    ['a', 'b'],
    [{
      type: 'assign',
      payload: {
        target: 'a + b',
        varName: 'result',
        isCall: false,
        isDeclarative: true
      }
    }, {
      type: 'return',
      payload: {
        target: 'result'
      }
    }]
  )
  const functionInFunction = generateFunction(
    'a',
    [`return ${generateFunction(
      'b',
      [{
        type: 'return',
        payload: {
          target: 'a + b'
        }
      }]
    )}`]
  )

  t.equal(basicAsyncFunction,
    getBeautify(`async function test (ctx) {
      ctx.body = "Hello World"
    }`)
  )
  t.equal(basicFunction,
    getBeautify(`function (a, b) {
      const result = a + b
      return result
    }`)
  )
  t.equal(
    functionInFunction,
    getBeautify(`function (a) {
      return function (b) {
        return a + b
      }
    }`)
  )
})
