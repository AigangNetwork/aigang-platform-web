import Web3 from 'web3'
import aixContractInfo from '../contract/aixContractInfo'
import networkResolver from './networkResolver'
import eventHub from '@/utils/eventHub'

let getWeb3 = async () => {
  const web3 = () => {
    if (window.web3) {
      return new Web3(window.web3.currentProvider)
    } else {
      console.warn('Unable to connect to web3 client')
      return null
    }
  }

  const networkId = await web3().eth.net.getId()

  const requiredNetwork = networkResolver(process.env.NODE_ENV)

  if (requiredNetwork.networkId !== networkId) {
    eventHub.$emit(eventHub.eventMetamaskNetworkError, requiredNetwork.networkName)
    return
  }

  const accounts = await web3().eth.getAccounts()
  const coinbase = accounts[0]

  if (!coinbase) {
    eventHub.$emit(eventHub.eventMetamaskAccountWasNotFound)
    return
  }

  const ethBalanceInWei = await web3().eth.getBalance(coinbase)
  const ethBalance = web3().utils.fromWei(ethBalanceInWei)

  const tempWeb3 = web3()
  const aixContract = new tempWeb3.eth.Contract(aixContractInfo.ABI, aixContractInfo.ADDRESS)

  const aixBalanceInWei = await aixContract.methods.balanceOf(coinbase).call()
  const aixBalance = web3().utils.fromWei(aixBalanceInWei)

  return {
    web3,
    networkId,
    coinbase,
    ethBalance,
    aixBalance
  }
}
export default getWeb3
