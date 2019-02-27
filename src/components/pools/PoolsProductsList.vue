<template>
    <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading">
    <el-row class="aig-items" key="pools-list">
      <transition-group name="slideUp">
        <el-col  v-if="isWeb3Enabled" :xs="24" :sm="12" :md="12" :lg="8" v-for="(pool, index) in pools.items" :key="index">
          <PoolsProductItem :item="pool" />
        </el-col>
        </transition-group>
      <el-col  v-if="isWeb3Enabled">
        <transition name="slideUp">
            <Pagination v-if="pools.totalPages > 1  && isDataLoaded" :callback="loadPage" :total-page-count="pools.totalPages" :current-page="page"/>
        </transition>
      </el-col>
      <el-col class="failure-message" v-if="!isWeb3Enabled">
        <h2>{{ $t('general.web3NotConnected') }}</h2>
      </el-col>
      <el-col class="failure-message" v-else-if="!$store.getters.loading && pools && (!pools.items || pools.items.length === 0)">
        <h2>{{ $t('general.noPools') }}</h2>
      </el-col>
    </el-row>
    </transition-group>
</template>

<script>
import PoolsProductItem from './PoolsProductItem'
import Pagination from '@/components/Pagination'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    PoolsProductItem,
    Pagination
  },
  computed: {
    ...mapGetters(['pools']),
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    }
  },
  data () {
    return {
      page: 1,
      isDataLoaded: false
    }
  },
  watch: {
    async isWeb3Enabled (newValue) {
      if (newValue) {
        await this.loadPage(1)
        this.isDataLoaded = true
      }
    }
  },
  async beforeMount () {
    if (!this.isDataLoaded && this.isWeb3Enabled) {
      await this.loadPage(1)
      this.isDataLoaded = true
    }
  },
  methods: {
    async loadPage (page) {
      this.isDataLoaded = false
      this.page = page
      await this.$store.dispatch('pools/getPoolsList', this.page)
      this.isDataLoaded = true
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
