import Dashboard from '@/views/Dashboard'
import Data from '@/views/Data'
import Predictions from '@/views/Predictions'
import Invest from '@/views/Invest'
import Insure from '@/views/Insure'
import Profile from '@/views/Profile'
import Login from '@/views/Login'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guestRequired: true
    }
  },
  {
    path: '/data',
    name: 'Data',
    component: Data,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/predictions',
    name: 'Predictions',
    component: Predictions,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/invest',
    name: 'Invest',
    component: Invest,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/insure',
    name: 'Insure',
    component: Insure,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      authRequired: true
    }
  }
]

export default routes
