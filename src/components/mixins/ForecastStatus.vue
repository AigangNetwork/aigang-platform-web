<script>
const DEFAULT = '-'

export default {
  computed: {
    getStatusString () {
      if (!this.status) {
        return DEFAULT
      }

      switch (this.status.toUpperCase()) {
        case 'PAID':
          return this.$t('predictions.forecast.statuses.paid')
        case 'WON':
          return this.$t('predictions.forecast.statuses.won')
        case 'LOST':
          return this.$t('predictions.forecast.statuses.lost')
        case 'WONPAIDOUT':
          return this.$t('predictions.forecast.statuses.wonPaidout')
        case 'AVAILABLEREFUND':
          return this.$t('predictions.forecast.statuses.availableRefund')
        case 'REFUNDPAIDOUT':
          return this.$t('predictions.forecast.statuses.refundPaidout')
        default:
          return DEFAULT
      }
    }
  }
}

</script>
