import moment from 'moment'

export default class InsuranceProduct {
  async initialize (details) {
    this.address = details.address
    this.premiumCalculatorAddress = details[0]
    this.investorsPoolAddress = details[1]
    this.startDateUtc = moment.unix(details[2]).format('YYYY-MM-DD HH:mm')
    this.endDateUtc = moment.unix(details[3]).format('YYYY-MM-DD HH:mm')
    this.title = details[4]
    this.description = details[5]
    this.policyTermInSeconds = details[6]
    this.basePremium = window.web3.utils.fromWei(details[7])
    this.payout = window.web3.utils.fromWei(details[8])
    this.fee = details[9]
    this.policiesLimit = details[10]
    this.productPoolLimit = details[11]
    this.createdUtc = moment.unix(details[12]).format('YYYY-MM-DD HH:mm')
    this.type = details.type
  }

  static async createItem (contract, type) {
    const details = await contract.methods.getProductDetails().call()

    details.address = contract._address
    details.type = type

    const product = new InsuranceProduct()
    await product.initialize(details)

    return product
  }

  static async create (contract, type) {
    const details = await contract.methods.getProductDetails().call()

    details.address = contract._address
    details.type = type
    const product = new InsuranceProduct()
    await product.initialize(details)

    return product
  }
}
