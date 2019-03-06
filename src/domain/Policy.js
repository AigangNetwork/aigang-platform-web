import moment from 'moment'
import EthUtils from '@/utils/EthUtils'

export default class Policy {

}

const mapStatus = status => {
  switch (status) {
    case '0':
      return 'notset'
    default:
      return 'notset'
  }
}