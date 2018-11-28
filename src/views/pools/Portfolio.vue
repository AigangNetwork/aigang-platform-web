<template>
  <div class="portfolio-container">
    <PoolsContributionsList/>
  </div>
</template>

<script>
import PoolsContributionsList from './PoolsContributionsList'

export default {
  components: {
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
