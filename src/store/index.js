import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import data from './data/index'
import user from './user/index'
import insurance from './insurance/index'
import predictions from './predictions'
import pools from './pools'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'qa',
  state: {
    loading: false,
    insufficientBalanceDialogVisible: false,
    isCookiesEnabled: null,
    showMetamaskNetworkError: true
  },
  mutations,
  getters,
  actions,
  plugins: [createPersistedState()], // save to local storage
  modules: {
    user,
    data,
    insurance,
    predictions,
    pools
  }
})
