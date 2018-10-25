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
    wallets: {},
    transactions: {},
    emailPermissionGroups: {},
    userWeb3: {},
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
