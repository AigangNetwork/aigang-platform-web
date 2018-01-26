import Dashboard from '@/views/Dashboard'
import Data from '@/views/Data'
import Predictions from '@/views/Predictions'
import Invest from '@/views/Invest'
import Insure from '@/views/Insure'
import Profile from '@/views/Profile'

const routes = [
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
    component: Profile
  }
]

export default routes
