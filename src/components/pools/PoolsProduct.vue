<template>
  <div class="aig-container aig-view" >
    <Card class="product-card">
      <div slot="body" v-loading="$store.getters.loading">
          <PoolsProductHeader :info="headerInfo" :backRouteName="backRouteName" />
          <PoolsProductDetails :pool="pool" />
      </div>
    </Card>
  </div>
</template>
<script>

import Card from '@/components/Card'
import PoolsProductHeader from '@/components/pools/PoolsProductHeader'
import PoolsProductDetails from '@/components/pools/PoolsProductDetails'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  data () {
    return {
      headerInfo: {},
      backRouteName: 'PoolsProductsList'
    }
  },
  components: { Card, PoolsProductHeader, PoolsProductDetails },
  computed: {
    ...mapGetters(['pool'])
  },
  async mounted () {
    await this.$store.dispatch('pools/getPool', this.$route.params.id)

    this.headerInfo = {
      status: this.pool.status,
      title: this.pool.title,
      contributions: this.pool.contributions,
      currentPoolSize: this.pool.currentPoolSize,
      poolGoalSize: this.pool.goalPoolSize,
      startDateUtc: this.pool.startDateUtc,
      endDateUtc: this.pool.endDateUtc
    }
  }
}

</script>
<style lang="scss" scoped>

 .aig-container {
    align-items: flex-start;
  }

  .product-details-body {
    margin-bottom: 40px;
  }
</style>
