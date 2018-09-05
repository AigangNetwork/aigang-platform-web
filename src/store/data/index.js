import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    dataset: {},
    model: null
  },
  mutations,
  actions,
  getters
}
