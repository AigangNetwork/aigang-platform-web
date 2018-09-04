import { initialUserState } from './index'

export default {
  LOGIN (state, payload) {
    state.authenticated = true
    state.profile = payload.profile
  },

  LOGOUT (state) {
    Object.assign(state, initialUserState())
  },

  CHANGE_PROFILE_NAMES (state, payload) {
    state.profile.firstName = payload.data.profile.firstName
    state.profile.lastName = payload.data.profile.lastName
    state.profile.userName = payload.data.profile.userName
  },

  SET_WEB3_INSTANCE (state, payload) {
    state.userWeb3 = {
      ...payload
    }
    state.userWeb3.aixBalance = parseInt(state.userWeb3.aixBalance, 10)
  },

  CLEAR_WEB3_INSTANCE (state) {
    state.userWeb3 = {}
  },

  SET_EMAIL_OPT_OUT (state, payload) {
    state.emailPermissionGroups.map(g => {
      g.items.map(i => {
        if (i.id === payload.id) {
          i.value = payload.value
        }
      })
    })
  },

  SET_NOTIFICATION_PERMISSIONS (state, payload) {
    payload.emailPermissionGroups.map(g => {
      g.items.map(i => {
        if (payload.response && payload.response.ids && payload.response.ids.includes(i.id)) {
          i.value = false
        }
      })
    })

    state.emailPermissionGroups = payload.emailPermissionGroups
  },

  SET_AUTH_TOKEN (state, value) {
    state.token = value
  },

  LOAD_PROFILE_WALLETS (state, payload) {
    state.wallets = payload
  },

  LOAD_PROFILE_TRANSACTIONS (state, payload) {
    state.transactions = payload
  }
}
