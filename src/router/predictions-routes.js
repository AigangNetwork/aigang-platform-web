import Predictions from '@/views/Predictions'
import PredictionsList from '@/views/predictions/PredictionsList'
import MyForecastsList from '@/views/predictions/MyForecastsList'
import PredictionInfo from '@/views/predictions/PredictionInfo'
import ForecastInfo from '@/views/predictions/ForecastInfo'

const routes = [
  {
    path: '/predictions',
    name: 'Predictions',
    props: true,
    component: Predictions,
    children: [
      {
        name: 'predictions',
        path: '',
        redirect: '/predictions/all'
      },
      {
        name: 'PredictionsList',
        path: '/predictions/all',
        component: PredictionsList
      },
      {
        name: 'MyForecastsList',
        path: '/predictions/myforecasts',
        component: MyForecastsList,
        meta: {
          authRequired: true
        }
      }
    ]
  },
  {
    path: '/predictions/prediction/:id',
    name: 'PredictionInfo',
    component: PredictionInfo
  },
  {
    path: '/predictions/forecast/:id',
    name: 'ForecastInfo',
    component: ForecastInfo
  }
]

export default routes
