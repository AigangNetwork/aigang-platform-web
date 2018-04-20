import Web3 from 'web3'
import aixContractInfo from '../contract/aixContractInfo'
import networkResolver from './networkResolver'
import eventHub from '@/utils/eventHub'

let getWeb3 = function () {
  return new Promise(function (resolve, reject) {
    var web3js = window.web3
    if (typeof web3js !== 'undefined') {
      var web3 = new Web3(web3js.currentProvider)
      resolve({
        web3 () {
          return web3
        }
      })
    } else {
      reject(console.warn('Unable to connect to Metamask'))
    }
  })
    .then(result => {
      return new Promise(function (resolve, reject) {
        result
          .web3()
          .eth.net.isListening()
          .then(isInjected => {
            result = Object.assign({}, result, { isInjected })
            resolve(result)
          })
          .catch(e => {
            reject(e)
          })
      })
    })
    .then(result => {
      return new Promise(function (resolve, reject) {
        result.web3().eth.net.getId((err, networkId) => {
          if (err) {
            reject(console.warn('Unable to retrieve network ID'))
          } else {
            let requiredNetwork = networkResolver(process.env.NODE_ENV)
            let currentUserNetworkId = networkId
            if (requiredNetwork.networkId !== currentUserNetworkId) {
              reject(console.warn('Wrong Metamask network selected'))
              eventHub.$emit(
                eventHub.eventMetamaskNetworkError,
                requiredNetwork.networkName
              )
            } else {
              result = Object.assign({}, result, { networkId })
              resolve(result)
            }
          }
        })
      })
    })
    .then(result => {
      return new Promise(function (resolve, reject) {
        result
          .web3()
          .eth.getCoinbase()
          .then(coinbase => {
            if (coinbase) {
              result = Object.assign({}, result, { coinbase })
              resolve(result)
            } else {
              eventHub.$emit(eventHub.eventMetamaskAccountWasNotFound)
              reject(console.warn('Unable to get Metamask account'))
            }
          })
      })
    })
    .then(result => {
      return new Promise(function (resolve, reject) {
        // Retrieve balance for coinbase
        result.web3().eth.getBalance(result.coinbase, (err, ethBalance) => {
          if (err) {
            reject(
              console.warn(
                'Unable to retrieve balance for address: ' + result.coinbase
              )
            )
          } else {
            ethBalance = result.web3().utils.fromWei(ethBalance)
            result = Object.assign({}, result, { ethBalance })
            resolve(result)
          }
        })
      })
    })
    .then(result => {
      return new Promise(function (resolve, reject) {
        let tempWeb3 = result.web3()
        let aixContract = new tempWeb3.eth.Contract(
          aixContractInfo.ABI,
          aixContractInfo.ADDRESS
        )
        aixContract.methods
          .balanceOf(result.coinbase)
          .call()
          .then(response => {
            let aixBalance = tempWeb3.utils.fromWei(response)
            result = Object.assign({}, result, { aixBalance })
            resolve(result)
          })
          .catch(e => {
            reject(console.warn(e))
          })
      })
    })
}
export default getWeb3
