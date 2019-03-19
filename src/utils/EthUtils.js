import axios from 'axios'
const web3 = window.web3

const contractsCache = {}

export default class EthUtils {
  static async getAbi (address) {
    const path = `${process.env.ETHERSCAN_ADDRESS}${process.env.ABI_PATH}&address=${address}&apikey=${
      process.env.ETHERSCAN_API_KEY
    }`

    // Need to delete because of CORS
    delete axios.defaults.headers.common['Authorization']
    const response = await axios.get(path)

    if (response.data.message === 'NOTOK') throw new Error('Cannot find abi with address: ' + address)

    const abi = JSON.parse(response.data.result)
    return abi
  }

  static async getContracts (typeId) {
    const managerContract = await this.getContract(process.env.CONTRACTS_ADDRESSES.ADDRESS_MANAGER)

    const length = await managerContract.methods.getLength(typeId).call()

    const contracts = []

    for (let i = length - 1; i >= 0; i--) {
      const contractInfo = await managerContract.methods.get(typeId, i).call()

      if (parseInt(contractInfo[2]) === process.env.CONTRACT_STATUS.CANCELED) {
        continue
      }

      const contract = await this.getContract(contractInfo[0])
      contracts.push(contract)
    }

    return contracts
  }

  static async getContract (address) {
    let contract = contractsCache[address]

    if (contract) {
      return contract
    }

    const abi = await this.getAbi(address)

    if (!window.web3 || !window.web3.eth.Contract) return null
    contract = new window.web3.eth.Contract(abi, address)

    contractsCache[address] = contract

    return contract
  }

  static getHex (x) {
    let result

    // Some wallets use older web3, that does not have toHex()
    if (web3 && web3.toHex) {
      result = web3.toHex(x)
    } else {
      result = '0x' + parseInt(x).toString(16)
    }

    if (result.length % 2 === 1) {
      // bug https://github.com/ethereum/web3.js/issues/873
      result = result.replace('0x', '0x0')
    }

    return result
  }

  static fromHex (value) {
    return web3.toAscii(value)
  }

  static fromWei (value) {
    return window.web3.utils.fromWei(value)
  }

  static toWei (value) {
    return window.web3.utils.toWei(value)
  }
}
