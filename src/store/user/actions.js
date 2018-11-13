import router from '@/router'
import axios from 'axios'
import aixContractInfo from '@/utils/contract/aixContractInfo'
import networkResolver from '@/utils/web3/networkResolver'
import eventHub from '@/utils/eventHub'
import loadWeb3Instance from '@/utils/web3/loadWeb3'

export default {
  async logIn ({ commit, dispatch }, loginResponse) {
    commit('login', loginResponse.data)
    await dispatch('clearWeb3Instance')
    await dispatch('registerWeb3')
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

  async registerWeb3 ({ dispatch }) {
    await loadWeb3Instance()
    await dispatch('updateWeb3Info')

    if (window.web3 && window.web3.currentProvider.publicConfigStore) {
      window.web3.currentProvider.publicConfigStore.on('update', async () => {
        await dispatch('updateWeb3Info')
      })
    }
  },

  async updateWeb3Info ({ commit }) {
    const web3Instance = window.web3
    const networkId = await web3Instance.eth.net.getId()

    const requiredNetwork = networkResolver(process.env.NODE_ENV)

    if (requiredNetwork.networkId !== networkId) {
      eventHub.$emit(eventHub.eventMetamaskNetworkError, requiredNetwork.networkName)
      return
    }

    const accounts = await web3Instance.eth.getAccounts()
    const coinbase = accounts[0]

    if (!coinbase) {
      eventHub.$emit(eventHub.eventMetamaskAccountWasNotFound)
      return
    }

    const ethBalanceInWei = await web3Instance.eth.getBalance(coinbase)
    const ethBalance = web3Instance.utils.fromWei(ethBalanceInWei)

    const aixContract = new web3Instance.eth.Contract(aixContractInfo.ABI, aixContractInfo.ADDRESS)

    const aixBalanceInWei = await aixContract.methods.balanceOf(coinbase).call()
    const aixBalance = web3Instance.utils.fromWei(aixBalanceInWei)

    commit('setWeb3Info', {
      networkId,
      coinbase,
      ethBalance,
      aixBalance
    })
  },

  clearWeb3Instance ({ commit }, response) {
    commit('clearWeb3Instance', response)
  }
}
