import moment from 'moment'
import EthUtils from '@/utils/EthUtils'

export default class Prediction {
  async initialize (data, details, outcomes) {
    this.id = data.id
    this.status = mapPredictionStatus(data.status)
    this.fee = parseFloat(window.web3.utils.fromWei(data.fee))
    this.marketAddress = data.address
    this.title = details[0]
    this.description = details[1]
    this.poolSize = window.web3.utils.fromWei(data.totalTokens)
    this.forecastStartUtc = moment.unix(data.forecastStartUtc).format('YYYY-MM-DD HH:mm')
    this.forecastEndUtc = moment.unix(data.forecastEndUtc).format('YYYY-MM-DD HH:mm')
    this.forecastsCount = data.totalForecasts
    this.resultStorage = data.resultStorage
    this.outcomes = outcomes
    this.prizeCalculator = data.prizeCalculator
    this.initialTokens = window.web3.utils.fromWei(data.initialTokens)
  }

  async initializeOutcomes (outcomes) {
    this.outcomes = outcomes

    if (this.status === 'resolved') {
      const resultContract = await EthUtils.getContract(this.resultStorage)
      const result = await resultContract.methods.getResult(this.id).call()

      this.resultOutcomeId = parseInt(result)
      this.resultOutcomeIndex = parseInt(result)
      this.resultOutcomeName = this.outcomes[this.resultOutcomeIndex - 1].name
    }
  }

  static async create (address, id) {
    const contract = await EthUtils.getContract(address)
    const data = await contract.methods.predictions(id).call()
    const details = await contract.methods.predictionDetails(id).call()
    const outcomes = []

    for (let i = 1; i <= data.outcomesCount; i++) {
      const outcome = await contract.methods.getOutcome(id, i).call()
      outcomes.push({
        id: i,
        name: outcome[1],
        index: i,
        totalTokens: window.web3.utils.fromWei(outcome[3])
      })
    }

    data.address = address
    data.id = id

    const prediction = new Prediction()
    await prediction.initialize(data, details)
    await prediction.initializeOutcomes(outcomes)
    return prediction
  }

  static async createItem (contract, id) {
    const data = await contract.methods.predictions(id).call()
    const details = await contract.methods.predictionDetails(id).call()

    data.address = contract._address
    data.id = id

    const prediction = new Prediction()
    await prediction.initialize(data, details)
    return prediction
  }
}

const mapPredictionStatus = status => {
  switch (status) {
    case '0':
      return 'notset'
    case '1':
      return 'published'
    case '2':
      return 'resolved'
    case '3':
      return 'paused'
    case '4':
      return 'canceled'
    default:
      return 'notset'
  }
}
