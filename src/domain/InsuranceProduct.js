import moment from 'moment'
import EthUtils from '@/utils/EthUtils'

export default class InsuranceProduct {
  async initialize (details) {
    this.address = details.address
    this.premiumCalculatorAddress = details[0]
    this.investorsPoolAddress = details[1]
    this.startDateUtc = moment
      .unix(details[2])
      .utc()
      .format('YYYY-MM-DD HH:mm')
    this.endDateUtc = moment
      .unix(details[3])
      .utc()
      .format('YYYY-MM-DD HH:mm')
    this.title = details[4]
    this.description = details[5]
    this.policyTermInDays = Math.floor(parseInt(details[6]) / (60 * 60 * 24))
    this.basePremium = EthUtils.fromWei(details[7])
    this.payout = EthUtils.fromWei(details[8])
    this.fee = details[9]

    this.productPoolLimit = details[11]
    this.createdUtc = moment
      .unix(details[12])
      .utc()
      .format('YYYY-MM-DD HH:mm')
    this.type = details.type

    const policiesLimit = parseInt(details[10])
    this.isPoliciesLimitReached = policiesLimit <= details.policiesCount

    const poolLimit = parseInt(details[11])
    this.isPoolLimitReached = poolLimit <= details.poolSize
  }

  static async create (contract, type) {
    const details = await contract.methods.getProductDetails().call()
    const stats = await contract.methods.getProductStats().call()

    details.address = contract._address
    details.type = type
    details.policiesCount = parseInt(stats[2])
    details.poolSize = parseInt(stats[1])

    const product = new InsuranceProduct()
    await product.initialize(details)

    return product
  }
}
