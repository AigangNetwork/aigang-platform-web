import * as types from './mutation-types'
import router from '@/router'
import axios from 'axios'
import getWeb3 from '@/utils/web3/getWeb3'
import { sleep } from '@/utils/methods'

const logIn = ({ commit, dispatch }, loginResponse) => {
  // after successful login setup interceptor (save authorization header with token for next requests)
  // axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.headers['set-authorization']}`
  // axios.interceptors.request.use(config => {
  //   config.headers['Authorization'] = `Bearer ${loginResponse.headers['set-authorization']}`
  //   return config
  // }, error => {
  //   return Promise.reject(error)
  // })

  commit(types.LOGIN, loginResponse.data)
  dispatch('refreshWeb3Instance')
  router.push('/')

  // get account profile
  // axios.get('/account').then(response => {
  //   // save token and user profile to store
  //   commit(types.LOGIN, loginResponse.data)
  //   // push to / route
  //   router.push('/')
  // })
}

const logOut = ({ commit }) => {
  commit(types.LOGOUT)
  commit(types.CLEAR_WEB3_INSTANCE)
  delete axios.defaults.headers.common['Authorization']
}

const changeProfileNames = ({ commit }, response) => {
  commit(types.CHANGE_PROFILE_NAMES, response)
}

const loadProfileWallets = async ({ commit }, page) => {
  commit(types.SET_LOADING, true)
  const response = await axios.get('/account/mywallets?page=' + page)
  if (response.data) {
    commit(types.LOAD_PROFILE_WALLETS, response.data)
    commit(types.SET_LOADING, false)
  }
}

const loadProfileTransactions = async ({ commit }, page) => {
  commit(types.SET_LOADING, true)
  const response = await axios.get('/transaction/mytransactions?page=' + page)
  if (response.data) {
    commit(types.LOAD_PROFILE_TRANSACTIONS, response.data)
    commit(types.SET_LOADING, false)
  }
}

const setNotificationPermission = async ({ commit }, payload) => {
  commit(types.SET_LOADING, true)
  const response = await axios.post('/account/updateemailoptout', {
    emailTypeId: payload.id,
    value: payload.value
  })

  if (response.data) {
    commit(types.SET_EMAIL_OPT_OUT, payload)
    commit(types.SET_LOADING, false)
  }
}

const loadNotificationPermissions = async ({ commit }, emailPermissionGroups) => {
  commit(types.SET_LOADING, true)
  const response = await axios.get('/account/myemailoptouts')

  if (response.data) {
    commit(types.SET_NOTIFICATION_PERMISSIONS, { emailPermissionGroups, response: response.data })
    commit(types.SET_LOADING, false)
  }
}

const loadCurrentDataset = async ({ commit, state }, id) => {
  const response = await axios.get('/data/' + id)
  if (response.data.data) {
    commit(types.LOAD_CURRENT_DATASET, response.data)
  } else {
    commit(types.CLEAR_CURRENT_DATASET)
  }
}

const clearCurrentDataset = ({ commit }) => {
  commit(types.CLEAR_CURRENT_DATASET)
}

const clearCurrentModel = ({ commit }) => {
  commit(types.CLEAR_CURRENT_MODEL)
}

const setRemoteFileAccessPoint = ({ commit }, response) => {
  commit(types.SET_REMOTE_FILE_ACCESS_POINT, response)
}

const setCurrentDatasetFile = ({ commit }, response) => {
  commit(types.SET_CURRENT_DATASET_FILE, response)
}

const setIsFileRemote = ({ commit }, response) => {
  commit(types.SET_IS_FILE_REMOTE, response)
}

const setHasFileChanged = ({ commit }, response) => {
  commit(types.SET_HAS_FILE_CHANGED, response)
}

const registerWeb3Instance = ({ commit, dispatch }, response) => {
  getWeb3()
    .then(result => {
      commit(types.SET_WEB3_INSTANCE, result)
      if (result) {
        result.web3().currentProvider.publicConfigStore.on('update', () => {
          dispatch('refreshWeb3Instance')
        })
      }
    })
    .catch(e => {})
}

