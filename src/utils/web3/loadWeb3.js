import Web3 from 'web3'

const loadWeb3 = async () => {
  if (window.ethereum) {
    try {
      // Request account access if needed
      await window.ethereum.enable()
      window.web3 = new Web3(window.ethereum)
    } catch (error) {
      // User denied account access...
      console.warn('Unable to connect to web3 client')
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    console.warn('Unable to connect to web3 client')
    window.web3 = null
  }
}

export default loadWeb3
