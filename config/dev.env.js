'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ADDRESS: '"http://test.api.aigang.network/api"'
  API_ADDRESS: '"http://localhost:5000/api"'
})
