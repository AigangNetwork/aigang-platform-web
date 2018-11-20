<template>
  <div>
    <!-- <PortfolioSummarySection /> -->
    <PoolsContributionsList/>
  </div>
</template>

<script>
import PortfolioSummarySection from '@/components/pools/PortfolioSummarySection'
import PoolsContributionsList from './PoolsContributionsList'

export default {
  components: {
    PortfolioSummarySection,
    PoolsContributionsList
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';
</style>
