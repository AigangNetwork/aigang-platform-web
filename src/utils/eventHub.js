import Vue from 'vue'

const eventHub = new Vue({
  data: {
    eventCommunicationError: 'eventCommunicationError',
    eventMetamaskNetworkError: 'eventMetamaskNetworkError',
    eventMetamaskAccountWasNotFound: 'eventMetamaskAccountWasNotFound',
    eventChangeCommentsCountForDataset: 'eventChangeCommentsCountForDataset',
    eventChangeCommentsCountForDataModel: 'eventChangeCommentsCountForDataModel'
  }
})

export default eventHub
