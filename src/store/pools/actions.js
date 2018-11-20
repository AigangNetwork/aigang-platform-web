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

  async contribute ({ commit, rootState, state }, payload) {
    commit('setLoading', true, {
      root: true
    })

    try {
      await axios.post('/pools/pool/contribute', payload)

      commit('setLoading', false, {
        root: true
      })
    } catch (ex) {
      commit('setLoading', false, {
        root: true
      })
    }
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
