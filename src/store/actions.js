import * as types from './mutation-types'
import router from '@/router'
import axios from 'axios'
import getWeb3 from '@/utils/web3/getWeb3'
import { sleep } from '@/utils/methods'

const logIn = ({ commit, dispatch }, loginResponse) => {
  commit(types.LOGIN, loginResponse.data)
  dispatch('refreshWeb3Instance')
  router.push('/')
}

const logOut = async ({ commit }) => {
  await axios.post('/account/logout')
  delete axios.defaults.headers.common['Authorization']
  commit(types.LOGOUT)
  router.push('/data')
}

const handleNotLoggedIn = ({ commit }) => {
  delete axios.defaults.headers.common['Authorization']
  commit(types.LOGOUT)
  router.push({ name: 'Login' })
}

const changeProfileNames = ({ commit }, response) => {
  commit(types.CHANGE_PROFILE_NAMES, response)
}

const loadProfileWallets = async ({ commit }, page) => {
  commit(types.SET_LOADING, true)
  const response = await axios.get('/transaction/mywallets?page=' + page)
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
    commit(types.SET_NOTIFICATION_PERMISSIONS, {
      emailPermissionGroups,
      response: response.data
    })
    commit(types.SET_LOADING, false)
  }
}

const loadDataset = async ({ commit }, id) => {
  const response = await axios.get('/data/' + id)
  if (response.data.data) {
    commit(types.LOAD_DATASET, response.data)
  } else {
    commit(types.CLEAR_DATASET)
  }
}

const clearDataset = ({ commit }) => {
  commit(types.CLEAR_DATASET)
}

const clearModel = ({ commit }) => {
  commit(types.CLEAR_MODEL)
}

const setRemoteFileAccessPoint = ({ commit }, response) => {
  commit(types.SET_REMOTE_FILE_ACCESS_POINT, response)
}

const setdatasetFile = ({ commit }, response) => {
  commit(types.SET_DATASET_FILE, response)
}

const setIsFileRemote = ({ commit }, response) => {
  commit(types.SET_IS_FILE_REMOTE, response)
}

const setHasFileChanged = ({ commit }, response) => {
  commit(types.SET_HAS_FILE_CHANGED, response)
}

const registerWeb3Instance = async ({ commit, dispatch }) => {
  const userWeb3 = await getWeb3()
  commit(types.SET_WEB3_INSTANCE, userWeb3)

  if (userWeb3 && userWeb3.web3 && userWeb3.web3().currentProvider.publicConfigStore) {
    userWeb3.web3().currentProvider.publicConfigStore.on('update', () => {
      dispatch('refreshWeb3Instance')
    })
  }
}

const refreshWeb3Instance = async ({ commit }) => {
  const userWeb3 = await getWeb3()
  commit(types.SET_WEB3_INSTANCE, userWeb3)
}

const clearWeb3Instance = ({ commit }, response) => {
  commit(types.CLEAR_WEB3_INSTANCE, response)
}

const loadModel = async ({ commit }, payload) => {
  const response = await axios.get(`/data/${payload.datasetId}/models/${payload.modelId}`)
  commit(types.LOAD_MODEL, response.data)
}

