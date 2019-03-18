export default {
  products: state => state.products,
  product: state => state.product,

  // -----------
  isPolicyLoadingVisible: state => state.isPolicyLoadingVisible,
  policy: state => state.policy,

  userPolicies: state => state.userPolicies,
  policyLoadingInfo: state => state.policyLoadingInfo,
  txHash: state => state.txHash,
  transactionError: state => state.transactionError
}
