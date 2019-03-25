import moment from 'moment'
import EthUtils from '@/utils/EthUtils'

export default class Pool {
  async initialize (data) {
    this.id = data.id
    this.entityId = data.destination
    this.title = data.title
    this.description = data.description
    this.status = mapPoolStatus(data.status)
    this.startDateUtc = moment.unix(data.contributionStartUtc).utc().format('YYYY-MM-DD HH:mm')
    this.endDateUtc = moment.unix(data.contributionEndUtc).utc().format('YYYY-MM-DD HH:mm')
    this.entityContractAddress = data.destination
    this.poolContractAddress = data.address
    this.contributions = data.contributions
    this.currentPoolSize = EthUtils.fromWei(data.amountCollected)
    this.goalPoolSize = EthUtils.fromWei(data.amountLimit)
  }

  static async create (contract, id) {
    const data = await contract.methods.pools(id).call()
    data.contributions = await contract.methods.getPoolContributionsLength(id).call()
    data.address = contract._address
    data.id = id

    const pool = new Pool()
    await pool.initialize(data)
    return pool
  }
}
const mapPoolStatus = status => {
  switch (status) {
    case '0':
      return 'notset'
    case '1':
      return 'active'
    case '2':
      return 'distributing'
    case '3':
      return 'funding'
    case '4':
      return 'paused'
    case '5':
      return 'canceled'
    default:
      return 'notset'
  }
}
