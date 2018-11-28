import Data from '@/views/Data'
import UploadDataset from '@/views/data/UploadDataset'
import Dataset from '@/views/data/Dataset'
import DatasetInfo from '@/views/data/DatasetInfo'
import DatasetModelList from '@/views/data/model/DatasetModelList'
import DatasetComments from '@/views/data/DatasetComments'
import DatasetData from '@/views/data/DatasetData'
import DatasetEdit from '@/views/data/DatasetEdit'
import DataItemsList from '@/views/data/DataItemsList'
import DatasetModelForm from '@/views/data/model/DatasetModelForm'
import DatasetModelInfo from '@/views/data/model/DatasetModelInfo'
import DatasetModelTables from '@/views/data/model/DatasetModelTables'
import DatasetModelComments from '@/views/data/model/DatasetModelComments'

export default [
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
  }
]
