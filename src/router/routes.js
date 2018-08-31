import Login from '@/views/guest/Login'
import Register from '@/views/guest/Register'
import ForgotPassword from '@/views/guest/ForgotPassword'
import ActivateEmail from '@/views/guest/ActivateEmail'
import ResetPassword from '@/views/guest/ResetPassword'
import Data from '@/views/Data'
import Predictions from '@/views/Predictions'
import Invest from '@/views/Invest'
import Insurance from '@/views/Insurance'
import Profile from '@/views/Profile'
import General from '@/views/profile/General'
import Wallets from '@/views/profile/Wallets'
import Transactions from '@/views/profile/Transactions'
import Notifications from '@/views/profile/Notifications'
import UploadDataset from '@/views/data/UploadDataset'
import Dataset from '@/views/data/Dataset'
import NotFound from '@/views/general/NotFound'
import AccessDenied from '@/views/general/AccessDenied'
import DatasetInfo from '@/views/data/DatasetInfo'
import DatasetModelList from '@/views/data/model/DatasetModelList'
import DatasetComments from '@/views/data/DatasetComments'
import DatasetData from '@/views/data/DatasetData'
import DatasetEdit from '@/views/data/DatasetEdit'
import DataItemsList from '@/views/data/DataItemsList'
import ProductItemsList from '@/views/insurance/ProductItemsList'
import Policy from '@/views/insurance/policy/Policy'
import Product from '@/views/insurance/Product'
import MyPolicyList from '@/views/insurance/MyPolicyList'
import DatasetModelForm from '@/views/data/model/DatasetModelForm'
import DatasetModelInfo from '@/views/data/model/DatasetModelInfo'
import DatasetModelTables from '@/views/data/model/DatasetModelTables'
import DatasetModelComments from '@/views/data/model/DatasetModelComments'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guestRequired: true
    }
  },
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
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guestRequired: true
    }
  },
  {
    path: '/activateEmail',
    name: 'ActivateEmail',
    component: ActivateEmail
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      guestRequired: true
    }
  },
  {
    path: '/resetPassword',
    name: 'Resetpassword',
    component: ResetPassword
  },
  {
    path: '/',
    redirect: '/data'
  },
  {
    path: '/data',
    component: Data,
    props: true,
    children: [
      {
        name: 'Data',
        path: '',
        redirect: '/data/all'
      },
      {
        name: 'all',
        path: '/data/all',
        component: DataItemsList,
        props: () => ({
          requestPath: '/data/list?page=',
          routerPath: '/data/all?page='
        })
      },
      {
        name: 'MyList',
        path: '/data/uploaded',
        component: DataItemsList,
        props: () => ({
          requestPath: '/data/mylist?page=',
          routerPath: '/data/uploaded?page=',
          isUpload: true
        })
      },
      {
        name: 'MyModelsList',
        path: '/data/models',
        component: DataItemsList,
        props: () => ({
          requestPath: '/data/mymodelslist?page=',
          routerPath: '/data/models?page=',
          isModels: true
        })
      }
    ]
  },
  {
    path: '/data/upload',
    name: 'Upload',
    component: UploadDataset,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/data/:id',
    component: Dataset,
    props: true,
    children: [
      {
        name: 'DatasetInfo',
        path: '',
        component: DatasetInfo,
        props: () => ({
          isDataset: true
        })
      },
      {
        name: 'DatasetData',
        path: 'data',
        component: DatasetData,
        props: () => ({
          isDataset: true
        })
      },
      {
        name: 'DatasetModels',
        path: 'models',
        component: DatasetModelList,
        props: route => ({
          requestPath: `/data/${route.params.id}/models`
        })
      },
      {
        name: 'DatasetComment',
        path: 'comment',
        component: DatasetComments,
        props: route => ({
          requestPath: `/data/${route.params.id}/comment`
        })
      },
      {
        name: 'UploadDataModel',
        path: 'uploadDataModel',
        component: DatasetModelForm,
        props: () => ({
          isUpload: true,
          postPath: '/data/uploadModel',
          getPath: ''
        })
      }
    ]
  },
  {
    path: '/data/:id/models/:modelId',
    component: DatasetModelInfo,
    props: true,
    children: [
      {
        name: 'ModelInfo',
        path: '',
        component: DatasetInfo,
        props: () => ({
          isModel: true
        })
      },
      {
        name: 'ModelTables',
        path: 'model',
        component: DatasetModelTables
      },
      {
        name: 'ModelComment',
        path: 'comment',
        component: DatasetModelComments,
        props: route => ({
          requestPath: `/data/${route.params.id}/models/${route.params.modelId}`
        })
      },
      {
        name: 'Edit',
        path: 'edit',
        component: DatasetModelForm,
        props: route => ({
          isUpload: false,
          getPath: `/data/${route.params.id}/models/${route.params.modelId}`,
          postPath: `/data/${route.params.id}/models/${route.params.modelId}/update`
        })
      }
    ]
  },
  {
    name: 'EditDataset',
    path: '/data/:id/edit',
    component: DatasetEdit,
    props: true,
    meta: {
      authRequired: true
    }
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
    path: '/',
    redirect: '/data'
  },
  {
    name: 'Policy',
    path: '/insurance/policy/:policyId',
    component: Policy
  },
  {
    path: '/profile',
    redirect: '/profile/general'
  },
  {
    path: '/profile',
    component: Profile,
    children: [
      {
        name: 'ProfileGeneral',
        path: '/profile/general',
        component: General,
        meta: {
          authRequired: true
        }
      },
      {
        name: 'ProfileWallets',
        path: '/profile/wallets',
        component: Wallets
      },
      {
        name: 'ProfileTransactions',
        path: '/profile/transactions',
        component: Transactions,
        meta: {
          authRequired: true
        }
      },
      {
        name: 'ProfileNotifications',
        path: '/profile/notifications',
        component: Notifications,
        meta: {
          authRequired: true
        }
      }
    ]
  }
]

export default routes
