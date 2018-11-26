import NotFound from '@/views/general/NotFound'
import AccessDenied from '@/views/general/AccessDenied'
import ServiceUnavailable from '@/views/general/ServiceUnavailable'
import CookiesPolicy from '@/views/general/CookiesPolicy'

import DataRoutes from './data-routes'
import InsuranceRoutes from './insurance-routes'
import UserRoutes from './user-routes'
import PoolsRoutes from './pools-routes'
import PredictionsRoutes from './predictions-routes'

let routes = [
  ...UserRoutes,
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
    path: '/cookies-policy',
    name: 'CookiesPolicy',
    component: CookiesPolicy
  }
]

if (process.env.FEATURE_TOGGLE.DATA) {
  routes = [...routes, ...DataRoutes]
}

if (process.env.FEATURE_TOGGLE.INSURANCE) {
  routes = [...routes, ...InsuranceRoutes]
}

if (process.env.FEATURE_TOGGLE.POOLS) {
  routes = [...routes, ...PoolsRoutes]
}

if (process.env.FEATURE_TOGGLE.PREDICTIONS) {
  routes = [...routes, ...PredictionsRoutes]
}

export default routes
