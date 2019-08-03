#!/usr/bin/env node
'use strict'

process.title = 'node-builda'

// example of map object according to command line args

const mapReference = {
  framework: {
    express: {
      imports: [
        { module: 'express', defaultImport: 'express' },
        { module: 'body-parser', defaultImport: 'bodyParser' }
      ],
      assign: [
        { target: 'express', varName: 'app', isCall: true }
      ],
      calls: []
    }
  },
  db: {}
}

console.log(mapReference)

// test => visit ./test

const line = require('./lib/generator/line')

console.log(line.generateImport('vuex', ['mapState', 'mapAction', 'mapGetters']))
console.log(line.generateImport('express', 'app'))
console.log(line.generateImport('react', 'React', ['useEffect', 'useState']))
