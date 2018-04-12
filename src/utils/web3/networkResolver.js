export default function (environment) {
  let network = {
    networkId: null,
    networkName: ''
  }
  switch (environment) {
    case 'dev':
      network.networkId = 3
      network.networkName = 'Ropsten testnet'
      break
    case 'qa':
      network.networkId = 3
      network.networkName = 'Ropsten testnet'
      break
    case 'production':
      network.networkId = 1
      network.networkName = 'Mainet'
      break
    default:
      network.networkId = 1
      network.networkName = 'Mainet'
  }
  return network
}
