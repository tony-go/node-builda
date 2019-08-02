const tape = require('tape')
const { generateImport } = require('../../../lib/generator/line')

tape('#generateImport : Should return a string with an import line', t => {
  t.plan(3)

  const defaultImport = generateImport('express', 'app')
  const multipleImport = generateImport('react', ['useEffect', 'useState'])
  const multipleImportAndDefault = generateImport('react', 'React', ['useEffect', 'useState'])
  t.equal(defaultImport, 'const app = require(\'express\')')
  t.equal(multipleImport, 'const { useEffect, useState } = require(\'react\')')
  t.equal(multipleImportAndDefault, 'const React, { useEffect, useState } = require(\'react\')')
})
