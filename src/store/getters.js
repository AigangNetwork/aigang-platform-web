const getters = {
  isAuthenticated: state => {
    return state.user.authenticated
  }
}

export default getters
