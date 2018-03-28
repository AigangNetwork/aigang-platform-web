'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./production.env.js')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  API_ADDRESS: '"http://localhost:5000/api"'
})