const refreshWeb3Instance = ({ commit }) => {
  getWeb3()
    .then(result => {
      commit(types.SET_WEB3_INSTANCE, result)
    })
    .catch(e => {})
}

const clearWeb3Instance = ({ commit }, response) => {
  commit(types.CLEAR_WEB3_INSTANCE, response)
}

const loadCurrentModel = async ({ commit, state }, payload) => {
  const response = await axios.get(`/data/${payload.datasetId}/models/${payload.modelId}`)
  commit(types.LOAD_CURRENT_MODEL, response.data)
}

const loadCurrentProduct = async ({ commit }, id) => {
  commit(types.CLEAR_CURRENT_PRODUCT)
  commit(types.SET_LOADING, true)

  let response = null

  try {
    response = await axios.get('insurance/products/' + id)
  } catch (e) {
    commit(types.SET_LOADING, false)
  }

  if (response && response.data.product) {
    commit(types.LOAD_CURRENT_PRODUCT, response.data)
    commit(types.SET_LOADING, false)
  } else {
    commit(types.CLEAR_CURRENT_PRODUCT)
    commit(types.SET_LOADING, false)
  }
}

const createNewPolicy = async ({ commit, state }, { deviceId, productId }) => {
  commit(types.CLEAR_POLICY_LOADING_INFO)
  commit(types.SET_IS_POLICY_LOADING_VISIBLE, true)

  try {
    await loadTaskId(commit, {
      DeviceId: deviceId,
      ProductId: productId,
      IsCreatePolicy: true
    })
  } catch (e) {
    return
  }

  // Creating policy
  let retryCount = process.env.RETRY_COUNT || 10
  let response = null
  while (!response || (!response.data.policyId && !response.data.validationResultCode)) {
    response = await axios.post('insurance/policy', {
      DeviceId: deviceId,
      TaskId: state.policyLoadingInfo.taskId,
      ProductId: productId
    })

    retryCount--

    if (retryCount === 0) {
      commit(types.SET_FAILED_CREATE_POLICY, true)
      commit(types.SET_LOADING, false)
      break
    }

    await sleep(1000)
  }

  let newPolicyLoadingInfo = Object.assign({}, state.policyLoadingInfo)

  if (response.data.validationResultCode) {
    newPolicyLoadingInfo.validationResultCode = response.data.validationResultCode
  } else {
    newPolicyLoadingInfo.policyId = response.data.policyId
  }

  commit(types.SET_POLICY_LOADING_INFO, newPolicyLoadingInfo)
}

const getPolicy = async ({ commit }, policyId) => {
  commit(types.SET_LOADING, true)
  commit(types.CLEAR_CURRENT_POLICY)

  const response = await axios.get('insurance/policy/' + policyId)

  if (response && response.data) {
    commit(types.SET_CURRENT_POLICY, response.data)
  }

  commit(types.SET_LOADING, false)
}

const sendPolicyPayment = async ({ commit, dispatch, state }) => {
  const web3 = state.userWeb3.web3Instance()
  const productAddress = state.currentPolicy.contractAddress

  const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)
  const paymentValue = web3.utils.toWei(state.currentPolicy.premium.toString())
  const policyIdBytes = web3.utils.fromAscii(state.currentPolicy.id)

  TokenInstance.methods
    .approveAndCall(productAddress, paymentValue, policyIdBytes)
    .send({ gas: 190000, from: state.userWeb3.coinbase })
    .once('transactionHash', async txHash => {
      const policyId = state.currentPolicy.id

      const request = {
        policyId,
        txId: txHash,
        txType: 'PolicyPayment',
        txMetadata: JSON.stringify({ policyId })
      }

      await axios.post('/insurance/transaction', request)

      commit(types.SET_TX_HASH, txHash)

      dispatch('getPolicy', policyId)
    })
}

const loadUserPolicies = async ({ commit }, page) => {
  commit(types.SET_LOADING, true)

  const response = await axios.get('/insurance/policy/mypolicies?page=' + page)
  if (response.data) {
    commit(types.LOAD_USER_POLICIES, response.data)
    commit(types.SET_LOADING, false)
  }
}

