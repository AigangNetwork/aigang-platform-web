import Pools from '@/views/Pools'
import Portfolio from '@/views/pools/Portfolio'
import PoolsProductsList from '@/views/pools/PoolsProductsList'
import PoolsProduct from '@/views/pools/PoolsProduct'
import PoolContribution from '@/views/pools/PoolContribution'

export default [
  {
    path: '/pools',
    component: Pools,
    children: [
      {
        name: 'Pools',
        path: '',
        redirect: '/pools/all'
      },
      {
        name: 'Portfolio',
        path: '/pools/portfolio',
        component: Portfolio,
        meta: {
          authRequired: true
        }
      },
      {
        name: 'PoolsProductsList',
        path: '/pools/all',
        component: PoolsProductsList
      }
    ]
  },
  {
    path: '/pools/products/:id',
    component: PoolsProduct,
    name: 'PoolsProduct'
  },
  {
    path: '/pools/contributions/:id',
    component: PoolContribution,
    name: 'PoolContribution'
  }
]
