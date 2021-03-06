import router from '@/router'
import axios from 'axios'
import eventHub from '@/utils/eventHub'
import loadWeb3Instance from '@/utils/web3/loadWeb3'
import { initialUserState } from './index'
import EthUtils from '@/utils/EthUtils'
import networkResolver from '@/utils/web3/networkResolver'

export default {
  async resetState ({ commit }) {
    commit('resetState', initialUserState())
  },

  async logIn ({ commit }, loginResponse) {
    commit('login', loginResponse.data)
  },

  async logOut ({ commit, dispatch }) {
    commit('setLoading', true, { root: true })
    await dispatch('resetRootState', undefined, { root: true })
    await axios.post('/account/logout')
    delete axios.defaults.headers.common['Authorization']
    dispatch('resetRootState', undefined, { root: true })
    router.push('/data')
    commit('setLoading', false, { root: true })
  },

  handleNotLoggedIn ({ dispatch }, path) {
    delete axios.defaults.headers.common['Authorization']
    dispatch('resetRootState', undefined, { root: true })
    router.push({ name: 'Login', params: { returnTo: path } })
  },

  changeProfileNames ({ commit }, response) {
    commit('changeProfileNames', response)
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

  async registerWeb3 ({ dispatch, commit }) {
    const isLoaded = await loadWeb3Instance()
    if (!isLoaded) {
      commit('setIsWeb3Loaded', true)
      return
    }

    await dispatch('updateWeb3Info')

    if (window.web3 && window.web3.currentProvider.publicConfigStore) {
      window.web3.currentProvider.publicConfigStore.on('update', async () => {
        await dispatch('updateWeb3Info')
      })
    }
  },

  async updateWeb3Info ({ commit, state, rootState }) {
    const web3Instance = window.web3
    const networkId = await web3Instance.eth.net.getId()
    const requiredNetwork = networkResolver(process.env.NODE_ENV)

    if (requiredNetwork.networkId !== networkId) {
      commit('setShowEthNetworkError', true, { root: true })
      commit('setIsEthNetworkCorrect', false, { root: true })
      return
    }

    const accounts = await web3Instance.eth.getAccounts()
    const coinbase = accounts[0]

    if (!coinbase) {
      if (state.isWeb3Enabled) {
        eventHub.$emit(eventHub.eventMetamaskAccountWasNotFound)
        commit('turnOffWeb3Instance')
      }

      return
    }

    const ethBalanceInWei = await web3Instance.eth.getBalance(coinbase)
    const ethBalance = web3Instance.utils.fromWei(ethBalanceInWei)
    const aixContract = await EthUtils.getContract(process.env.CONTRACTS_ADDRESSES.TOKEN)

    const aixBalanceInWei = await aixContract.methods.balanceOf(coinbase).call()
    const aixBalance = web3Instance.utils.fromWei(aixBalanceInWei)

    commit('setWeb3Info', {
      networkId,
      coinbase,
      ethBalance,
      aixBalance
    })
    commit('setShowEthNetworkError', false, { root: true })
    commit('setIsEthNetworkCorrect', true, { root: true })
  },

  clearWeb3Instance ({ commit }, response) {
    commit('clearWeb3Instance', response)
  }
}
