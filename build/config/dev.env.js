'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./production.env.js')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
