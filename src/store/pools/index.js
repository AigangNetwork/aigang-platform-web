import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    pools: [],
    currentPool: {},
    userContributions: []
  },
  mutations,
  actions,
  getters
}
