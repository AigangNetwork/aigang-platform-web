export default {
  isAuthenticated: state => state.authenticated,
  token: state => state.token,
  wallets: state => state.wallets,
  transactions: state => state.transactions,
  emailPermissionGroups: state => state.emailPermissionGroups,
  insufficientBalance: state => state.insufficientBalance,
  aixBalance: state => (state.userWeb3.aixBalance ? state.userWeb3.aixBalance : 0),
  isWeb3Loaded: state => state.isWeb3Loaded,
  isWeb3Enabled: state => state.isWeb3Enabled,
  coinbase: state => state.userWeb3.coinbase
}
