<template>
  <div class="aig-container aig-view" >
    <Card class="product-card" v-if="isWeb3Enabled">
      <div slot="body" v-loading="$store.getters.loading" >
          <PoolsProductHeader :info="headerInfo" :backRouteName="backRouteName" :isSingleColor="false" />
          <PoolsProductDetails :pool="pool" />
      </div>
    </Card>
    <div v-else><h2>{{ $t('general.web3NotConnected') }}</h2></div>
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
  methods: {
    async loadData () {
      await this.$store.dispatch('pools/getPool', { id: this.$route.params.id, address: this.$route.params.address })

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
  },
  computed: {
    ...mapGetters(['pool']),
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    }
  },
  watch: {
    async isWeb3Enabled (newValue) {
      if (newValue) {
        await this.loadData()
      }
    }
  },
  async mounted () {
    if (this.$store.getters['user/isWeb3Enabled']) {
      await this.loadData()
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
