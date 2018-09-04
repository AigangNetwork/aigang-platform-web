import getWeb3 from '@/utils/web3/getWeb3'
import router from '@/router'
import axios from 'axios'

export default {
  logIn ({ commit, dispatch }, loginResponse) {
    commit('LOGIN', loginResponse.data)
    dispatch('refreshWeb3Instance')
    router.push('/')
  },

  async logOut ({ commit }) {
    await axios.post('/account/logout')
    delete axios.defaults.headers.common['Authorization']
    commit('LOGOUT')
    router.push('/data')
  },

  handleNotLoggedIn ({ commit }) {
    delete axios.defaults.headers.common['Authorization']
    commit('LOGOUT')
    router.push({ name: 'Login' })
  },

  changeProfileNames ({ commit }, response) {
    commit('CHANGE_PROFILE_NAMES', response)
  },

  async loadProfileWallets ({ commit }, page) {
    commit('SET_LOADING', true, { root: true })
    const response = await axios.get('/transaction/mywallets?page=' + page)
    if (response.data) {
      commit('LOAD_PROFILE_WALLETS', response.data)
      commit('SET_LOADING', false, { root: true })
    }
  },

  async loadProfileTransactions ({ commit }, page) {
    commit('SET_LOADING', true, { root: true })
    const response = await axios.get('/transaction/mytransactions?page=' + page)
    if (response.data) {
      commit('LOAD_PROFILE_TRANSACTIONS', response.data)
      commit('SET_LOADING', false, { root: true })
    }
  },

  async setNotificationPermission ({ commit }, payload) {
    commit('SET_LOADING', true, { root: true })
    const response = await axios.post('/account/updateemailoptout', {
      emailTypeId: payload.id,
      value: payload.value
    })

    if (response.data) {
      commit('SET_EMAIL_OPT_OUT', payload)
      commit('SET_LOADING', false, { root: true })
    }
  },

  async loadNotificationPermissions ({ commit }, emailPermissionGroups) {
    commit('SET_LOADING', true, { root: true })
    const response = await axios.get('/account/myemailoptouts')

    if (response.data) {
      commit('SET_NOTIFICATION_PERMISSIONS', {
        emailPermissionGroups,
        response: response.data
      })
      commit('SET_LOADING', false, { root: true })
    }
  },

  async registerWeb3Instance ({ commit, dispatch }) {
    const userWeb3 = await getWeb3()
    commit('SET_WEB3_INSTANCE', userWeb3)

    if (userWeb3 && userWeb3.web3 && userWeb3.web3().currentProvider.publicConfigStore) {
      userWeb3.web3().currentProvider.publicConfigStore.on('update', () => {
        dispatch('refreshWeb3Instance')
      })
    }
  },

  async refreshWeb3Instance ({ commit }) {
    const userWeb3 = await getWeb3()
    commit('SET_WEB3_INSTANCE', userWeb3)
  },

  clearWeb3Instance ({ commit }, response) {
    commit('CLEAR_WEB3_INSTANCE', response)
  }
}
