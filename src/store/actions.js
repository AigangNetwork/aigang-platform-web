import * as types from './mutation-types'
import axios from 'axios'
import { sleep } from '@/utils/methods'

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
  const web3 = state.user.userWeb3.web3()
  const productAddress = state.policy.contractAddress
  const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)
  const paymentValue = web3.utils.toWei(state.policy.premium.toString())
  const policyId = state.policy.id
  const policyIdBytes = web3.utils.fromAscii(policyId)

  TokenInstance.methods
    .approveAndCall(productAddress, paymentValue, policyIdBytes)
    .send({
      gas: 190000,
      from: state.user.userWeb3.coinbase
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
    commit(types.LOAD_USER_POLICIES, response.data.policies)
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
  loadProduct,
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
