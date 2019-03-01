import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  var authRequired = to.matched.some(record => record.meta.authRequired)
  var guestRequired = to.matched.some(record => record.meta.guestRequired)

  if (authRequired) {
    if (!store.getters['user/isAuthenticated']) {
      store.dispatch('resetRootState')
      next({ name: 'Login', params: { returnTo: to.path } })
    } else {
      next()
    }
  }

  if (guestRequired) {
    if (store.getters['user/isAuthenticated']) {
      next({ path: '/' })
    } else {
      next()
    }
  }

  if (!store.state.isEthNetworkCorrect) {
    if (to.path.includes('/pools') || to.path.includes('/predictions') || to.path.includes('/insurance')) {
      store.commit('setShowEthNetworkError', true)
    }
  }

  next()
})

export default router
