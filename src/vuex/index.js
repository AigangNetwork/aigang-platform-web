import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      authenticated: false
    }
  },
  mutations,
  getters,
  actions
})

export default store
