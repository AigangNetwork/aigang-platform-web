import Investment from '@/views/Investment'
import Portfolio from '@/views/investment/Portfolio'
import InvestmentProducts from '@/views/investment/InvestmentProducts'

export default [
  {
    path: '/investment',
    component: Investment,
    children: [
      {
        name: 'Investment',
        path: '',
        redirect: '/investment/portfolio'
      },
      {
        name: 'Portfolio',
        path: '/investment/portfolio',
        component: Portfolio
      },
      {
        name: 'InvestmentProducts',
        path: '/investment/products',
        component: InvestmentProducts
      }
    ]
  }
]
