import Vue from 'vue'

const eventHub = new Vue({
  data: {
    eventCommunicationError: 'eventCommunicationError',
    eventMetamaskAccountWasNotFound: 'eventMetamaskAccountWasNotFound',
    eventChangeCommentsCountForDataset: 'eventChangeCommentsCountForDataset',
    eventChangeCommentsCountForDataModel: 'eventChangeCommentsCountForDataModel'
  }
})

export default eventHub
