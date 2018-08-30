const mutations = {
  LOGIN (state, payload) {
    state.user.authenticated = true
    // state.user.token = payload.token
    state.user.profile = payload.profile
  },
  LOGOUT (state) {
    state.user.authenticated = false
    state.user.token = null
    state.user.profile = null
  },
  CHANGE_PROFILE_NAMES (state, payload) {
    state.user.profile.firstName = payload.data.profile.firstName
    state.user.profile.lastName = payload.data.profile.lastName
    state.user.profile.userName = payload.data.profile.userName
  },
  LOAD_PROFILE_WALLETS (state, payload) {
    state.user.wallets = payload
  },
  LOAD_PROFILE_TRANSACTIONS (state, payload) {
    state.user.transactions = payload
  },
  LOAD_DATASET (state, payload) {
    state.dataset = payload.data
    state.dataset.commentsCount = payload.commentsCount
    state.dataset.modelsCount = payload.modelsCount
    if (state.dataset.remoteFileAccessPoint) {
      state.dataset.isFileRemote = true
    } else {
      state.dataset.isFileRemote = false
    }
    if (payload.tags) {
      state.dataset.tags = payload.tags
    }
  },
  SET_REMOTE_FILE_ACCESS_POINT (state, payload) {
    state.dataset.remoteFileAccessPoint = payload.remoteFileAccessPoint
  },
  SET_DATASET_FILE (state, payload) {
    state.dataset.file = payload.file
    state.dataset.isFileRemote = false
    state.dataset.hasFileChanged = true
  },
  SET_IS_FILE_REMOTE (state, payload) {
    state.dataset.isFileRemote = payload.isFileRemote
  },
  SET_HAS_FILE_CHANGED (state, payload) {
    state.dataset.hasFileChanged = payload.hasFileChanged
  },
  SET_WEB3_INSTANCE (state, payload) {
    state.userWeb3 = { ...payload
    }
    state.userWeb3.aixBalance = parseInt(state.userWeb3.aixBalance, 10)
  },
  CLEAR_WEB3_INSTANCE (state) {
    state.userWeb3 = {}
  },
  LOAD_MODEL (state, payload) {
    if (payload.data) {
      state.model = payload.data
      state.model.userName = payload.userName
      state.model.commentsCount = payload.commentsCount
    }
  },
  CLEAR_DATASET (state) {
    state.dataset = {}
  },
  CLEAR_MODEL (state) {
    state.model = {}
  },
  LOAD_CURRENT_PRODUCT (state, payload) {
    state.product = payload.product
  },
  CLEAR_CURRENT_PRODUCT (state) {
    state.product = {}
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_POLICY (state, payload) {
    state.policy = payload.policy
    state.policy.isClaimable = true
  },
  CLEAR_POLICY (state) {
    state.policy = {}
  },
  LOAD_USER_POLICIES (state, payload) {
    state.user.policies = payload
  },
  SET_POLICY_LOADING_INFO (state, policyLoadingInfo) {
    state.policyLoadingInfo = policyLoadingInfo
  },
  CLEAR_POLICY_LOADING_INFO (state) {
    state.policyLoadingInfo = {}
  },
  SET_TX_HASH (state, txHash) {
    state.txHash = txHash
  },
  SET_EMAIL_OPT_OUT (state, payload) {
    state.user.emailPermissionGroups.map(g => {
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

    state.user.emailPermissionGroups = payload.emailPermissionGroups
  },
  SET_POLICY_LOADING_FAILED (state, value) {
    state.policyLoadingInfo.failed = value
  },
  SET_IS_POLICY_LOADING_VISIBLE (state, value) {
    state.isPolicyLoadingVisible = value
  },
  SET_AUTH_TOKEN (state, value) {
    state.user.token = value
  }
}

export default mutations
