#!/usr/bin/env node
'use strict'

process.title = 'node-builda'

// example of map object according to command line args

const mapReference = {
  framework: {
    express: {
      imports: {
        regular: [
          { module: 'express', defaultImport: 'express' },
          { module: 'body-parser', defaultImport: 'bodyParser' }
        ],
        extra: []
      },
      core: {
        regular: [],
        extra: []
      },
      exports: []
    }
  },
  db: {},
  package: {},
  linter: null, // for V2
  ci: null // for V2
}

console.log(mapReference)

// test => visit ./test

const line = require('./lib/generator/line')

console.log(line.generateImport('vuex', ['mapState', 'mapAction', 'mapGetters']))
console.log(line.generateImport('express', 'app'))
console.log(line.generateImport('react', 'React', ['useEffect', 'useState']))
