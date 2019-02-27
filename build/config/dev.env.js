'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./production.env.js')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  API_ADDRESS: '"http://localhost:5000/api"',
  ETHERSCAN_ADDRESS: '"https://ropsten.etherscan.io/"',
  ETHERSCAN_API_KEY: '"FVIK192HIJFEICSMVIFV5RUMQ1PBWXK8ZR"',
  TX_PATH: '"tx/"',
  ABI_PATH: '"/api?module=contract&action=getabi"',
  ADDRESS_PATH: '"address/"',
  ANDROID_APP_LOCATION: '"https://github.com/AigangNetwork/aigang-insurance-app/tree/master/android"',
  RETRY_COUNT: 10,
  POOLS_ITEMS_PER_PAGE: 9,
  PREDICTIONS_ITEMS_PER_PAGE: 9,
  CONTRIBUTIONS_ITEMS_PER_PAGE: 9,
  FORECASTS_ITEMS_PER_PAGE: 9,
  GAS: {
    ADD_FORECAST: 600000,
    FORECAST_PAYOUT: 400000,
    POLICY_PAYMENT: 190000,
    ADD_CONTRIBUTION: 450000,
    PAYOUT_CONTRIBUTION: 200000,
    REFUND_CONTRIBUTION: 200000
  },
  CONTRACTS_ADDRESSES: {
    ADDRESS_MANAGER: '"0x2ea241d5ecb81b9e0b2f8e21ca94e11e76a9e78d"',
    TOKEN: '"0xFeEaed9eeb9bbf07E3bBB627CC736172CB04C776"'
  },
  CONTRACT_TYPES: {
    POOLS: 1,
    PREDICTIONS: 2,
    INSURANCE: 3
  },
  CONTRACT_STATUS: {
    CANCELED: 2
  },
  FEATURE_TOGGLE: {
    DATA: true,
    PREDICTIONS: true,
    POOLS: true,
    INSURANCE: true,
    WIKI: true,
    DISCUSSIONS: true
  }
})
