'use strict'

module.exports = {
  NODE_ENV: '"dev"',

  // Select which tabs should be active and visible
  FEATURE_TOGGLE: {
    DATA: true,
    PREDICTIONS: true,
    POOLS: true,
    INSURANCE: true,
    WIKI: true,
    DISCUSSIONS: true
  },
  // If Data Feature toggle enabled set navigation link
  NAVIGATION_DATA_URL: '"https://testdata.aigang.network"',

  // Set insurance api address
  API_ADDRESS: '"http://localhost:5000/api"', 

  // Configure ABI reading parameters and transactions paths
  ETHERSCAN_ADDRESS: '"https://ropsten.etherscan.io/"',
  ETHERSCAN_API_KEY: '"FVIK192HIJFEICSMVIFV5RUMQ1PBWXK8ZR"',
  TX_PATH: '"tx/"',
  ABI_PATH: '"/api?module=contract&action=getabi"',
  ADDRESS_PATH: '"address/"',

  // List items per pages
  INSURANCE_PRODUCT_ITEMS_PER_PAGE: 9,
  POLICY_ITEMS_PER_PAGE: 12,
  POOLS_ITEMS_PER_PAGE: 9,
  PREDICTIONS_ITEMS_PER_PAGE: 9,
  CONTRIBUTIONS_ITEMS_PER_PAGE: 9,
  FORECASTS_ITEMS_PER_PAGE: 9,

  // Setup deployed contract addresses
  CONTRACTS_ADDRESSES: {
    ADDRESS_MANAGER: '"0x2ea241d5ecb81b9e0b2f8e21ca94e11e76a9e78d"',
    TOKEN: '"0xFeEaed9eeb9bbf07E3bBB627CC736172CB04C776"'
  },

  // Configure types from ADDRESS_MANAGER contract
  CONTRACT_TYPES: {
    POOLS: 1,
    PREDICTIONS: 2,
    INSURANCE: {
      ANDROID_BATTERY: 3
    }
  },

  CONTRACT_STATUS: {
    CANCELED: 2 // If ADDRESS_MANAGER contract has status 2 items are not displayed in web
  },

  // Insurance Configuration. Product Type 3
  RETRY_COUNT: 10,
  ANDROID_APP_LOCATION: '"https://github.com/AigangNetwork/aigang-insurance-app/tree/master/android"'
}
