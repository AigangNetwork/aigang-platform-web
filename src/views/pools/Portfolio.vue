<template>
  <div class="portfolio-container">
    <PortfolioSummary />
    <PoolsContributionsList/>
  </div>
</template>

<script>
import PortfolioSummary from './PortfolioSummary'
import PoolsContributionsList from './PoolsContributionsList'

export default {
  components: {
    PortfolioSummary,
    PoolsContributionsList
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';

  .portfolio-container {
    margin: 20px;
  }
</style>
