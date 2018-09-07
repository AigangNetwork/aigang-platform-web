<template>
  <div class="aig-card-container" v-loading="loading">
    <Card class="guest-card portfolio-card" v-if="!loading">
      <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">

        <PortfolioSideSection/>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@/components/Card'
import PortfolioSideSection from '@/components/investment/PortfolioSideSection'

export default {
  components: { Card, PortfolioSideSection },
  data () {
    return {
      loading: false
    }
  }
}

</script>
<style lang="scss">
  .portfolio-card .aig-card-body {
    padding: 0 !important;
  }
</style>