const verifyClaim = async ({ commit, dispatch, state }) => {
  commit(types.SET_LOADING, true)

  // Getting task id
  try {
    await loadTaskId(commit, {
      DeviceId: state.currentPolicy.deviceId,
      ProductId: state.currentPolicy.productId,
      IsCreatePolicy: false
    })
  } catch (e) {
    commit(types.SET_LOADING, false)
    commit(types.SET_FAILED_VERIFY_CLAIM, true)
    return
  }

  commit(types.SET_FAILED_VERIFY_CLAIM, false)

  let retryCount = process.env.RETRY_COUNT || 10

  let response = null
  while (!response || !response.data.isTaskFinished) {
    response = await axios.put('/insurance/verifypolicyclaim', {
      TaskId: state.policyLoadingInfo.taskId,
      PolicyId: state.currentPolicy.id
    })

    retryCount--

    if (retryCount === 0) {
      commit(types.SET_FAILED_VERIFY_CLAIM, true)
      commit(types.SET_LOADING, false)
      break
    }

    await sleep(1000)
  }

  if (response.data.isTaskFinished && response.data.isClaimable) {
    await dispatch('getPolicy', state.currentPolicy.id)
    commit(types.SET_IS_CLAIMABLE, true)
  }

  if (response.data.isTaskFinished && !response.data.isClaimable) {
    commit(types.SET_IS_CLAIMABLE, false)
  }

  commit(types.SET_LOADING, false)
}

const claim = async ({ commit, dispatch, state }) => {
  commit(types.SET_LOADING, true)

  const policyId = state.currentPolicy.id

  try {
    const response = await axios.post('/insurance/claim', { policyId })

    if (response && response.data) {
      dispatch('getPolicy', policyId)
    }
  } catch (err) {}

  commit(types.SET_LOADING, false)
}

const deletePolicy = async ({ commit, dispatch, state }) => {
  commit(types.SET_LOADING, true)

  const policyId = state.currentPolicy.id

  try {
    await axios.delete(`/insurance/deletepolicy/${policyId}`)
  } catch (err) {}

  commit(types.SET_LOADING, false)
}

export {
  logIn,
  logOut,
  changeProfileNames,
  loadProfileWallets,
  loadProfileTransactions,
  setNotificationPermission,
  loadNotificationPermissions,
  loadCurrentDataset,
  setRemoteFileAccessPoint,
  setCurrentDatasetFile,
  setIsFileRemote,
  setHasFileChanged,
  registerWeb3Instance,
  refreshWeb3Instance,
  clearWeb3Instance,
  loadCurrentModel,
  clearCurrentDataset,
  clearCurrentModel,
  loadCurrentProduct,
  loadUserPolicies,
  createNewPolicy,
  getPolicy,
  sendPolicyPayment,
  verifyClaim,
  claim,
  deletePolicy
}

const loadTaskId = async (commit, request) => {
  // We need custom axios instance to handle 404 differently
  const customAxios = axios.create({ baseUrl: process.env.API_ADDRESS })

  const policyLoadingInfo = {
    deviceId: request.DeviceId
  }

  commit(types.SET_POLICY_LOADING_INFO, policyLoadingInfo)

  let response = null

  // STEP 1: getting task ID
  try {
    response = await customAxios.post('insurance/policy/android/pair', request)
  } catch (error) {
    let newPolicyLoadingInfo = Object.assign({}, policyLoadingInfo)

    if (error.response.status === 404) {
      newPolicyLoadingInfo.notFound = true
    } else if (error.response.status === 400) {
      newPolicyLoadingInfo.validationReasons = []

      error.response.data.params.ValidationFailed.forEach(val =>
        newPolicyLoadingInfo.validationReasons.push('errors.validation.' + val.reason)
      )
    } else if (error.response.status === 503 || error.response.status === 500) {
      newPolicyLoadingInfo.serverError = true
    }

    commit(types.SET_POLICY_LOADING_INFO, newPolicyLoadingInfo)
    throw new Error('Getting task id failed.')
  }

  commit(types.CLEAR_POLICY_LOADING_INFO)
  policyLoadingInfo.taskId = response.data.taskId
  commit(types.SET_POLICY_LOADING_INFO, policyLoadingInfo)

  return response
}
