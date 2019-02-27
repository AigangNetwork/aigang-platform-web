import Predictions from '@/components/predictions/Predictions'
import PredictionsList from '@/components/predictions/PredictionsList'
import MyForecastsList from '@/components/predictions/MyForecastsList'
import PredictionInfo from '@/components/predictions/PredictionInfo'
import ForecastInfo from '@/components/predictions/ForecastInfo'

const routes = [
  {
    path: '/predictions',
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
        component: MyForecastsList
      }
    ]
  },
  {
    path: '/predictions/prediction/:address/:id',
    name: 'PredictionInfo',
    component: PredictionInfo
  },
  {
    path: '/predictions/forecast/:address/:id',
    name: 'ForecastInfo',
    component: ForecastInfo
  }
]

export default routes
