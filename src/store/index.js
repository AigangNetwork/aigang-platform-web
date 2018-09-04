import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import data from './data/index'
import user from './user/index'

import getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const initialState = () => {
  return {
    product: {},
    policy: {},
    userPolicies: {},
    txHash: null,
    policyLoadingInfo: {},
    isPolicyLoadingVisible: false,
    loading: false
  }
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'qa',
  state: initialState(),
  mutations,
  getters,
  actions,
  plugins: [createPersistedState()], // save to local storage
  modules: {
    user,
    data
  }
})
