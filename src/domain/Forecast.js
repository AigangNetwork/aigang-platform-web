import moment from 'moment'
import Prediction from './Prediction'
import EthUtils from '@/utils/EthUtils'

export default class Forecast {
  async initializeItem (forecastData, prediction, outcomeData) {
    this.isWon = prediction.resultOutcomeId === parseInt(forecastData[4])
    this.id = forecastData.id
    this.predictionTitle = prediction.title
    this.outcomeTitle = outcomeData[1]
    this.amount = parseFloat(EthUtils.fromWei(forecastData[3]))
    this.status = mapForecastStatus(forecastData[5], prediction.status, this.isWon)
    this.predictionStatus = prediction.status
    this.createdUtc = moment.unix(forecastData[6]).utc().format('YYYY-MM-DD HH:mm')
    this.marketAddress = prediction.marketAddress
  }

  async initialize (forecastData, prediction, outcomeData) {
    this.predictionId = prediction.id
    this.predictionDescription = prediction.description
    this.fee = prediction.fee
    this.forecastStartUtc = prediction.forecastStartUtc
    this.forecastEndUtc = prediction.forecastEndUtc
    this.poolSize = prediction.poolSize
    this.forecastsCount = prediction.forecastsCount
    this.resultOutcomeId = prediction.resultOutcomeId
    this.resultOutcomeIndex = prediction.resultOutcomeIndex
    this.resultOutcomeName = prediction.resultOutcomeName

    if (this.isWon) {
      const prizeCalculator = await EthUtils.getContract(prediction.prizeCalculator)
      const amount = await prizeCalculator.methods
        .calculatePrizeAmount(EthUtils.toWei(this.poolSize), outcomeData[3], forecastData[3])
        .call()
      this.wonAmount = EthUtils.fromWei(amount)
    }

    this.outcomeId = forecastData[4]
    this.outcomeTitle = outcomeData[1]
    this.outcomeIndex = forecastData[4]

    this.getPrediction = () => prediction
  }

  static async createItem (contract, id) {
    const forecastData = await contract.methods.getForecast(id).call()
    const prediction = await Prediction.create(contract._address, forecastData[1])
    const outcomeData = await contract.methods.getOutcome(forecastData[1], forecastData[4]).call()
    forecastData.id = id

    const forecast = new Forecast()
    await forecast.initializeItem(forecastData, prediction, outcomeData)
    return forecast
  }

  static async create (address, id) {
    const contract = await EthUtils.getContract(address)
    const forecastData = await contract.methods.getForecast(id).call()
    const prediction = await Prediction.create(address, forecastData[1])
    const outcomeData = await contract.methods.getOutcome(forecastData[1], forecastData[4]).call()
    forecastData.id = id

    const forecast = new Forecast()
    await forecast.initializeItem(forecastData, prediction, outcomeData)
    await forecast.initialize(forecastData, prediction, outcomeData)
    return forecast
  }
}

const mapForecastStatus = (isPaidoutValue, predictionStatus, isWon) => {
  const isPaidout = isPaidoutValue !== '0'
  if (!isPaidout && predictionStatus === 'published') {
    return 'paid'
  } else if (!isPaidout && predictionStatus === 'canceled') {
    return 'availableRefund'
  } else if (isPaidout && predictionStatus === 'canceled') {
    return 'refundPaidout'
  } else if (isPaidout && predictionStatus === 'resolved') {
    return 'wonPaidout'
  } else if (isWon && predictionStatus === 'resolved') {
    return 'won'
  } else if (!isWon && predictionStatus === 'resolved') {
    return 'lost'
  } else {
    return '-'
  }
}
