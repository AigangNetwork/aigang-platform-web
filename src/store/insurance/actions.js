import { initialInsuranceState } from './index'
import axios from 'axios'
import { sleep } from '@/utils/methods'

import EthUtils from '@/utils/EthUtils'
import InsuranceProduct from '@/domain/InsuranceProduct'
import Policy from '../../domain/Policy'

export default {
  async resetState ({ commit }) {
    commit('resetState', initialInsuranceState())
  },

  async getProductsList ({ commit, state }, page) {
    commit('setLoading', true, { root: true })

    commit('setProducts', {
      items: [],
      totalPages: 1
    })

    try {
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.INSURANCE.ANDROID_BATTERY)
      const itemsPerPage = process.env.INSURANCE_PRODUCT_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1

      let productsCounter = 0

      // Iterating through contracts
      for (const contract of contracts) {
        productsCounter += 1

        if (productsCounter >= startItem && productsCounter < startItem + itemsPerPage) {
          const product = await InsuranceProduct.createItem(
            contract,
            process.env.CONTRACT_TYPES.INSURANCE.ANDROID_BATTERY
          )
          commit('addProductToList', product)
        }
      }

      commit('setProductsTotalPages', Math.ceil(contracts.length / itemsPerPage))

      commit('setLoading', false, { root: true })
    } catch (ex) {
      console.error(ex)
      commit('setLoading', false, { root: true })
    }
  },

  async getProduct ({ commit }, payload) {
    commit('setLoading', true, { root: true })

    try {
      const contract = await EthUtils.getContract(payload.address)
      const product = await InsuranceProduct.create(contract, payload.type)

      commit('setProduct', product)

      commit('setLoading', false, { root: true })
    } catch (e) {
      commit('setLoading', false, { root: true })
    }
  },

  async createNewPolicy ({ commit, state, dispatch }, { productAddress, productTypeId, deviceId }) {
    commit('clearPolicyLoadingInfo')
    commit('setIsPolicyLoadingVisible', true)

    try {
      await loadTaskId(commit, {
        productAddress,
        productTypeId,
        deviceId
      })
    } catch (error) {
      handlePolicyLoadingInfoError(error, state.policyLoadingInfo, commit, dispatch)
      return
    }

    // Creating policy
    let retryCount = process.env.RETRY_COUNT || 10
    let response = null
    while (
      state.isPolicyLoadingVisible && (!response || (!response.data.policy && !response.data.validationResultCode))
    ) {
      try {
        response = await axios.post('insurance/policy', {
          productAddress,
          productTypeId,
          deviceId,
          taskId: state.policyLoadingInfo.taskId
        })
      } catch (error) {
        handlePolicyLoadingInfoError(error, state.policyLoadingInfo, commit, dispatch)
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
      newPolicyLoadingInfo.policy = response.data.policy
      newPolicyLoadingInfo.productAddress = productAddress
    }

    commit('setPolicyLoadingInfo', newPolicyLoadingInfo)
  },

  async getPolicy ({ commit, rootState }, payload) {
    commit('setLoading', true, { root: true })
    commit('clearPolicy')

    const contract = await EthUtils.getContract(payload.address)
    const policyId = EthUtils.getHex(payload.id)
    const policy = await Policy.create(contract, payload.type, policyId, rootState.user.userWeb3.coinbase)

    commit('setPolicy', policy)
    commit('setLoading', false, { root: true })
  },

  async sendPolicyPayment ({ commit, rootState }, { productAddress, policy }) {
    const web3 = window.web3
    const TokenInstance = await EthUtils.getContract(process.env.CONTRACTS_ADDRESSES.TOKEN)
    const paymentValue = EthUtils.toWei(policy.premium.toString())
    const policyIdBytes = web3.utils.fromAscii(policy.id)

    commit('setTransactionError', false)

    const gasLimit = await TokenInstance.methods
      .approveAndCall(productAddress, paymentValue, policyIdBytes)
      .estimateGas({ from: rootState.user.userWeb3.coinbase })

    TokenInstance.methods
      .approveAndCall(productAddress, paymentValue, policyIdBytes)
      .send({
        gas: gasLimit,
        from: rootState.user.userWeb3.coinbase
      })
      .on('error', () => {
        commit('setTransactionError', true)
      })
      .once('transactionHash', async txHash => {
        commit('setTxHash', txHash)
      })
  },

  async loadUserPolicies ({ commit, rootState, state }, page) {
    commit('setLoading', true, { root: true })
    commit('setUserPolicies', {
      items: [],
      totalPages: 0
    })

    try {
      const type = process.env.CONTRACT_TYPES.INSURANCE.ANDROID_BATTERY
      const contracts = await EthUtils.getContracts(type)
      const itemsPerPage = process.env.POLICY_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1

      let totalPolicies = 0
      let iterator = 0
      // Iterating through products
      for (const contract of contracts) {
        const policiesLength = await contract.methods.myPoliciesLength(rootState.user.userWeb3.coinbase).call()
        let policiesCount = parseInt(policiesLength)
        totalPolicies += policiesCount

        // Iterating through policies
        for (let i = policiesCount - 1; i >= 0 && state.userPolicies.items.length < itemsPerPage; i--) {
          iterator++

          if (iterator < startItem) {
            continue
          }

          const id = await contract.methods.myPolicies(rootState.user.userWeb3.coinbase, i).call()
          const policy = await Policy.createItem(contract, type, id)

          commit('addPolicy', policy)

          if (iterator === startItem) {
            commit('setLoading', false, { root: true })
          }
        }

        commit('setUserPoliciesTotalPages', Math.ceil(totalPolicies / itemsPerPage))
      }

      commit('setLoading', false, { root: true })
    } catch (ex) {
      console.error(ex)
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
        ProductId: state.policy.productId
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
    deviceId: request.deviceId
  }

  commit('setPolicyLoadingInfo', policyLoadingInfo)

  const response = await customAxios.post('insurance/pair', request)

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
  } else if (error.response.status) {
    newPolicyLoadingInfo.serverError = true
  }

  commit('setPolicyLoadingInfo', newPolicyLoadingInfo)
}
