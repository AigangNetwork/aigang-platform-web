import Predictions from '@/views/Predictions'
import NotFound from '@/views/general/NotFound'
import AccessDenied from '@/views/general/AccessDenied'
import ServiceUnavailable from '@/views/general/ServiceUnavailable'
import CookiesPolicy from '@/views/general/CookiesPolicy'

import DataRoutes from './data-routes'
import InsuranceRoutes from './insurance-routes'
import UserRoutes from './user-routes'
import PoolsRoutes from './pools-routes'
import PredictionsRoutes from './predictions-routes'

const routes = [
  ...DataRoutes,
  ...InsuranceRoutes,
  ...UserRoutes,
  ...PoolsRoutes,
  ...PredictionsRoutes,
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/service-unavailabe',
    name: 'ServiceUnavailable',
    component: ServiceUnavailable
  },
  {
    path: '/predictions',
    name: 'Predictions',
    component: Predictions
  },

  {
    path: '/cookies-policy',
    name: 'CookiesPolicy',
    component: CookiesPolicy
  }
]

export default routes
