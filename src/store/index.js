import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'qa',
  state: {
    user: {
      authenticated: false,
      token: null,
      profile: null,
      wallets: {},
      transactions: {},
      emailPermissionGroups: {},
      policies: {}
    },
    userWeb3: {
      web3Instance: null,
      isInjected: false,
      ethBalance: null,
      networkId: null,
      coinbase: null,
      aixBalance: null,
      error: null
    },
    currentDataset: {},
    currentModel: null,
    currentProduct: {},
    currentPolicy: {},
    txHash: null,
    policyLoadingInfo: {},
    loading: false
  },
  mutations,
  getters,
  actions,
  plugins: [createPersistedState()] // save to local storage
})

export default store
