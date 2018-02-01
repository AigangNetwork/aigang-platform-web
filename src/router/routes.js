import Login from '@/views/guest/Login'
import Register from '@/views/guest/Register'
import ForgotPassword from '@/views/guest/ForgotPassword'

import Dashboard from '@/views/Dashboard'
import Data from '@/views/Data'
import DataInner from '@/views/DataInner'
import DataModels from '@/views/DataModels'
import DataDetails from '@/views/DataDetails'

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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      guestRequired: true
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/data',
    name: 'Data',
    component: Data
  },
  {
    path: '/data/:id',
    component: DataInner,
    name: 'DataInner',
    children: [
      {
        name: 'DataDetails',
        path: 'details',
        component: DataDetails
      },
      {
        name: 'DataModels',
        path: 'models',
        component: DataModels
      }
    ]
  },
  {
    path: '/predictions',
    name: 'Predictions',
    component: Predictions
  },
  {
    path: '/invest',
    name: 'Invest',
    component: Invest
  },
  {
    path: '/insure',
    name: 'Insure',
    component: Insure
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
