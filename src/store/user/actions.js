import getWeb3 from '@/utils/web3/getWeb3'
import router from '@/router'
import axios from 'axios'

export default {
  logIn ({ commit, dispatch }, loginResponse) {
    commit('login', loginResponse.data)
    dispatch('refreshWeb3Instance')
    router.push('/')
  },

  async logOut ({ commit }) {
    commit('setLoading', true, { root: true })
    await axios.post('/account/logout')
    delete axios.defaults.headers.common['Authorization']
    commit('logout')
    router.push('/data')
  },

  handleNotLoggedIn ({ commit }) {
    delete axios.defaults.headers.common['Authorization']
    commit('logout')
    router.push({ name: 'Login' })
  },

  changeProfileNames ({ commit }, response) {
    commit('changeProfileNames', response)
  },

  async loadProfileWallets ({ commit }, page) {
    commit('setLoading', true, { root: true })
    const response = await axios.get('/transaction/mywallets?page=' + page)
    if (response.data) {
      commit('loadProfileWallets', response.data)
      commit('setLoading', false, { root: true })
    }
  },

  async loadProfileTransactions ({ commit }, page) {
    commit('setLoading', true, { root: true })
    const response = await axios.get('/transaction/mytransactions?page=' + page)
    if (response.data) {
      commit('loadProfileTransactions', response.data)
      commit('setLoading', false, { root: true })
    }
  },

  async setNotificationPermission ({ commit }, payload) {
    commit('setLoading', true, { root: true })
    const response = await axios.post('/account/updateemailoptout', {
      emailTypeId: payload.id,
      value: payload.value
    })

    if (response.data) {
      commit('setEmailOptOut', payload)
      commit('setLoading', false, { root: true })
    }
  },

  async loadNotificationPermissions ({ commit }, emailPermissionGroups) {
    commit('setLoading', true, { root: true })
    const response = await axios.get('/account/myemailoptouts')

    if (response.data) {
      commit('setNotifciationPermissions', {
        emailPermissionGroups,
        response: response.data
      })
      commit('setLoading', false, { root: true })
    }
  },

  async registerWeb3Instance ({ commit, dispatch }) {
    const userWeb3 = await getWeb3()
    commit('setWeb3Instance', userWeb3)

    if (userWeb3 && userWeb3.web3 && userWeb3.web3().currentProvider.publicConfigStore) {
      userWeb3.web3().currentProvider.publicConfigStore.on('update', () => {
        dispatch('refreshWeb3Instance')
      })
    }
  },

  async refreshWeb3Instance ({ commit }) {
    const userWeb3 = await getWeb3()
    commit('setWeb3Instance', userWeb3)
  },

  clearWeb3Instance ({ commit }, response) {
    commit('clearWeb3Instance', response)
  }
}
