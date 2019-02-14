import axios from 'axios'
import moment from 'moment'
import { initialPoolState } from './index'
import getAbi from '@/utils/contract/getAbi'
import getContracts from '@/utils/contract/getContracts'
const poolAddress = '0xb8f2be4453511101d12bc1d667fcb3c2ebaa9b4c'
const web3 = window.web3

export default {
  async resetState ({ commit }) {
    commit('resetState', initialPoolState())
  },

  async getPoolsList ({ commit }, page) {
    commit('setLoading', true, { root: true })

    try {
      const contracts = await getContracts(process.env.CONTRACT_TYPES.POOLS)
      const itemsPerPage = process.env.POOLS_ITEMS_PER_PAGE

      const poolsSizes = await Promise.all(
        contracts.map(async c => {
          const result = await c.methods.totalPools().call()
          return result
        })
      )

      const totalPools = poolsSizes.reduce((sum, s) => sum + parseInt(s), 0) || 0

      const pools = {
        items: [],
        totalPages: Math.ceil(totalPools / itemsPerPage)
      }

      const startItem = page * itemsPerPage - itemsPerPage + 1
      const maxItems = page * itemsPerPage

      let poolsCounter = 0

      for (let index = 0; index < contracts.length; index++) {
        const poolsLength = parseInt(poolsSizes[index])
        for (
          let i = 1;
          i <= poolsLength && pools.items.length <= itemsPerPage && poolsCounter < maxItems;
          i++
        ) {
          poolsCounter++
          if (poolsCounter < startItem) {
            continue
          }

          const contract = contracts[index]
          const data = await contract.methods.pools(i).call()

          const pool = {
            id: i,
            entityId: data.destination,
            title: data.title,
            description: data.description,
            status: mapPoolStatus(data.status),
            startDateUtc: moment.unix(data.contributionStartUtc).format('YYYY-MM-DD HH:mm'),
            endDateUtc: moment.unix(data.contributionEndUtc).format('YYYY-MM-DD HH:mm'),
            entityContractAddress: data.destination,
            poolContractAddress: poolAddress,
            contributions: await contract.methods.getPoolContributionsLength(i).call(),
            currentPoolSize: window.web3.utils.fromWei(data.amountCollected),
            goalPoolSize: window.web3.utils.fromWei(data.amountLimit)
          }

          pools.items.push(pool)
        }
      }

      commit('setPools', pools)
      commit('setLoading', false, { root: true })
    } catch (ex) {
      console.error(ex)
      commit('setLoading', false, { root: true })
    }
  },

  async getPool ({ commit }, id) {
    commit('setPool', {})
    commit('setLoading', true, { root: true })

    try {
      const abi = await getAbi(poolAddress)
      const contract = new window.web3.eth.Contract(abi, poolAddress)
      const data = await contract.methods.pools(id).call()

      const pool = {
        id: id,
        entityId: data.destination,
        title: data.title,
        description: data.description,
        status: mapPoolStatus(data.status),
        startDateUtc: moment.unix(data.contributionStartUtc).format('YYYY-MM-DD HH:mm'),
        endDateUtc: moment.unix(data.contributionEndUtc).format('YYYY-MM-DD HH:mm'),
        entityContractAddress: data.destination,
        poolContractAddress: poolAddress,
        contributions: await contract.methods.getPoolContributionsLength(id).call(),
        currentPoolSize: window.web3.utils.fromWei(data.amountCollected),
        goalPoolSize: window.web3.utils.fromWei(data.amountLimit)
      }

      commit('setPool', pool)
      commit('setLoading', false, { root: true })
    } catch (ex) {
      commit('setLoading', false, { root: true })
    }
  },

  async addContribution ({ commit, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)
    commit('setLoading', true, { root: true })

    try {
      // TODO: take ABI from etherscan
      const TokenInstance = new window.web3.eth.Contract(
        process.env.CONTRACT_INFO.ABI,
        process.env.CONTRACT_INFO.ADDRESS
      )

      const paymentValue = window.web3.utils.toWei(payload.amount.toString())
      const poolIdHex = getHex(payload.poolId)

      const callObject = TokenInstance.methods
        .approveAndCall(payload.poolContractAddress, paymentValue, poolIdHex)
        .send({
          gas: process.env.GAS.ADD_CONTRIBUTION,
          from: rootState.user.userWeb3.coinbase
        })

      callObject.catch(e => {
        console.error(e)
        commit('setLoading', false, { root: true })
        commit('setTransactionError', true)
      })

      callObject.on('error', () => {
        commit('setLoading', false, { root: true })
        commit('setTransactionError', true)
      })

      callObject.once('transactionHash', async txId => {
        commit('setTransactionHash', txId)
        commit('setLoading', false, { root: true })
      })
    } catch (error) {
      commit('setLoading', false, { root: true })
      commit('setTransactionError', true)
    }
  },

  async deleteContribution ({ commit }, id) {
    commit('setLoading', true, { root: true })
    try {
      await axios.delete(`/pools/contribution/${id}`)
    } catch (err) {}

    commit('setLoading', false, { root: true })
  },

  async getUserContributions ({ commit, rootState }, payload) {
    commit('setPortfolioSummaryLoading', true)
    commit('setContributionsListLoading', true)

    try {
      const abi = await getAbi(poolAddress)
      const contract = new window.web3.eth.Contract(abi, poolAddress)
      const myContributionsLengthResult = await contract.methods
        .getMyContributionsLength()
        .call({ from: rootState.user.userWeb3.coinbase })
      const myContributionsLength = parseInt(myContributionsLengthResult)

      const contributionsIds = []

      for (let i = 0; i < myContributionsLength; i++) {
        const id = await contract.methods.myContributions(rootState.user.userWeb3.coinbase, i).call()
        contributionsIds.push(id)
      }
      const contributions = {
        items: [],
        totalPages: 0
      }

      const itemsPerPage = process.env.CONTRIBUTIONS_ITEMS_PER_PAGE
      const startItem = payload.page * itemsPerPage - itemsPerPage
      const maxItems = payload.page * itemsPerPage

      for (let i = startItem; i < myContributionsLength && i <= maxItems; i++) {
        const id = parseInt(contributionsIds[i])

        const contributionData = await contract.methods.getContribution(id).call()
        const poolData = await contract.methods.pools(contributionData[1]).call()

        const contribution = {
          id: id,
          userId: contributionData[4],
          poolName: poolData.title,
          poolId: contributionData[1],
          amount: parseFloat(window.web3.utils.fromWei(contributionData[2]), 2),
          status: mapContributionStatus(contributionData[3], poolData.status)
        }

        contributions.items.push(contribution)
      }

      commit('setUserContributions', contributions)

      const sumWithStatus = status => (sum, c) => {
        if (c.status === status) {
          return sum + c.amount
        }
      }

      const summary = {
        contributions: myContributionsLength,
        contributionsAmount: contributions.items.reduce((sum, c) => sum + c.amount, 0) || 0,
        availableRefund: contributions.items.reduce(sumWithStatus('availablerefund'), 0) || 0,
        rewardPaidOut: contributions.items.reduce(sumWithStatus('availablepayout'), 0) || 0
      }

      commit('setPortfolioSummary', summary)

      commit('setPortfolioSummaryLoading', false)
      commit('setContributionsListLoading', false)
    } catch (ex) {
      console.error(ex)
      commit('setPortfolioSummaryLoading', false)
      commit('setContributionsListLoading', false)
    }
  },

  async getContribution ({ commit }, id) {
    commit('setContribution', {})
    commit('setLoading', true, { root: true })

    try {
      const abi = await getAbi(poolAddress)
      const contract = new window.web3.eth.Contract(abi, poolAddress)
      const contributionData = await contract.methods.getContribution(id).call()
      const poolData = await contract.methods.pools(contributionData[1]).call()

      // TODO: add created date
      const contribution = {
        id: id,
        poolId: contributionData[1],
        poolName: poolData.title,
        poolDescription: poolData.description,
        amount: parseFloat(window.web3.utils.fromWei(contributionData[2]), 2),
        payout: 0,
        status: mapContributionStatus(contributionData[3], poolData.status),
        refundAmount: 0,
        poolContractAddress: poolAddress,
        contributions: await contract.methods.getPoolContributionsLength(contributionData[1]).call(),
        currentPoolSize: parseFloat(window.web3.utils.fromWei(poolData.amountCollected), 2),
        poolGoalSize: window.web3.utils.fromWei(poolData.amountLimit),
        poolStatus: mapPoolStatus(poolData.status),
        poolEndDateUtc: moment.unix(poolData.contributionEndUtc).format('YYYY-MM-DD HH:mm')
      }

      if (contribution.status === 'rewardpaidout') {
        contribution.payout = parseFloat(window.web3.utils.fromWei(contributionData[2]), 2)
      } else if (contribution.status === 'refundpaidout') {
        contribution.refundAmount = parseFloat(window.web3.utils.fromWei(contributionData[2]), 2)
      }

      commit('setContribution', contribution)
      commit('setLoading', false, { root: true })
    } catch (ex) {
      commit('setLoading', false, { root: true })
    }
  },

  async payoutContribution ({ commit, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)
    commit('setLoading', true, { root: true })

    try {
      const abi = await getAbi(poolAddress)
      const PoolsInstance = new window.web3.eth.Contract(abi, payload.poolContractAddress)

      commit('setLoading', false, { root: true })

      PoolsInstance.methods
        .payout(payload.contributionId)
        .send({
          gas: process.env.GAS.PAYOUT_CONTRIBUTION,
          from: rootState.user.userWeb3.coinbase
        })

        .on('error', () => {
          commit('setTransactionError', true)
          commit('setLoading', false, { root: true })
        })

        .once('transactionHash', async txId => {
          commit('setTransactionHash', txId)
          commit('setLoading', false, { root: true })
        })
    } catch (e) {
      commit('setLoading', false, { root: true })
    }
  },

  async refundContribution ({ commit, rootState, dispatch }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)
    commit('setLoading', true, { root: true })

    try {
      const abi = await getAbi(poolAddress)
      const PoolsInstance = new window.web3.eth.Contract(abi, payload.poolContractAddress)

      commit('setLoading', false, { root: true })

      PoolsInstance.methods
        .refund(payload.contributionId)
        .send({
          gas: process.env.GAS.PAYOUT_CONTRIBUTION,
          from: rootState.user.userWeb3.coinbase
        })

        .on('error', () => {
          commit('setTransactionError', true)
          commit('setLoading', false, { root: true })
        })

        .once('transactionHash', async txId => {
          commit('setTransactionHash', txId)
          commit('setLoading', false, { root: true })
        })
    } catch (e) {
      commit('setLoading', false, { root: true })
    }
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

const getHex = x => {
  var result = web3.toHex(x)

  if (result.length % 2 === 1) {
    // bug https://github.com/ethereum/web3.js/issues/873
    result = result.replace('0x', '0x0')
  }

  return result
}

const mapContributionStatus = (isPaidoutValue, poolStatus) => {
  const isPaidout = isPaidoutValue !== '0'
  if (!isPaidout && poolStatus === '1') {
    return 'paid'
  } else if (!isPaidout && poolStatus === '2') {
    return 'availablePayout'
  } else if (!isPaidout && poolStatus === '5') {
    return 'availableRefund'
  } else if (isPaidout && poolStatus === '2') {
    return 'rewardPaidout'
  } else if (isPaidout && poolStatus === '5') {
    return 'refundPaidout'
  }
}
