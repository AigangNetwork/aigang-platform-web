<template>
  <div class="aig-container aig-view">
    <Card class="pool-card product-card" >
      <div slot="body" v-if="!$store.getters.loading">
        <PoolsProductHeader :info="headerInfo" :backRouteName="backRouteName" />
        <PoolsContributionDetails :contribution="contribution" :isDataLoaded="isDataLoaded" />
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
      backRouteName: 'Portfolio'
    }
  },
  computed: {
    ...mapGetters([ 'contribution' ])
  },
  async mounted () {
    await this.$store.dispatch('pools/getContribution', this.$route.params.id)
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
