<script>
const DEFAULT = '-'

export default {
  computed: {
    status () {
      if (!this.product.status) {
        return DEFAULT
      }

      switch (this.product.status.toUpperCase()) {
        case 'ACTIVE':
          return this.$t('pools.statuses.active')
        case 'DISTRIBUTING':
          return this.$t('pools.statuses.distributing')
        case 'FUNDED':
          return this.$t('pools.statuses.funded')
        case 'PAUSED':
          return this.$t('pools.statuses.paused')
        case 'CANCELED':
          return this.$t('pools.statuses.canceled')
        case 'CLOSED':
          return this.$t('pools.statuses.closed')
        default:
          return DEFAULT
      }
    }
  }
}

</script>
