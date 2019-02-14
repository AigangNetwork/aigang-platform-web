import getAbi from '@/utils/contract/getAbi'

const getContracts = async typeId => {
  const managerAddress = process.env.CONTRACTS_ADDRESSES.ADDRESS_MANAGER
  const manageAbi = await getAbi(managerAddress)

  const managerContract = new window.web3.eth.Contract(manageAbi, managerAddress)

  const length = await managerContract.methods.getLength(typeId).call()

  const contracts = []

  for (let i = 0; i < length; i++) {
    const address = await managerContract.methods.get(typeId, i).call()
    const abi = await getAbi(address[0])
    const contract = new window.web3.eth.Contract(abi, address[0])
    contracts.push(contract)
  }

  return contracts
}

export default getContracts
