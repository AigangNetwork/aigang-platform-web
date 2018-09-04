import Login from '@/views/guest/Login'
import Register from '@/views/guest/Register'
import ForgotPassword from '@/views/guest/ForgotPassword'
import ActivateEmail from '@/views/guest/ActivateEmail'
import ResetPassword from '@/views/guest/ResetPassword'
import Profile from '@/views/Profile'
import General from '@/views/profile/General'
import Wallets from '@/views/profile/Wallets'
import Transactions from '@/views/profile/Transactions'
import Notifications from '@/views/profile/Notifications'

const userRoutes = [
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

export default userRoutes
