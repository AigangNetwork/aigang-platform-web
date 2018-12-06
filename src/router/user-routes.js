import Login from '@/components/guest/Login'
import Register from '@/components/guest/Register'
import ForgotPassword from '@/components/guest/ForgotPassword'
import ActivateEmail from '@/components/guest/ActivateEmail'
import ResetPassword from '@/components/guest/ResetPassword'
import Profile from '@/components/profile/Profile'
import General from '@/components/profile/General'
import Wallets from '@/components/profile/Wallets'
import Transactions from '@/components/profile/Transactions'
import Notifications from '@/components/profile/Notifications'

export default [
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
    path: '/activateEmail',
    name: 'ActivateEmail',
    component: ActivateEmail
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
    name: 'Resetpassword',
    component: ResetPassword
  },

  {
    path: '/profile',
    redirect: '/profile/general'
  },
  {
    path: '/profile',
    component: Profile,
    children: [
      {
        name: 'ProfileGeneral',
        path: '/profile/general',
        component: General,
        meta: {
          authRequired: true
        }
      },
      {
        name: 'ProfileWallets',
        path: '/profile/wallets',
        component: Wallets
      },
      {
        name: 'ProfileTransactions',
        path: '/profile/transactions',
        component: Transactions,
        meta: {
          authRequired: true
        }
      },
      {
        name: 'ProfileNotifications',
        path: '/profile/notifications',
        component: Notifications,
        meta: {
          authRequired: true
        }
      }
    ]
  }
]
