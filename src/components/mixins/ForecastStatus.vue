<script>
const DEFAULT = '-'

export default {
  computed: {
    status () {
      if (!this.item.status) {
        return DEFAULT
      }

      switch (this.item.status.toUpperCase()) {
        case 'PENDINGPAYMENT':
          return this.$t('predictions.forecast.statuses.pendingPayment')
        case 'PAID':
          return this.$t('predictions.forecast.statuses.paid')
        case 'CANCELED':
          return this.$t('predictions.forecast.statuses.canceled')
        case 'WON':
          return this.$t('predictions.forecast.statuses.won')
        case 'LOST':
          return this.$t('predictions.forecast.statuses.lost')
        case 'WONPAIDOUT':
          return this.$t('predictions.forecast.statuses.wonPaidout')
        default:
          return DEFAULT
      }
    }
  }
}

</script>
