import axios from 'axios'

const getAbi = async address => {
  const path =
    process.env.ETHERSCAN_ADDRESS +
    process.env.ABI_PATH +
    `&address=${address}` +
    `&apikey=${process.env.ETHERSCAN_API_KEY}`

  // Need to delete because of CORS
  delete axios.defaults.headers.common['Authorization']
  const response = await axios.get(path)

  return JSON.parse(response.data.result)
}

export default getAbi
