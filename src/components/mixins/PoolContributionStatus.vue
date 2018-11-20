<script>
const DEFAULT = '-'

export default {
  computed: {
    status () {
      if (!this.contribution.status) {
        return DEFAULT
      }

      switch (this.contribution.status.toUpperCase()) {
        case 'DRAFT':
          return this.$t('pools.poolContributionStatuses.draft')
        case 'PENDINGPAYMENT':
          return this.$t('pools.poolContributionStatuses.pendingPayment')
        case 'PAID':
          return this.$t('pools.poolContributionStatuses.paid')
        case 'CANCELED':
          return this.$t('pools.poolContributionStatuses.canceled')
        case 'AVAILABLEPAYOUT':
          return this.$t('pools.poolContributionStatuses.availablePayout')
        case 'PENDINGPAYOUT':
          return this.$t('pools.poolContributionStatuses.pendingPayout')
        case 'REWARDPAIDOUT':
          return this.$t('pools.poolContributionStatuses.rewardPaidout')
        case 'AVAILABLEREFUND':
          return this.$t('pools.poolContributionStatuses.availableRefund')
        case 'REFUNDPAIDOUT':
          return this.$t('pools.poolContributionStatuses.refundPaidout')
        default:
          return DEFAULT
      }
    }
  }
}

</script>
