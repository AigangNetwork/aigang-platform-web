export default {
  product: state => state.product,
  policy: state => state.policy,
  userPolicies: state => state.userPolicies,
  policyLoadingInfo: state => state.policyLoadingInfo,
  isPolicyLoadingVisible: state => state.isPolicyLoadingVisible,
  txHash: state => state.txHash,
  transactionError: state => state.transactionError
}
