import { initialPoolState } from './index'
import Pool from '@/domain/Pool'
import Contribution from '@//domain/Contribution'
import EthUtils from '@/utils/EthUtils'
import router from '@/router'

export default {
  async resetState ({ commit }) {
    commit('resetState', initialPoolState())
  },

  async getPoolsList ({ commit, state }, page) {
    commit('setLoading', true, { root: true })
    const timestamp = new Date().getTime()

    const pools = {
      items: [],
      totalPages: 1,
      timestamp: timestamp
    }
    commit('setPools', pools)

    try {
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.POOLS)
      const itemsPerPage = process.env.POOLS_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1
      const poolsLengths = []

      for (const contract of contracts) {
        const poolsLength = parseInt(await contract.methods.totalPools().call())
        poolsLengths.push(poolsLength)
      }

      const totalPools = poolsLengths.reduce((total, current) => total + current)
      const totalPages = Math.ceil(totalPools / itemsPerPage)

      let poolsCounter = 0
      let totalItems = 0

      if (page === totalPages) {
        totalItems = totalPools - itemsPerPage * (totalPages - 1)
      } else {
        totalItems = itemsPerPage
      }

      commit('setPoolsPagesAndItems', { totalPages, totalItems })

      for (let contractIndex = 0; contractIndex < contracts.length; contractIndex++) {
        const poolsLength = poolsLengths[contractIndex]
        const contract = contracts[contractIndex]

        for (let i = poolsLength; i > 0 && state.pools.items.length < itemsPerPage; i--) {
          // Thread safety
          if (state.pools.timestamp !== timestamp) return

          poolsCounter++

          if (poolsCounter < startItem) {
            continue
          }

          const pool = await Pool.create(contract, i)

          commit('addPoolToList', pool)

          if (poolsCounter === startItem) {
            commit('setLoading', false, { root: true })
          }
        }
      }

      commit('setLoading', false, { root: true })
    } catch (ex) {
      console.error(ex)
      commit('setLoading', false, { root: true })
    }
  },

  async getPool ({ commit }, payload) {
    commit('setPool', {})
    commit('setLoading', true, { root: true })

    try {
      const contract = await EthUtils.getContract(payload.address)
      const pool = await Pool.create(contract, payload.id)

      if (pool.status.toUpperCase() === 'NOTSET') {
        router.push({
          name: 'NotFound',
          params: { '0': 'notfound' }
        })
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
      const TokenInstance = await EthUtils.getContract(process.env.CONTRACTS_ADDRESSES.TOKEN)
      const paymentValue = EthUtils.toWei(payload.amount.toString())
      const poolIdHex = EthUtils.getHex(payload.poolId)

      const gasLimit = await TokenInstance.methods
        .approveAndCall(payload.poolContractAddress, paymentValue, poolIdHex)
        .estimateGas({ from: rootState.user.userWeb3.coinbase })

      const callObject = TokenInstance.methods
        .approveAndCall(payload.poolContractAddress, paymentValue, poolIdHex)
        .send({
          gas: gasLimit,
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
    commit('setContributionsListLoading', true)
    const timestamp = new Date().getTime()

    commit('setUserContributions', {
      items: [],
      totalPages: 0,
      totalItems: 0,
      timestamp: timestamp
    })

    try {
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.POOLS)
      const itemsPerPage = process.env.CONTRIBUTIONS_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1

      const contributionsLengths = []

      for (const contract of contracts) {
        const contributionsLength = await contract.methods
          .getMyContributionsLength()
          .call({ from: rootState.user.userWeb3.coinbase })
        contributionsLengths.push(parseInt(contributionsLength))
      }

      const totalContributions = contributionsLengths.reduce((total, current) => total + current)
      const totalPages = Math.ceil(totalContributions / itemsPerPage)

      let totalItems = 0

      if (page === totalPages) {
        totalItems = totalContributions - itemsPerPage * (totalPages - 1)
      } else {
        totalItems = itemsPerPage
      }

      commit('setContributionsPagesAndItems', { totalPages, totalItems })

      let iterator = 0
      for (let contractIndex = 0; contractIndex < contracts.length; contractIndex++) {
        const contract = contracts[contractIndex]
        const contributionsCount = contributionsLengths[contractIndex]

        for (
          let i = contributionsCount - 1;
          i >= 0 && state.userContributions.items.length < itemsPerPage;
          i--
        ) {
          // Thread safety
          if (timestamp !== state.userContributions.timestamp) return

          iterator++

          if (iterator < startItem) {
            continue
          }

          const id = await contract.methods.myContributions(rootState.user.userWeb3.coinbase, i).call()
          const contribution = await Contribution.create(contract, id)
          commit('addContribution', contribution)
          if (iterator === startItem) {
            commit('setContributionsListLoading', false)
          }
        }
      }
      commit('setContributionsListLoading', false)
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
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.POOLS)
      let totalContributions = 0
      let contributionsAmount = 0
      let availableRefundAmount = 0
      let rewardPaidOutAmount = 0

      for (const contract of contracts) {
        const result = await contract.methods
          .getMyContributionsLength()
          .call({ from: rootState.user.userWeb3.coinbase })

        let contributionsCount = parseInt(result)
        totalContributions += contributionsCount

        for (let i = 0; i < contributionsCount; i++) {
          const id = await contract.methods.myContributions(rootState.user.userWeb3.coinbase, i).call()
          const contribution = await Contribution.create(contract, id)
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
      const contract = await EthUtils.getContract(payload.address)
      const contribution = await Contribution.create(contract, payload.id)

      if (contribution.poolStatus.toUpperCase() === 'NOTSET') {
        router.push({
          name: 'NotFound',
          params: { '0': 'notfound' }
        })
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
      const PoolsInstance = await EthUtils.getContract(payload.poolContractAddress)

      commit('setLoading', false, { root: true })

      const gasLimit = await PoolsInstance.methods
        .payout(payload.contributionId)
        .estimateGas({ from: rootState.user.userWeb3.coinbase })

      PoolsInstance.methods
        .payout(payload.contributionId)
        .send({
          gas: gasLimit,
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

  async refundContribution ({ commit, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)
    commit('setLoading', true, { root: true })

    try {
      const PoolsInstance = await EthUtils.getContract(payload.poolContractAddress)

      commit('setLoading', false, { root: true })

      const gasLimit = await PoolsInstance.methods
        .refund(payload.contributionId)
        .estimateGas({ from: rootState.user.userWeb3.coinbase })

      PoolsInstance.methods
        .refund(payload.contributionId)
        .send({
          gas: gasLimit,
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
