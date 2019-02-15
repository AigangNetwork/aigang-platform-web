import { initialUtilsState } from './index'

export default {
  async resetState ({ commit }) {
    commit('resetState', initialUtilsState())
  },

  async addAbi ({ commit }, payload) {
    commit('addAbi', payload)
  }
}
