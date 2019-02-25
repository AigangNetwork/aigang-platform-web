<template>
  <div class="portfolio-container" v-if="isWeb3Enabled">
    <PortfolioSummary />
    <PoolsContributionsList />
  </div>
  <el-row class="portfolio-container" v-else>
    <el-col>
      <h2>{{ $t('general.web3NotConnected') }}</h2>
    </el-col>
  </el-row>
</template>

<script>
import PortfolioSummary from './PortfolioSummary'
import PoolsContributionsList from './PoolsContributionsList'

export default {
  components: {
    PortfolioSummary,
    PoolsContributionsList
  },
  computed: {
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    }
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';

  .portfolio-container {
    margin-top: 15px;
    height: 100%;
    display: inline-block;
    width: 100%;
    min-height: auto;
  }
</style>
