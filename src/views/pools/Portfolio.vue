<template>
  <div class="aig-card-container portfolio" v-loading="loading">

    <PortfolioSummarySection />

    <PoolsList />

  </div>
</template>
<script>
import PortfolioSummarySection from '@/components/pools/PortfolioSummarySection'
import PoolsList from '@/components/pools/PoolsList'

export default {
  components: { PortfolioSummarySection, PoolsList },
  data () {
    return {
      loading: false
    }
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';

  .portfolio {
    flex-direction: column;
    display: block;

    .aig-card-body {
      padding: 0 !important;
      font-family: $font-secondary;
    }
  }

  .aig-card.portfolio-card {
    &:last-child {
      margin-top: 0;

      .aig-card-body {
        margin-top: 0 !important;
      }
    }

    &:first-child {
      margin-top: 20px;

      .aig-card-body {
        margin-top: 0 !important;
      }
    }
  }
</style>
