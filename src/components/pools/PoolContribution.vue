<template>
  <div class="aig-container aig-view" >
    <Card class="pool-card product-card">
      <div slot="body" v-loading="$store.getters.loading">

        <PoolsProductHeader :info="headerInfo" :backRouteName="backRouteName" :isSingleColor="true"/>
        <PoolsContributionDetails :contribution="contribution" />

      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import PoolsProductHeader from '@/components/pools/PoolsProductHeader'
import PoolsContributionDetails from '@/components/pools/PoolsContributionDetails'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: { PoolsProductHeader, PoolsContributionDetails, Card },
  data () {
    return {
      isDataLoaded: false,
      headerInfo: {},
      isPaymentDialogVisible: false,
      portfolioRoute: '/pools/portfolio',
      backRouteName: 'MyContributions'
    }
  },
  computed: {
    ...mapGetters([ 'contribution' ])
  },
  async mounted () {
    await this.$store.dispatch('pools/getContribution', { id: this.$route.params.id, address: this.$route.params.address })
    this.isDataLoaded = true

    this.headerInfo = {
      status: this.contribution.poolStatus,
      title: this.contribution.poolName,
      contributions: this.contribution.contributions,
      currentPoolSize: this.contribution.currentPoolSize,
      poolGoalSize: this.contribution.poolGoalSize,
      startDateUtc: this.contribution.poolStartDateUtc,
      endDateUtc: this.contribution.poolEndDateUtc
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/mixins';

  .aig-container {
    align-items: flex-start;
  }
</style>
