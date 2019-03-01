<template>
  <div class="portfolio-container" v-if="isWeb3Enabled && isWeb3Loaded">
    <PortfolioSummary />
    <PoolsContributionsList />
  </div>
  <el-row
    class="portfolio-container"
    v-loading="!isWeb3Loaded"
    v-else-if="!isWeb3Loaded">
  </el-row>
  <el-row class="failure-message" v-else-if="!isWeb3Enabled && isWeb3Loaded">
      <h2>{{ $t('general.web3NotConnected') }}</h2>
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
    },
    isWeb3Loaded () {
      return this.$store.getters['user/isWeb3Loaded']
    }
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';

  .portfolio-container {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    height: 100%;
    display: inline-block;
    width: calc(100% - 20px);
    min-height: auto;
  }
</style>
