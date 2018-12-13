'use strict'

const utils = require('./utils.js')
const config = require('./config')
const isProduction = process.env.NODE_ENV === 'production'

let sourceMapEnabled;

switch (process.env.NODE_ENV) {
  case 'production':
    sourceMapEnabled = config.production.productionSourceMap
    break
  case 'production':
    sourceMapEnabled = config.qa.productionSourceMap
    break
  default:
    sourceMapEnabled = config.dev.cssSourceMap
}

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
