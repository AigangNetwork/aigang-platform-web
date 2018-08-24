<script>
const DEFAULT = '-'

export default {
  computed: {
    status () {
      if (!this.policy.status) {
        return DEFAULT
      }

      switch (this.policy.status.toUpperCase()) {
        case 'CANCELED':
          return this.$t('insurance.policy.statuses.canceled')
        case 'CLAIMABLE':
          return this.$t('insurance.policy.statuses.claimable')
        case 'DRAFT':
          return this.$t('insurance.policy.statuses.draft')
        case 'FINISHED':
          return this.$t('insurance.policy.statuses.finished')
        case 'NOTSET':
          return this.$t('insurance.policy.statuses.notset')
        case 'PAID':
          return this.$t('insurance.policy.statuses.paid')
        case 'PAIDOUT':
          return this.$t('insurance.policy.statuses.paidout')
        case 'PENDINGPAYMENT':
          return this.$t('insurance.policy.statuses.pendingpayment')
        case 'PENDINGPAYOUT':
          return this.$t('insurance.policy.statuses.pendingpayout')
        default:
          return DEFAULT
      }
    }
  }
}

</script>
