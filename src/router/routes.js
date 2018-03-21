import Login from '@/views/guest/Login'
import Register from '@/views/guest/Register'
import ForgotPassword from '@/views/guest/ForgotPassword'
import ActivateEmail from '@/views/guest/ActivateEmail'
import ResetPassword from '@/views/guest/ResetPassword'

import Data from '@/views/Data'
// import DataModels from '@/views/DataModels'

import Predictions from '@/views/Predictions'
import Invest from '@/views/Invest'
import Insure from '@/views/Insure'
import Profile from '@/views/Profile'
import UploadDataSet from '@/views/upload/UploadDataSet'
import Dataset from '@/views/data/Dataset'
import NotFound from '@/views/general/NotFound'
import DatasetInfo from '@/views/data/DatasetInfo'
import DatasetModels from '@/views/data/DatasetModels'
import DatasetThreads from '@/views/data/DatasetThreads'
import DatasetData from '@/views/data/DatasetData'

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
    path: '/resetPassword',
    name: 'resetpassword',
    component: ResetPassword
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
  {
    path: '/data/upload',
    name: 'Upload',
    component: UploadDataSet
  },
  {
    path: '/data/:id',
    component: Dataset,
    props: true,
    children: [
      {
        name: 'datasetInfo',
        path: '',
        component: DatasetInfo,
        props: true
      },
      {
        path: 'data',
        component: DatasetData
      },
      {
        path: 'models',
        component: DatasetModels
      },
      {
        path: 'threads',
        component: DatasetThreads
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
