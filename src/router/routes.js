import Login from '@/views/Login'
import Register from '@/views/Register'

import Dashboard from '@/views/Dashboard'
import Data from '@/views/Data'
import DataInner from '@/views/DataInner'
import Predictions from '@/views/Predictions'
import Invest from '@/views/Invest'
import Insure from '@/views/Insure'
import Profile from '@/views/Profile'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guestRequired: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guestRequired: true
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      authRequired: true
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
    path: '/data/:id',
    name: 'DataInner',
    component: DataInner,
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
