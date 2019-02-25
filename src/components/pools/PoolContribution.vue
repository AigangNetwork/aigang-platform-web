<template>
  <div class="aig-container aig-view" >
    <Card class="pool-card product-card" v-if="isWeb3Enabled">
      <div slot="body" v-loading="$store.getters.loading">

        <PoolsProductHeader :info="headerInfo" :backRouteName="backRouteName" :isSingleColor="true"/>
        <PoolsContributionDetails :contribution="contribution" />

      </div>
    </Card>
    <div v-else>
      <h2>{{ $t('general.web3NotConnected') }}</h2>
    </div>
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
      backRouteName: 'Porfolio'
    }
  },
  methods: {
    async loadData () {
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
  },
  watch: {
    async isWeb3Enabled (newValue) {
      if (newValue) {
        await this.loadData()
      }
    }
  },
  computed: {
    ...mapGetters([ 'contribution' ]),
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    }
  },
  async mounted () {
    if (this.isWeb3Enabled) {
      this.loadData()
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
