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
    if (!store.getters.isAuthenticated) {
      next({ path: '/login' })
    } else {
      next()
    }
  }

  if (guestRequired) {
    if (store.getters.isAuthenticated) {
      next({ path: '/' })
    } else {
      next()
    }
  }

  next()
})

export default router
