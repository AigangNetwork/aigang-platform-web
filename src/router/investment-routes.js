import Investment from '@/views/Investment'
import Portfolio from '@/views/investment/Portfolio'

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
      }
      // {
      //   name: 'MyPolicyList',
      //   path: '/insurance/policy/mypolicies',
      //   component: MyPolicyList,
      //   meta: {
      //     authRequired: true
      //   }
    ]
  }
]
