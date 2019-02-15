<template>
  <div class="portfolio-container">
    <PortfolioSummary />
  </div>
</template>

<script>
import PortfolioSummary from './PortfolioSummary'

export default {
  components: {
    PortfolioSummary
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';

  .portfolio-container {
    margin: 20px;
  }
</style>
