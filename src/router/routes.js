import Login from '@/views/guest/Login'
import Register from '@/views/guest/Register'
import ForgotPassword from '@/views/guest/ForgotPassword'
import ActivateEmail from '@/views/guest/ActivateEmail'
import ResetPassword from '@/views/guest/ResetPassword'

import Data from '@/views/Data'

import Predictions from '@/views/Predictions'
import Invest from '@/views/Invest'
import Insure from '@/views/Insure'
import Profile from '@/views/Profile'
import UploadDataSet from '@/views/data/UploadDataSet'
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
import ProductDetails from '@/views/insurance/ProductDetails'
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
    // meta: {
    //   guestRequired: true
    // }
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
    name: 'resetpassword',
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
        name: 'data',
        path: '',
        redirect: '/data/all'
      },
      {
        name: 'all',
        path: '/data/all',
        component: DataItemsList,
        props: route => ({
          requestPath: '/data/list?page=',
          routerPath: '/data/all?page='
        })
      },
      {
        name: 'mylist',
        path: '/data/uploaded',
        component: DataItemsList,
        props: route => ({
          requestPath: '/data/mylist?page=',
          routerPath: '/data/uploaded?page=',
          isUpload: true
        })
      },
      {
        name: 'mymodelslist',
        path: '/data/models',
        component: DataItemsList,
        props: route => ({
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
    component: UploadDataSet,
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
        name: 'datasetInfo',
        path: '',
        component: DatasetInfo,
        props: route => ({
          isDataset: true
        })
      },
      {
        name: 'datasetData',
        path: 'data',
        component: DatasetData,
        props: route => ({
          isDataset: true
        })
      },
      {
        name: 'datasetModels',
        path: 'models',
        component: DatasetModelList,
        props: route => ({
          requestPath: `/data/${route.params.id}/models`
        })
      },
      {
        name: 'datasetcomment',
        path: 'comment',
        component: DatasetComments,
        props: route => ({
          requestPath: `/data/${route.params.id}/comment`
        })
      },
      {
        name: 'uploadDataModel',
        path: 'uploadDataModel',
        component: DatasetModelForm,
        props: route => ({
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
        name: 'modelInfo',
        path: '',
        component: DatasetInfo,
        props: route => ({
          isModel: true
        })
      },
      {
        name: 'modelTables',
        path: 'model',
        component: DatasetModelTables
      },
      {
        name: 'modelcomment',
        path: 'comment',
        component: DatasetModelComments,
        props: route => ({
          requestPath: `/data/${route.params.id}/models/${route.params.modelId}`
        })
      },
      {
        name: 'edit',
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
    path: '/insure',
    component: Insure,
    props: true,
    children: [
      {
        name: 'insure',
        path: '',
        component: ProductItemsList,
        props: route => ({
          requestPath: '/insure/list?page=',
          routerPath: '/insure/products?page='
        })
      },
      // {
      //   name: 'all',
      //   path: '/insure/products',
      //   component: ProductItemsList,
      //   props: route => ({
      //     requestPath: '/insure/list?page=',
      //     routerPath: '/insure/products?page=',
      //     isMyPolicies: true
      //   })
      // },
      {
        name: 'productDetails',
        path: '/insure/products/:id',
        component: ProductDetails
      }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      authRequired: true
    }
  }
]

export default routes
