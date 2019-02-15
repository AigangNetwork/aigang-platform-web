import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const initialUtilsState = () => {
  return {
    abiCache: {}
  }
}

export default {
  namespaced: true,
  state: initialUtilsState(),
  mutations,
  actions,
  getters
}
