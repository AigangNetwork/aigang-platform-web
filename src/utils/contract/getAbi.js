import axios from 'axios'
import store from '../../store'

const getAbi = async address => {
  let abi = store.getters['utils/getAbi'](address)

  if (abi) {
    return abi
  }

  const path = `${process.env.ETHERSCAN_ADDRESS}${process.env.ABI_PATH}&address=${address}&apikey=${
    process.env.ETHERSCAN_API_KEY
  }`

  // Need to delete because of CORS
  delete axios.defaults.headers.common['Authorization']
  const response = await axios.get(path)

  if (response.data.message === 'NOTOK') throw new Error('Cannot find abi with address: ' + address)

  abi = JSON.parse(response.data.result)
  store.dispatch('utils/addAbi', { address, abi })
  return abi
}

export default getAbi
