<template>
  <div class="aig-card-container portfolio" v-loading="loading">

    <PortfolioSideSection />

    <InvestmentsList />

  </div>
</template>
<script>
import PortfolioSideSection from '@/components/investment/PortfolioSideSection'
import InvestmentsList from '@/components/investment/InvestmentsList'

export default {
  components: { PortfolioSideSection, InvestmentsList },
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
