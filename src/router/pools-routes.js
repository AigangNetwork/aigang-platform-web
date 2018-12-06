import Pools from '@/components/pools/Pools'
import Portfolio from '@/components/pools/Portfolio'
import PoolsProductsList from '@/components/pools/PoolsProductsList'
import PoolsProduct from '@/components/pools/PoolsProduct'
import PoolContribution from '@/components/pools/PoolContribution'

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
