import moment from 'moment'
import EthUtils from '../utils/EthUtils'

export default class Policy {
  async initializeItem (details) {
    this.id = EthUtils.fromHex(details.id)
    this.deviceId = 'UNKNOW'
    this.startUtc = moment.unix(details.utcStart).utc()
    this.endUtc = moment.unix(details.utcEnd).utc()
    this.status = mapStatus(details)
    this.address = details.address
    this.type = details.type
  }

  async initialize (details) {
    this.id = EthUtils.fromHex(details.id)
    this.startUtc = moment.unix(details.utcStart).utc()
    this.endUtc = moment.unix(details.utcEnd).utc()
    this.status = mapStatus(details)
    this.premium = EthUtils.fromWei(details.premium)
    this.payout = EthUtils.fromWei(details.payout)
    this.payoutUtc = moment.unix(details[2]).utc().format(details.utcPayoutDate)
    this.properties = details.properties
    this.claimProperties = details.claimProperties
    this.address = details.address
    this.policyTermInDays = Math.floor(
      moment.duration(moment.unix(details.utcEnd).utc().diff(moment.unix(details.utcStart).utc())).asDays()
    )
    this.walletAddress = details.walletAddress
    this.createUtc = moment.unix(details[2]).utc().format(details.created)
  }

  static async createItem (contract, type, id) {
    const details = await contract.methods.policies(id).call()

    details.id = id
    details.address = contract._address
    details.type = type

    const policy = new Policy()
    await policy.initializeItem(details)

    return policy
  }

  static async create (contract, type, id, walletAddress) {
    const details = await contract.methods.policies(id).call()
    details.walletAddress = walletAddress
    details.id = id
    details.address = contract._address
    details.type = type

    const policy = new Policy()
    await policy.initialize(details)

    return policy
  }
}

const mapStatus = details => {
  if (details.isCanceled === true) return 'canceled'

  if (parseInt(details.payout) !== 0) return 'paidout'

  if (details.claimProperties) return 'claimable'

  if (parseInt(details.premium) !== 0) return 'paid'
}
