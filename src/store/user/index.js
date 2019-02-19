import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const initialUserState = () => {
  return {
    authenticated: false,
    token: null,
    profile: {
      firstName: '',
      userName: ''
    },
    emailPermissionGroups: {},
    userWeb3: {},
    isWeb3Enabled: false,
    insufficientBalance: false
  }
}

export default {
  namespaced: true,
  state: initialUserState(),
  mutations,
  actions,
  getters
}
