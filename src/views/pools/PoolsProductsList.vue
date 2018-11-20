<template>
  <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading">
    <el-row key="pools-list" v-show="isDataLoaded">
      <PoolsProductItem v-for="item in pools.items" :key="item.id" :product="item" />
      <el-col>
        <Pagination v-if="pools && pools.totalPages > 1" :callback="loadPage" :total-page-count="pools.totalPages" :current-page="page" />
      </el-col>
      <el-col v-if="!$store.getters.loading && pools && !pools.items">
        <h2>{{ $t('general.noPools') }}</h2>
      </el-col>
    </el-row>
  </transition-group>
</template>

<script>
import PoolsProductItem from '@/components/pools/PoolsProductItem'
import Pagination from '@/components/Pagination'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    PoolsProductItem,
    Pagination
  },
  computed: {
    ...mapGetters(['pools'])
  },
  data () {
    return {
      page: 1,
      isDataLoaded: false
    }
  },
  async beforeMount () {
    if (!this.isDataLoaded) {
      await this.loadPage(1)
      this.isDataLoaded = true
    }
  },
  methods: {
    async loadPage (page) {
      this.page = page
      await this.$store.dispatch('pools/getPoolsList', this.page)
    }
  }
}
</script>

<style lang="scss" scoped>
  .items-container {
    height: 100%;
    display: inline-block;
    width: 100%;
    min-height: auto;
  }
</style>
