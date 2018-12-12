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
          return this.$t('pools.poolStatuses.active')
        case 'DISTRIBUTING':
          return this.$t('pools.poolStatuses.distributing')
        case 'FUNDING':
          return this.$t('pools.poolStatuses.funding')
        case 'PAUSED':
          return this.$t('pools.poolStatuses.paused')
        case 'CANCELED':
          return this.$t('pools.poolStatuses.canceled')
        case 'CLOSED':
          return this.$t('pools.poolStatuses.closed')
        default:
          return DEFAULT
      }
    }
  }
}
</script>
