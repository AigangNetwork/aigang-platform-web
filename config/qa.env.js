'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"qa"',
  API_ADDRESS: '"http://test.api.aigang.network/api"'
})
