import Insurance from '@/views/Insurance'
import ProductItemsList from '@/views/insurance/ProductItemsList'
import Policy from '@/views/insurance/policy/Policy'
import Product from '@/views/insurance/Product'
import MyPolicyList from '@/views/insurance/MyPolicyList'

export default [
  {
    path: '/insurance',
    component: Insurance,
    props: true,
    children: [
      {
        name: 'Insurance',
        path: '',
        redirect: '/insurance/products'
      },
      {
        name: 'InsuranceProducts',
        path: '/insurance/products',
        component: ProductItemsList,
        props: () => ({
          requestPath: '/insurance/list?page=',
          routerPath: '/insurance/products?page='
        })
      },
      {
        name: 'MyPolicyList',
        path: '/insurance/policy/mypolicies',
        component: MyPolicyList,
        meta: {
          authRequired: true
        }
      }
    ]
  },
  {
    name: 'Product',
    path: '/insurance/products/:id',
    component: Product
  },
  {
    name: 'Policy',
    path: '/insurance/policy/:policyId',
    component: Policy
  }
]
