import * as types from './mutation-types'
import router from '@/router'
import axios from 'axios'
import getWeb3 from '@/utils/web3/getWeb3'
import { sleep } from '@/utils/methods'

const logIn = ({ commit }, loginResponse) => {
  // after successful login setup interceptor (save authorization header with token for next requests)
  // axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.headers['set-authorization']}`
  // axios.interceptors.request.use(config => {
  //   config.headers['Authorization'] = `Bearer ${loginResponse.headers['set-authorization']}`
  //   return config
  // }, error => {
  //   return Promise.reject(error)
  // })

  commit(types.LOGIN, loginResponse.data)
  getWeb3()
    .then(result => {
      commit(types.SET_WEB3_INSTANCE, result)
    })
    .catch(e => {})
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

const registerWeb3Instance = ({ commit }, response) => {
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

const createNewPolicy = async ({ commit, state }, payload) => {
  // We need custom axios instance to handle 404 differently
  const customAxios = axios.create({ baseUrl: process.env.API_ADDRESS })
  const { deviceId, productId } = payload
  commit(types.SET_LOADING, false)
  commit(types.CLEAR_POLICY_LOADING_INFO)

  const policyLoadingInfo = {
    deviceId: deviceId
  }

  commit(types.SET_POLICY_LOADING_INFO, policyLoadingInfo)

  let response = null

  // STEP 1: getting task ID
  try {
    response = await customAxios.get('insurance/policy/android/pair/' + deviceId)
  } catch (error) {
    var newPolicyLoadingInfo = Object.assign({}, policyLoadingInfo)

    if (error.response.status === 404) {
      newPolicyLoadingInfo.notFound = true
    } else if (error.response.status === 503 || error.response.status === 500) {
      newPolicyLoadingInfo.serverError = true
    }

    commit(types.SET_POLICY_LOADING_INFO, newPolicyLoadingInfo)
    return
  }

  commit(types.CLEAR_POLICY_LOADING_INFO)
  policyLoadingInfo.taskId = response.data.taskId
  commit(types.SET_POLICY_LOADING_INFO, policyLoadingInfo)

  // STEP 2: gettings task
  let waitMultiplier = 1
  while (!response.data.policyId && !response.data.validationResultCode && state.policyLoadingInfo.taskId) {
    response = await axios.post('insurance/policy/android', {
      TaskId: policyLoadingInfo.taskId,
      ProductId: productId
    })

    await sleep(waitMultiplier * 250)
    waitMultiplier++
  }

  commit(types.CLEAR_POLICY_LOADING_INFO)

  if (response.data.validationResultCode) {
    policyLoadingInfo.validationResultCode = response.data.validationResultCode
  } else {
    policyLoadingInfo.policyId = response.data.policyId
  }

  commit(types.SET_POLICY_LOADING_INFO, policyLoadingInfo)
}

const getPolicy = async ({ commit }, policyId) => {
  commit(types.SET_LOADING, true)
  commit(types.CLEAR_CURRENT_POLICY)
  const response = await axios.get('insurance/policy/android/' + policyId)

  if (response && response.data) {
    commit(types.SET_CURRENT_POLICY, response.data)
  }

  commit(types.SET_LOADING, false)
}

const sendPolicyPayment = async ({ commit, state }) => {
  const web3 = state.userWeb3.web3Instance()
  const productAddress = state.currentPolicy.contractAddress

  const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)
  const paymentValue = web3.utils.toWei(state.currentPolicy.premium.toString())
  const policyIdBytes = web3.utils.fromAscii(state.currentPolicy.id)

  TokenInstance.methods
    .approveAndCall(productAddress, paymentValue, policyIdBytes)
    .send({ gas: 169266, from: state.userWeb3.coinbase })
    .once('transactionHash', async txHash => {
      const transactionInfo = {
        txId: txHash,
        txType: 'PolicyPayment',
        txMetadata: JSON.stringify({ policyId: state.currentPolicy.id })
      }

      await axios.post('transaction', transactionInfo)

      commit(types.SET_TX_HASH, txHash)
    })
}

const loadUserPolicies = async ({commit}, page) => {
  const response = await axios.get('/insurance/policy/mypolicies?page=' + page)
  if (response.data) {
    commit(types.LOAD_USER_POLICIES, response.data)
  }
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
  clearWeb3Instance,
  loadCurrentModel,
  clearCurrentDataset,
  clearCurrentModel,
  loadCurrentProduct,
  loadUserPolicies,
  createNewPolicy,
  getPolicy,
  sendPolicyPayment
}
