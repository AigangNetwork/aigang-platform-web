const mutations = {
  LOGIN (state, payload) {
    state.user.authenticated = true
    state.user.token = payload.token
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
  LOAD_CURRENT_DATASET (state, payload) {
    state.currentDataset = payload.data
    state.currentDataset.commentsCount = payload.commentsCount
    state.currentDataset.modelsCount = payload.modelsCount
    if (state.currentDataset.remoteFileAccessPoint) {
      state.currentDataset.isFileRemote = true
    } else {
      state.currentDataset.isFileRemote = false
    }
    if (payload.tags) {
      state.currentDataset.tags = payload.tags
    }
  },
  SET_REMOTE_FILE_ACCESS_POINT (state, payload) {
    state.currentDataset.remoteFileAccessPoint = payload.remoteFileAccessPoint
  },
  SET_CURRENT_DATASET_FILE (state, payload) {
    state.currentDataset.file = payload.file
    state.currentDataset.isFileRemote = false
    state.currentDataset.hasFileChanged = true
  },
  SET_IS_FILE_REMOTE (state, payload) {
    state.currentDataset.isFileRemote = payload.isFileRemote
  },
  SET_HAS_FILE_CHANGED (state, payload) {
    state.currentDataset.hasFileChanged = payload.hasFileChanged
  },
  SET_WEB3_INSTANCE (state, payload) {
    let result = payload
    let web3Copy = state.userWeb3
    web3Copy.coinbase = result.coinbase
    web3Copy.networkId = result.networkId
    web3Copy.ethBalance = parseInt(result.ethBalance, 10)
    web3Copy.web3Instance = result.web3
    web3Copy.aixBalance = parseInt(result.aixBalance, 10)
    web3Copy.isInjected = result.isInjected
    state.userWeb3 = web3Copy
  },
  CLEAR_WEB3_INSTANCE (state, payload) {
    state.userWeb3 = {
      web3Instance: null,
      isInjected: false,
      ethBalance: null,
      networkId: null,
      coinbase: null,
      aixBalance: null,
      error: null
    }
  },
  LOAD_CURRENT_MODEL (state, payload) {
    if (payload.data) {
      state.currentModel = payload.data
      state.currentModel.userName = payload.userName
      state.currentModel.commentsCount = payload.commentsCount
    }
  },
  CLEAR_CURRENT_DATASET (state) {
    state.currentDataset = {}
  },
  CLEAR_CURRENT_MODEL (state) {
    state.currentModel = {}
  },
  LOAD_CURRENT_PRODUCT (state, payload) {
    state.currentProduct = payload.product
  },
  CLEAR_CURRENT_PRODUCT (state) {
    state.currentProduct = {}
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_CURRENT_POLICY (state, payload) {
    state.currentPolicy = payload.policy
  },
  CLEAR_CURRENT_POLICY (state, payload) {
    state.currentPolicy = {}
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
  }
}

export default mutations
