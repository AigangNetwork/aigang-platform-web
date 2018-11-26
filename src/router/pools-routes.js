import Pools from '@/views/Pools'
import Portfolio from '@/views/pools/Portfolio'
import PoolsProducts from '@/views/pools/PoolsProducts'
import PoolsProduct from '@/views/pools/PoolsProduct'

export default [
  {
    path: '/pools',
    component: Pools,
    children: [
      {
        name: 'Pools',
        path: '',
        redirect: '/pools/portfolio'
      },
      {
        name: 'Portfolio',
        path: '/pools/portfolio',
        component: Portfolio
      },
      {
        name: 'PoolsProducts',
        path: '/pools/products',
        component: PoolsProducts
      }
    ]
  },
  {
    path: '/pools/products/:id',
    component: PoolsProduct,
    name: 'PoolsProduct'
  }
]
