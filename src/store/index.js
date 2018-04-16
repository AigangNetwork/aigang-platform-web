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
      profile: null
    },
    currentDataset: null
  },
  mutations,
  getters,
  actions,
  plugins: [createPersistedState()] // save to local storage
})

export default store
