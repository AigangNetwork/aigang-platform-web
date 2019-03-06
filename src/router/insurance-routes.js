import Insurance from '@/components//insurance/Insurance'
import ProductItemsList from '@/components/insurance/ProductItemsList'
import Policy from '@/components/insurance/policy/Policy'
import Product from '@/components/insurance/Product'
import MyPolicyList from '@/components/insurance/MyPolicyList'

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
        component: MyPolicyList
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
