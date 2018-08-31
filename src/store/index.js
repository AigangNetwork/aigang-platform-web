import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export const initialState = () => {
  return {
    user: {
      authenticated: false,
      token: null,
      profile: {
        firstName: '',
        userName: ''
      },
      wallets: {},
      transactions: {},
      emailPermissionGroups: {},
      policies: {}
    },
    userWeb3: {},
    dataset: {},
    model: null,
    product: {},
    policy: {},
    txHash: null,
    policyLoadingInfo: {},
    isPolicyLoadingVisible: false,
    loading: false
  }
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'qa',
  state: initialState(),
  mutations,
  getters,
  actions,
  plugins: [createPersistedState()] // save to local storage
})

export default store
