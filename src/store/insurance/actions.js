import axios from 'axios'
import { sleep } from '@/utils/methods'

export default {
  async loadProduct ({ commit }, id) {
    commit('clearCurrentProduct')
    commit('setLoading', true, { root: true })

    let response = null

    try {
      response = await axios.get('insurance/products/' + id)
    } catch (e) {
      commit('setLoading', false, { root: true })
    }

    if (response && response.data.product) {
      commit('loadCurrentProduct', response.data)
      commit('setLoading', false, { root: true })
    } else {
      commit('clearCurrentProduct')
      commit('setLoading', false, { root: true })
    }
  },

  async createNewPolicy ({ commit, state }, { deviceId, productId }) {
    commit('clearPolicyLoadingInfo')
    commit('setIsPolicyLoadingVisible', true)

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
        commit('setPolicyLoadingFailed', true)
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

    commit('setPolicyLoadingInfo', newPolicyLoadingInfo)
  },

  async getPolicy ({ commit }, policyId) {
    commit('setLoading', true, { root: true })
    commit('clearPolicy')

    const response = await axios.get('insurance/policy/' + policyId)

    if (response && response.data) {
      commit('setPolicy', response.data)
    }

    commit('setLoading', false, { root: true })
  },

  async sendPolicyPayment ({ commit, dispatch, state, rootState }) {
    const web3 = rootState.user.userWeb3.web3()
    const productAddress = state.policy.contractAddress
    const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)
    const paymentValue = web3.utils.toWei(state.policy.premium.toString())
    const policyId = state.policy.id
    const policyIdBytes = web3.utils.fromAscii(policyId)

    commit('setTransactionError', false)

    TokenInstance.methods
      .approveAndCall(productAddress, paymentValue, policyIdBytes)
      .send({
        gas: process.env.GAS.POLICY_PAYMENT,
        from: rootState.user.userWeb3.coinbase
      })
      .on('error', () => {
        commit('setTransactionError', true)
      })
      .once('transactionHash', async txHash => {
        const request = {
          policyId,
          txId: txHash
        }
        commit('setTxHash', txHash)

        await axios.post('/insurance/transaction', request)

        dispatch('getPolicy', policyId)
      })
  },

  async loadUserPolicies ({ commit }, page) {
    commit('setLoading', true, { root: true })

    const response = await axios.get('/insurance/policy/mypolicies?page=' + page)
    if (response.data) {
      commit('loadUserPolicies', response.data.policies)
      commit('setLoading', false, { root: true })
    }
  },

  async verifyClaim ({ commit, state }) {
    commit('clearPolicyLoadingInfo')
    commit('setIsPolicyLoadingVisible', true)

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
        commit('setPolicyLoadingFailed', true)
        break
      }

      await sleep(1000)
    }

    let newPolicyLoadingInfo = Object.assign({}, state.policyLoadingInfo)
    newPolicyLoadingInfo.isClaimable = response.data.isClaimable
    newPolicyLoadingInfo.isTaskFinished = response.data.isTaskFinished
    commit('setPolicyLoadingInfo', newPolicyLoadingInfo)
  },

  async claim ({ commit, dispatch, state }) {
    commit('setLoading', true, { root: true })

    const policyId = state.policy.id

    try {
      const response = await axios.post('/insurance/claim', {
        policyId
      })

      if (response && response.data) {
        await dispatch('getPolicy', policyId)
      }
    } catch (err) {}

    commit('setLoading', false, { root: true })
  },

  async deletePolicy ({ commit }, id) {
    commit('setLoading', true, { root: true })

    try {
      await axios.delete(`/insurance/deletepolicy/${id}`)
    } catch (err) {}

    commit('setLoading', false, { root: true })
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

  commit('setPolicyLoadingInfo', policyLoadingInfo)

  const response = await customAxios.post('insurance/policy/android/pair', request)

  commit('clearPolicyLoadingInfo')
  policyLoadingInfo.taskId = response.data.taskId
  commit('setPolicyLoadingInfo', policyLoadingInfo)

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

  commit('setPolicyLoadingInfo', newPolicyLoadingInfo)
}
