import Login from '@/views/guest/Login'
import Register from '@/views/guest/Register'
import ForgotPassword from '@/views/guest/ForgotPassword'
import ActivateEmail from '@/views/guest/ActivateEmail'

import Data from '@/views/Data'
// import DataModels from '@/views/DataModels'

import Predictions from '@/views/Predictions'
import Invest from '@/views/Invest'
import Insure from '@/views/Insure'
import Profile from '@/views/Profile'

import NotFound from '@/views/general/NotFound'

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
    path: '*',
    name: 'NotFound',
    component: NotFound
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
    path: '/activateEmail',
    name: 'ActivateEmail',
    component: ActivateEmail
    // meta: {
    //   guestRequired: true
    // }
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      guestRequired: true
    }
  },
  {
    path: '/',
    component: Data
  },
  {
    path: '/data',
    name: 'Data',
    component: Data
  },
  // {
  //   path: '/data/:id',
  //   component: DataInner,
  //   children: [
  //     {
  //       name: 'DataDetails',
  //       path: 'details',
  //       component: DataDetails
  //     },
  //     {
  //       name: 'DataModels',
  //       path: 'models',
  //       component: DataModels
  //     }
  //   ]
  // },
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
