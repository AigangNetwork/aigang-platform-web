import Web3 from 'web3'

const loadWeb3 = async () => {
  if (window.ethereum) {
    try {
      // Request account access if needed
      await window.ethereum.enable()
      window.web3 = new Web3(window.ethereum)
      return true
    } catch (error) {
      // User denied account access...
      console.warn('Unable to connect to web3 client')
      return false
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    return true
  } else {
    console.warn('Unable to connect to web3 client')
    window.web3 = null
    return false
  }
}

export default loadWeb3
