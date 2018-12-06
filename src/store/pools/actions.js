import axios from 'axios'
import { initialPoolState } from './index'

export default {
  async resetState ({ commit }) {
    commit('resetState', initialPoolState())
  },

  async getPoolsList ({ commit }, page) {
    commit('setLoading', true, { root: true })

    try {
      const response = await axios.get('/pools/list?page=' + page)
      if (response.data) {
        commit('setPools', response.data)
      }

      commit('setLoading', false, { root: true })
    } catch (ex) {
      commit('setLoading', false, { root: true })
    }
  },

  async getPool ({ commit, dispatch }, id) {
    commit('setLoading', true, { root: true })

    try {
      const response = await axios.get('/pools/pool/' + id)
      if (response.data && response.data.pool) {
        commit('setPool', response.data.pool)
      }

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
      const response = await axios.post('/pools/pool/contribute', payload)

      if (response.data) {
        const web3 = window.web3
        const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)

        const paymentValue = web3.utils.toWei(payload.amount.toString())
        const poolIdHex = web3.utils.fromAscii(payload.poolId)

        const contributionIdHex = web3.utils.fromAscii(response.data.contribution.id)

        commit('setLoading', false, { root: true })

        const bytes = (poolIdHex + contributionIdHex).replace(/0x/g, '')

        TokenInstance.methods
          .approveAndCall(payload.poolContractAddress, paymentValue, '0x' + bytes)
          .send({
            gas: process.env.GAS.ADD_CONTRIBUTION,
            from: rootState.user.userWeb3.coinbase
          })
          .on('error', () => {
            commit('setTransactionError', true)
          })
          .once('transactionHash', async txId => {
            try {
              const transactionPayload = {
                contributionId: response.data.contribution.id,
                txId
              }

              await axios.post('/pools/transaction/addContribution', transactionPayload)

              commit('setTransactionHash', txId)
            } catch (ex) {}
          })
      }
    } catch (ex) {}
  },

  async deleteContribution ({ commit }, id) {
    commit('setLoading', true, { root: true })

    try {
      await axios.delete(`/pools/pool/contribution/${id}`)
    } catch (err) {}

    commit('setLoading', false, { root: true })
  },

  async getPortfolioSummary ({ commit }) {
    commit('setPortfolioSummaryLoading', true)

    try {
      const response = await axios.get('/pools/portfoliosummary')
      if (response.data) {
        commit('setPortfolioSummary', response.data.summary)
      }

      commit('setPortfolioSummaryLoading', false)
    } catch (ex) {
      commit('setPortfolioSummaryLoading', false)
    }
  },

  async getUserContributions ({ commit }, payload) {
    commit('setContributionsListLoading', true)

    try {
      const page = payload.page ? `?page=${payload.page}` : ''
      const status = payload.filters && payload.filters.status ? `&status=${payload.filters.status}` : ''

      const response = await axios.get(`/pools/mycontributions${page}${status}`)
      if (response.data) {
        commit('setUserContributions', response.data)
      }

      commit('setContributionsListLoading', false)
    } catch (ex) {
      commit('setContributionsListLoading', false)
    }
  },

  async getContribution ({ commit }, id) {
    commit('setLoading', true, { root: true })

    try {
      const response = await axios.get('/pools/pool/contribution/' + id)

      if (response.data && response.data.contribution) {
        commit('setContribution', response.data.contribution)
      }

      commit('setLoading', false, { root: true })
    } catch (ex) {
      commit('setLoading', false, { root: true })
    }
  },

  async payoutContribution ({ commit, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)

    commit('setLoading', true, { root: true })

    const response = await axios.get(`/contracts/${payload.poolContractAddress}`)

    if (!response.data) {
      commit('setLoading', false, { root: true })
      return
    }

    const web3 = window.web3
    const PoolsInstance = new web3.eth.Contract(JSON.parse(response.data.abi), payload.poolContractAddress)

    const poolIdHex = web3.utils.fromAscii(payload.poolId)
    const contributionIdHex = web3.utils.fromAscii(payload.contributionId)

    commit('setLoading', false, { root: true })

    PoolsInstance.methods
      .payout(poolIdHex, contributionIdHex)
      .send({
        gas: process.env.GAS.PAYOUT_CONTRIBUTION,
        from: rootState.user.userWeb3.coinbase
      })
      .on('error', () => {
        commit('setTransactionError', true)
      })
      .once('transactionHash', async txId => {
        try {
          const transactionPayload = {
            contributionId: payload.contributionId,
            txId
          }

          await axios.post('/pools/transaction/addContributionPayout', transactionPayload)

          commit('setTransactionHash', txId)
        } catch (ex) {}
      })
  },

  async refundContribution ({ commit, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)

    commit('setLoading', true, { root: true })

    const response = await axios.get(`/contracts/${payload.poolContractAddress}`)

    if (!response.data) {
      commit('setLoading', false, { root: true })
      return
    }

    const web3 = window.web3
    const PoolsInstance = new web3.eth.Contract(JSON.parse(response.data.abi), payload.poolContractAddress)

    const poolIdHex = web3.utils.fromAscii(payload.poolId)
    const contributionIdHex = web3.utils.fromAscii(payload.contributionId)

    commit('setLoading', false, { root: true })

    PoolsInstance.methods
      .refund(poolIdHex, contributionIdHex)
      .send({
        gas: process.env.GAS.REFUND_CONTRIBUTION,
        from: rootState.user.userWeb3.coinbase
      })
      .on('error', () => {
        commit('setTransactionError', true)
      })
      .once('transactionHash', async txId => {
        try {
          const transactionPayload = {
            contributionId: payload.contributionId,
            txId
          }

          await axios.post('/pools/transaction/addContributionRefund', transactionPayload)

          commit('setTransactionHash', txId)
        } catch (ex) {}
      })
  }
}