const loadProduct = async ({ commit }, id) => {
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
  while (
    state.isPolicyLoadingVisible &&
    (!response || (!response.data.policyId && !response.data.validationResultCode))
  ) {
    try {
      response = await axios.post('insurance/policy', {
        DeviceId: deviceId,
        TaskId: state.policyLoadingInfo.taskId,
        ProductId: productId
      })
    } catch (error) {
      handlePolicyLoadingInfoError(error, state.policyLoadingInfo, commit)
      return
    }

    retryCount--

    if (retryCount === 0) {
      commit(types.SET_POLICY_LOADING_FAILED, true)
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
  commit(types.CLEAR_POLICY)

  const response = await axios.get('insurance/policy/' + policyId)

  if (response && response.data) {
    commit(types.SET_POLICY, response.data)
  }

  commit(types.SET_LOADING, false)
}

const sendPolicyPayment = async ({ commit, dispatch, state }) => {
  const web3 = state.userWeb3.web3()
  const productAddress = state.policy.contractAddress
  const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)
  const paymentValue = web3.utils.toWei(state.policy.premium.toString())
  const policyId = state.policy.id
  const policyIdBytes = web3.utils.fromAscii(policyId)

  TokenInstance.methods
    .approveAndCall(productAddress, paymentValue, policyIdBytes)
    .send({
      gas: 190000,
      from: state.userWeb3.coinbase
    })
    .once('transactionHash', async txHash => {
      const request = {
        policyId,
        txId: txHash,
        txType: 'PolicyPayment',
        txMetadata: JSON.stringify({
          policyId
        })
      }
      commit(types.SET_TX_HASH, txHash)

      await axios.post('/insurance/transaction', request)

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

const verifyClaim = async ({ commit, state }) => {
  commit(types.CLEAR_POLICY_LOADING_INFO)
  commit(types.SET_IS_POLICY_LOADING_VISIBLE, true)

  // Getting task id
  try {
    await loadTaskId(commit, {
      DeviceId: state.policy.deviceId,
      ProductId: state.policy.productId,
      IsCreatePolicy: false
    })
  } catch (e) {
    return
  }

  if (!state.policyLoadingInfo.taskId) {
    return
  }

  let retryCount = process.env.RETRY_COUNT || 10

  let response = null
  while (state.isPolicyLoadingVisible && (!response || !response.data.isTaskFinished)) {
    try {
      response = await axios.put('/insurance/verifypolicyclaim', {
        TaskId: state.policyLoadingInfo.taskId,
        PolicyId: state.policy.id
      })
    } catch (error) {
      handlePolicyLoadingInfoError(error, state.policyLoadingInfo, commit)
      return
    }

    retryCount--

    if (retryCount === 0) {
      commit(types.SET_POLICY_LOADING_FAILED, true)
      break
    }

    await sleep(1000)
  }

  let newPolicyLoadingInfo = Object.assign({}, state.policyLoadingInfo)
  newPolicyLoadingInfo.isClaimable = response.data.isClaimable
  newPolicyLoadingInfo.isTaskFinished = response.data.isTaskFinished
  commit(types.SET_POLICY_LOADING_INFO, newPolicyLoadingInfo)
}

const claim = async ({ commit, dispatch, state }) => {
  commit(types.SET_LOADING, true)

  const policyId = state.policy.id

  try {
    const response = await axios.post('/insurance/claim', {
      policyId
    })

    if (response && response.data) {
      await dispatch('getPolicy', policyId)
    }
  } catch (err) {}

  commit(types.SET_LOADING, false)
}

const deletePolicy = async ({ commit, state }) => {
  commit(types.SET_LOADING, true)

  const policyId = state.policy.id

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
  loadDataset,
  setRemoteFileAccessPoint,
  setdatasetFile,
  setIsFileRemote,
  setHasFileChanged,
  registerWeb3Instance,
  refreshWeb3Instance,
  clearWeb3Instance,
  loadModel,
  clearDataset,
  clearModel,
  loadProduct,
  loadUserPolicies,
  createNewPolicy,
  getPolicy,
  sendPolicyPayment,
  verifyClaim,
  claim,
  deletePolicy,
  handleNotLoggedIn
}

const loadTaskId = async (commit, request) => {
  // We need custom axios instance to handle 404 differently
  const customAxios = axios.create({
    baseUrl: process.env.API_ADDRESS
  })

  const policyLoadingInfo = {
    deviceId: request.DeviceId
  }

  commit(types.SET_POLICY_LOADING_INFO, policyLoadingInfo)

  let response = null

  // STEP 1: getting task ID
  try {
    response = await customAxios.post('insurance/policy/android/pair', request)
  } catch (error) {
    handlePolicyLoadingInfoError(error, policyLoadingInfo, commit)
    return
  }

  commit(types.CLEAR_POLICY_LOADING_INFO)
  policyLoadingInfo.taskId = response.data.taskId
  commit(types.SET_POLICY_LOADING_INFO, policyLoadingInfo)

  return response
}

const handlePolicyLoadingInfoError = async (error, policyLoadingInfo, commit) => {
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
}
