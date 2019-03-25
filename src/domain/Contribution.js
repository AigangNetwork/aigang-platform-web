import moment from 'moment'
import Pool from './Pool'
import EthUtils from '@/utils/EthUtils'

export default class Contribution {
  async initialize (contributionData, pool) {
    this.id = contributionData.id
    this.poolId = contributionData[1]
    this.title = pool.title
    this.poolDescription = pool.description
    this.amount = parseFloat(EthUtils.fromWei(contributionData[2]), 2)
    this.payout = 0
    this.status = mapContributionStatus(contributionData[3], pool.status)
    this.refundAmount = 0
    this.poolContractAddress = pool.poolContractAddress
    this.contributions = pool.contributions
    this.currentPoolSize = pool.amountCollected
    this.poolGoalSize = pool.goalPoolSize
    this.poolStatus = pool.status
    this.poolEndDateUtc = pool.endDateUtc
    this.createdUtc = moment.unix(contributionData[5]).utc().format('YYYY-MM-DD HH:mm')

    if (this.status === 'rewardpaidout') {
      this.payout = parseFloat(EthUtils.fromWei(contributionData[2]), 2)
    } else if (this.status === 'refundpaidout') {
      this.refundAmount = parseFloat(EthUtils.fromWei(contributionData[2]), 2)
    }
  }

  static async create (contract, id) {
    const contributionData = await contract.methods.getContribution(id).call()
    const pool = await Pool.create(contract, contributionData[1])
    contributionData.id = id

    const contribution = new Contribution()
    await contribution.initialize(contributionData, pool)
    return contribution
  }
}

const mapContributionStatus = (isPaidoutValue, poolStatus) => {
  const isPaidout = isPaidoutValue !== '0'

  if (!isPaidout && poolStatus === 'active') {
    return 'paid'
  } else if (!isPaidout && poolStatus === 'distributing') {
    return 'availablePayout'
  } else if (!isPaidout && poolStatus === 'canceled') {
    return 'availableRefund'
  } else if (isPaidout && poolStatus === 'distributing') {
    return 'rewardPaidout'
  } else if (isPaidout && poolStatus === '') {
    return 'refundPaidout'
  }
}
