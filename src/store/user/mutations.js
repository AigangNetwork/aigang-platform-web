import { initialUserState } from './index'

export default {
  login (state, payload) {
    state.authenticated = true
    state.profile = payload.profile
  },

  logout (state) {
    Object.assign(state, initialUserState())
  },

  changeProfileNames (state, payload) {
    state.profile.firstName = payload.data.profile.firstName
    state.profile.lastName = payload.data.profile.lastName
    state.profile.userName = payload.data.profile.userName
  },

  setWeb3Info (state, payload) {
    state.userWeb3 = payload

    state.userWeb3.aixBalance = parseInt(state.userWeb3.aixBalance, 10)
    state.insufficientBalance = state.userWeb3.aixBalance === 0
    state.isWeb3Enabled = !!state.userWeb3
  },

  clearWeb3Instance (state) {
    state.userWeb3 = {}
    state.isWeb3Enabled = false
  },

  setEmailOptOut (state, payload) {
    state.emailPermissionGroups.map(g => {
      g.items.map(i => {
        if (i.id === payload.id) {
          i.value = payload.value
        }
      })
    })
  },

  setNotifciationPermissions (state, payload) {
    payload.emailPermissionGroups.map(g => {
      g.items.map(i => {
        if (payload.response && payload.response.ids && payload.response.ids.includes(i.id)) {
          i.value = false
        }
      })
    })

    state.emailPermissionGroups = payload.emailPermissionGroups
  },

  setAuthToken (state, value) {
    state.token = value
  },

  loadProfileWallets (state, payload) {
    state.wallets = payload
  },

  loadProfileTransactions (state, payload) {
    state.transactions = payload
  }
}
