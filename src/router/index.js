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
  if (!store.state.isEthNetworkCorrect) {
    if (to.path.includes('/pools') || to.path.includes('/predictions') || to.path.includes('/insurance')) {
      store.commit('setShowEthNetworkError', true)
    }
  }

  next()
})

export default router
