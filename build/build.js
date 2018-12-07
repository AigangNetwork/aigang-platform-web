'use strict'

require('./check-versions')()

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./config')

const webpackQAConfig = require('./webpack.qa.conf.js')
const webpackProductionConfig = require('./webpack.production.conf.js')

const webpackConfig = process.env.NODE_ENV === 'qa' ? webpackQAConfig : webpackProductionConfig
const assetRoot = process.env.NODE_ENV === 'qa' ? config.qa.assetsRoot : config.production.assetsRoot
const assetsSubDirectory = process.env.NODE_ENV === 'qa' ? config.qa.assetsSubDirectory : config.production.assetsSubDirectory

const spinner = ora(`building for ${process.env.NODE_ENV}...`)
spinner.start()

rm(path.join(assetRoot, assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(
      chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
          "  Opening index.html over file:// won't work.\n"
      )
    )
  })
})
