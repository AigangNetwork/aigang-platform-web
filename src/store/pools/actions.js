import moment from 'moment'
import { initialPoolState } from './index'
import getAbi from '@/utils/contract/getAbi'
import getContracts from '@/utils/contract/getContracts'
const web3 = window.web3

export default {
  async resetState ({ commit }) {
    commit('resetState', initialPoolState())
  },

  async getPoolsList ({ commit }, page) {
    commit('setLoading', true, { root: true })

    const pools = {
      items: [],
      totalPages: 1
    }
    commit('setPools', pools)

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

      commit('setPools', pools)

      const startItem = page * itemsPerPage - itemsPerPage + 1

      let poolsCounter = 0

      // Iterating through contracts
      for (let index = contracts.length - 1; index >= 0; index--) {
        const poolsLength = parseInt(poolsSizes[index])

        // Iterating through pools in a conctract
        for (let i = poolsLength; i > 0 && pools.items.length < itemsPerPage; i--) {
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
            poolContractAddress: contract._address,
            contributions: await contract.methods.getPoolContributionsLength(i).call(),
            currentPoolSize: window.web3.utils.fromWei(data.amountCollected),
            goalPoolSize: window.web3.utils.fromWei(data.amountLimit)
          }

          commit('addPoolToList', pool)
          if (poolsCounter === startItem) {
            commit('setLoading', false, { root: true })
          }
        }
      }

      commit('setPools', pools)
    } catch (ex) {
      console.error(ex)
      commit('setLoading', false, { root: true })
    }
  },

  async getPool ({ commit }, payload) {
    commit('setPool', {})
    commit('setLoading', true, { root: true })

    try {
      const abi = await getAbi(payload.address)
      const contract = new window.web3.eth.Contract(abi, payload.address)
      const data = await contract.methods.pools(payload.id).call()

      const pool = {
        id: payload.id,
        entityId: data.destination,
        title: data.title,
        description: data.description,
        status: mapPoolStatus(data.status),
        startDateUtc: moment.unix(data.contributionStartUtc).format('YYYY-MM-DD HH:mm'),
        endDateUtc: moment.unix(data.contributionEndUtc).format('YYYY-MM-DD HH:mm'),
        entityContractAddress: data.destination,
        poolContractAddress: payload.address,
        contributions: await contract.methods.getPoolContributionsLength(payload.id).call(),
        currentPoolSize: window.web3.utils.fromWei(data.amountCollected),
        goalPoolSize: window.web3.utils.fromWei(data.amountLimit)
      }

      commit('setPool', pool)
      commit('setLoading', false, { root: true })
    } catch (ex) {
      console.error(ex)
      commit('setLoading', false, { root: true })
    }
  },

  async addContribution ({ commit, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)
    commit('setLoading', true, { root: true })

    try {
      const tokenAddress = process.env.CONTRACTS_ADDRESSES.TOKEN
      const tokenAbi = await getAbi(tokenAddress)
      const TokenInstance = new window.web3.eth.Contract(tokenAbi, tokenAddress)
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
      console.error(error)
      commit('setLoading', false, { root: true })
      commit('setTransactionError', true)
    }
  },

  async getUserContributions ({ commit, rootState, state }, page) {
    commit('setUserContributions', {
      items: [],
      totalPages: 0
    })
    commit('setContributionsListLoading', true)

    try {
      const contracts = await getContracts(process.env.CONTRACT_TYPES.POOLS)
      let totalContributions = 0
      const itemsPerPage = process.env.CONTRIBUTIONS_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1

      let iterator = 0
      for (let contractIndex = contracts.length - 1; contractIndex >= 0; contractIndex--) {
        const contract = contracts[contractIndex]
        const result = await contract.methods
          .getMyContributionsLength()
          .call({ from: rootState.user.userWeb3.coinbase })
        let contributionsCount = parseInt(result)
        totalContributions += contributionsCount

        for (
          let i = contributionsCount - 1;
          i >= 0 && state.userContributions.items.length < itemsPerPage;
          i--
        ) {
          iterator++
          if (iterator < startItem) {
            continue
          }

          const id = await contracts[contractIndex].methods
            .myContributions(rootState.user.userWeb3.coinbase, i)
            .call()
          const contributionData = await contract.methods.getContribution(id).call()
          const poolData = await contract.methods.pools(contributionData[1]).call()

          const contribution = {
            id: id,
            userId: contributionData[4],
            poolName: poolData.title,
            poolId: contributionData[1],
            amount: parseFloat(window.web3.utils.fromWei(contributionData[2]), 2),
            status: mapContributionStatus(contributionData[3], poolData.status),
            createdUtc: moment.unix(contributionData[5]).format('YYYY-MM-DD HH:mm'),
            address: contract._address
          }

          commit('addContribution', contribution)
          if (iterator === startItem) {
            commit('setContributionsListLoading', false)
          }
        }

        commit('setUserContributionsTotalPages', Math.ceil(totalContributions / itemsPerPage))
      }
    } catch (ex) {
      console.error(ex)
      commit('setContributionsListLoading', false)
    }
  },

  async getPortfolioSummary ({ commit, rootState }) {
    commit('setPortfolioSummaryLoading', true)

    commit('setPortfolioSummary', {
      contributions: 0,
      contributionsAmount: 0,
      availableRefund: 0,
      rewardPaidOut: 0
    })

    try {
      const contracts = await getContracts(process.env.CONTRACT_TYPES.POOLS)
      let totalContributions = 0
      let contributionsAmount = 0
      let availableRefundAmount = 0
      let rewardPaidOutAmount = 0

      for (let contractIndex = 0; contractIndex < contracts.length; contractIndex++) {
        const contract = contracts[contractIndex]
        const result = await contract.methods
          .getMyContributionsLength()
          .call({ from: rootState.user.userWeb3.coinbase })

        let contributionsCount = parseInt(result)
        totalContributions += contributionsCount

        for (let i = 0; i < contributionsCount; i++) {
          const id = await contract.methods.myContributions(rootState.user.userWeb3.coinbase, i).call()
          const contributionData = await contract.methods.getContribution(id).call()
          const poolData = await contract.methods.pools(contributionData[1]).call()

          const contribution = {
            amount: parseFloat(window.web3.utils.fromWei(contributionData[2]), 2),
            status: mapContributionStatus(contributionData[3], poolData.status)
          }
          contributionsAmount += contribution.amount

          if (contribution.status === 'availablePayout') {
            availableRefundAmount += contribution.amount
          }

          if (contribution.status === 'rewardPaidout') {
            rewardPaidOutAmount += contribution.amount
          }
        }
      }

      commit('setPortfolioSummary', {
        contributions: totalContributions,
        contributionsAmount: contributionsAmount,
        availableRefund: availableRefundAmount,
        rewardPaidOut: rewardPaidOutAmount
      })

      commit('setPortfolioSummaryLoading', false)
    } catch (ex) {
      console.error(ex)
      commit('setPortfolioSummaryLoading', false)
      commit('setContributionsListLoading', false)
    }
  },

  async getContribution ({ commit }, payload) {
    commit('setContribution', {})
    commit('setLoading', true, { root: true })

    try {
      const abi = await getAbi(payload.address)
      const contract = new window.web3.eth.Contract(abi, payload.address)
      const contributionData = await contract.methods.getContribution(payload.id).call()
      const poolData = await contract.methods.pools(contributionData[1]).call()

      const contribution = {
        id: payload.id,
        poolId: contributionData[1],
        poolName: poolData.title,
        poolDescription: poolData.description,
        amount: parseFloat(window.web3.utils.fromWei(contributionData[2]), 2),
        payout: 0,
        status: mapContributionStatus(contributionData[3], poolData.status),
        refundAmount: 0,
        poolContractAddress: payload.address,
        contributions: await contract.methods.getPoolContributionsLength(contributionData[1]).call(),
        currentPoolSize: parseFloat(window.web3.utils.fromWei(poolData.amountCollected), 2),
        poolGoalSize: window.web3.utils.fromWei(poolData.amountLimit),
        poolStatus: mapPoolStatus(poolData.status),
        poolEndDateUtc: moment.unix(poolData.contributionEndUtc).format('YYYY-MM-DD HH:mm'),
        createdUtc: moment.unix(contributionData[5]).format('YYYY-MM-DD HH:mm')
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
      const abi = await getAbi(payload.poolContractAddress)
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
      const abi = await getAbi(payload.poolContractAddress)
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
