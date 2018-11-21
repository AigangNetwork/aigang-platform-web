import axios from 'axios'

export default {
  async getPoolsList ({ commit }, page) {
    commit('setLoading', true, {
      root: true
    })

    try {
      const response = await axios.get('/pools/list?page=' + page)
      if (response.data) {
        commit('setPools', response.data)
      }

      commit('setLoading', false, {
        root: true
      })
    } catch (ex) {
      commit('setLoading', false, {
        root: true
      })
    }
  },

  async getPool ({ commit, dispatch }, id) {
    commit('setLoading', true, {
      root: true
    })

    try {
      const response = await axios.get('/pools/pool/' + id)
      if (response.data && response.data.pool) {
        commit('setPool', response.data.pool)
      }

      commit('setLoading', false, {
        root: true
      })
    } catch (ex) {
      commit('setLoading', false, {
        root: true
      })
    }
  },

  async addContribution ({ commit, rootState, state }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)

    commit('setLoading', true, {
      root: true
    })

    try {
      const response = await axios.post('/pools/pool/contribute', payload)

      if (response.data) {
        const web3 = window.web3
        const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)

        const paymentValue = web3.utils.toWei(payload.amount.toString())
        const poolIdHex = web3.utils.fromAscii(payload.poolId)

        const contributionIdHex = web3.utils.fromAscii(response.data.contribution.id)

        commit('setLoading', false, {
          root: true
        })

        const bytes = (poolIdHex + contributionIdHex).replace(/0x/g, '')

        TokenInstance.methods
          .approveAndCall(state.currentPool.poolContractAddress, paymentValue, '0x' + bytes)
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

  async payContribution ({ commit, rootState, state }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)

    commit('setLoading', true, {
      root: true
    })

    const web3 = window.web3
    const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)

    const paymentValue = web3.utils.toWei(payload.amount.toString())
    const poolIdHex = web3.utils.fromAscii(payload.poolId)

    const contributionIdHex = web3.utils.fromAscii(payload.contributionId)

    commit('setLoading', false, {
      root: true
    })

    const bytes = (poolIdHex + contributionIdHex).replace(/0x/g, '')

    TokenInstance.methods
      .approveAndCall(state.currentPool.poolContractAddress, paymentValue, '0x' + bytes)
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
            contributionId: payload.contributionId,
            txId
          }

          await axios.post('/pools/transaction/addContribution', transactionPayload)

          commit('setTransactionHash', txId)
        } catch (ex) {}
      })
  },

  async deleteContribution ({ commit }, id) {
    commit('setLoading', true, { root: true })

    try {
      await axios.delete(`/pools/pool/contribution/${id}`)
    } catch (err) {}

    commit('setLoading', false, { root: true })
  },

  async getUserContributions ({ commit }, page) {
    commit('setLoading', true, {
      root: true
    })

    try {
      const response = await axios.get('/pools/mycontributions?page=' + page)
      if (response.data) {
        commit('setUserContributions', response.data)
      }

      commit('setLoading', false, {
        root: true
      })
    } catch (ex) {
      commit('setLoading', false, {
        root: true
      })
    }
  },

  async getContribution ({ commit }, id) {
    commit('setLoading', true, {
      root: true
    })

    try {
      const response = await axios.get('/pools/pool/contribution/' + id)

      if (response.data && response.data.contribution) {
        commit('setContribution', response.data.contribution)
      }

      commit('setLoading', false, {
        root: true
      })
    } catch (ex) {
      commit('setLoading', false, {
        root: true
      })
    }
  }
}
