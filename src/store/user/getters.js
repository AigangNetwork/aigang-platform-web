export default {
  isAuthenticated: state => state.authenticated,

  token: state => state.token,

  wallets: state => state.wallets,

  transactions: state => state.transactions,

  emailPermissionGroups: state => state.emailPermissionGroups,

  web3: state => (state.userWeb3.web3 ? state.userWeb3.web3() : null)
}
