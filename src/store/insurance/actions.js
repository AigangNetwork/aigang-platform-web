import axios from 'axios'
import { sleep } from '@/utils/methods'

export default {
  async loadProduct ({ commit }, id) {
    commit('CLEAR_CURRENT_PRODUCT')
    commit('SET_LOADING', true, { root: true })

    let response = null

    try {
      response = await axios.get('insurance/products/' + id)
    } catch (e) {
      commit('SET_LOADING', false, { root: true })
    }

    if (response && response.data.product) {
      commit('LOAD_CURRENT_PRODUCT', response.data)
      commit('SET_LOADING', false, { root: true })
    } else {
      commit('CLEAR_CURRENT_PRODUCT')
      commit('SET_LOADING', false, { root: true })
    }
  },

  async createNewPolicy ({ commit, state }, { deviceId, productId }) {
    commit('CLEAR_POLICY_LOADING_INFO')
    commit('SET_IS_POLICY_LOADING_VISIBLE', true)

    try {
      await loadTaskId(commit, {
        DeviceId: deviceId,
        ProductId: productId,
        IsCreatePolicy: true
      })
    } catch (error) {
      handlePolicyLoadingInfoError(error, state.policyLoadingInfo, commit)
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
        commit('SET_POLICY_LOADING_FAILED', true)
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

    commit('SET_POLICY_LOADING_INFO', newPolicyLoadingInfo)
  },

  async getPolicy ({ commit }, policyId) {
    commit('SET_LOADING', true, { root: true })
    commit('CLEAR_POLICY')

    const response = await axios.get('insurance/policy/' + policyId)

    if (response && response.data) {
      commit('SET_POLICY', response.data)
    }

    commit('SET_LOADING', false, { root: true })
  },

  async sendPolicyPayment ({ commit, dispatch, state, rootState }) {
    const web3 = rootState.user.userWeb3.web3()
    const productAddress = state.policy.contractAddress
    const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)
    const paymentValue = web3.utils.toWei(state.policy.premium.toString())
    const policyId = state.policy.id
    const policyIdBytes = web3.utils.fromAscii(policyId)

    TokenInstance.methods
      .approveAndCall(productAddress, paymentValue, policyIdBytes)
      .send({
        gas: 190000,
        from: rootState.user.userWeb3.coinbase
      })
      .once('transactionHash', async txHash => {
        const request = {
          policyId,
          txId: txHash
        }
        commit('SET_TX_HASH', txHash)

        await axios.post('/insurance/transaction', request)

        dispatch('getPolicy', policyId)
      })
  },

  async loadUserPolicies ({ commit }, page) {
    commit('SET_LOADING', true, { root: true })

    const response = await axios.get('/insurance/policy/mypolicies?page=' + page)
    if (response.data) {
      commit('LOAD_USER_POLICIES', response.data.policies)
      commit('SET_LOADING', false, { root: true })
    }
  },

  async verifyClaim ({ commit, state }) {
    commit('CLEAR_POLICY_LOADING_INFO')
    commit('SET_IS_POLICY_LOADING_VISIBLE', true)

    // Getting task id
    try {
      await loadTaskId(commit, {
        DeviceId: state.policy.deviceId,
        ProductId: state.policy.productId,
        IsCreatePolicy: false
      })
    } catch (error) {
      handlePolicyLoadingInfoError(error, state.policyLoadingInfo, commit)
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
        commit('SET_POLICY_LOADING_FAILED', true)
        break
      }

      await sleep(1000)
    }

    let newPolicyLoadingInfo = Object.assign({}, state.policyLoadingInfo)
    newPolicyLoadingInfo.isClaimable = response.data.isClaimable
    newPolicyLoadingInfo.isTaskFinished = response.data.isTaskFinished
    commit('SET_POLICY_LOADING_INFO', newPolicyLoadingInfo)
  },

  async claim ({ commit, dispatch, state }) {
    commit('SET_LOADING', true, { root: true })

    const policyId = state.policy.id

    try {
      const response = await axios.post('/insurance/claim', {
        policyId
      })

      if (response && response.data) {
        await dispatch('getPolicy', policyId)
      }
    } catch (err) {}

    commit('SET_LOADING', false, { root: true })
  },

  async deletePolicy ({ commit, state }) {
    commit('SET_LOADING', true, { root: true })

    const policyId = state.policy.id

    try {
      await axios.delete(`/insurance/deletepolicy/${policyId}`)
    } catch (err) {}

    commit('SET_LOADING', false)
  }
}

const loadTaskId = async (commit, request) => {
  // We need custom axios instance to handle 404 differently
  const customAxios = axios.create({
    baseUrl: process.env.API_ADDRESS
  })

  const policyLoadingInfo = {
    deviceId: request.DeviceId
  }

  commit('SET_POLICY_LOADING_INFO', policyLoadingInfo)

  const response = await customAxios.post('insurance/policy/android/pair', request)

  commit('CLEAR_POLICY_LOADING_INFO')
  policyLoadingInfo.taskId = response.data.taskId
  commit('SET_POLICY_LOADING_INFO', policyLoadingInfo)

  return response
}

const handlePolicyLoadingInfoError = async (error, policyLoadingInfo, commit) => {
  let newPolicyLoadingInfo = Object.assign({}, policyLoadingInfo)

  if (error.response.status === 404) {
    newPolicyLoadingInfo.notFound = true
  } else if (error.response.status === 400) {
    newPolicyLoadingInfo.validationReasons = []

    if (error.response.data.params) {
      error.response.data.params.ValidationFailed.forEach(val =>
        newPolicyLoadingInfo.validationReasons.push('errors.validation.' + val.reason)
      )
    } else if (error.response.data.reason) {
      newPolicyLoadingInfo.validationReasons.push('errors.validation.' + error.response.data.reason)
    }
  } else if (error.response.status === 503 || error.response.status === 500) {
    newPolicyLoadingInfo.serverError = true
  }

  commit('SET_POLICY_LOADING_INFO', newPolicyLoadingInfo)
}
