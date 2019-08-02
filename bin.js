#!/usr/bin/env node
'use strict'

process.title = 'node-builda'

// test

const line = require('./lib/generator/line')

console.log(line.generateImport('vuex', ['mapState', 'mapAction', 'mapGetters']))
console.log(line.generateImport('express', 'app'))
console.log(line.generateImport('react', 'React', ['useEffect', 'useState']))
