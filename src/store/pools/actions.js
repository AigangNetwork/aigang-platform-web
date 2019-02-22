import { initialPoolState } from './index'
import Pool from '@/domain/Pool'
import Contribution from '@//domain/Contribution'
import EthUtils from '@/utils/EthUtils'

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
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.POOLS)
      const itemsPerPage = process.env.POOLS_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1
      let totalPools = 0
      let poolsCounter = 0

      // Iterating through contracts
      for (let index = contracts.length - 1; index >= 0; index--) {
        const contract = contracts[index]
        const poolsLength = parseInt(await contract.methods.totalPools().call())
        totalPools += poolsLength

        // Iterating through pools in a conctract
        for (let i = poolsLength; i > 0 && pools.items.length < itemsPerPage; i--) {
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
      commit('setPoolsTotalPages', Math.ceil(totalPools / itemsPerPage))
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
      const paymentValue = window.web3.utils.toWei(payload.amount.toString())
      const poolIdHex = EthUtils.getHex(payload.poolId)

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
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.POOLS)
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
          const id = await contract.methods.myContributions(rootState.user.userWeb3.coinbase, i).call()
          const contribution = await Contribution.create(contract, id)
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
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.POOLS)
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

  async refundContribution ({ commit, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)
    commit('setLoading', true, { root: true })

    try {
      const PoolsInstance = await EthUtils.getContract(payload.poolContractAddress)

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
