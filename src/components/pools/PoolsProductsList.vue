<template>
    <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading || !$store.getters['user/isWeb3Loaded']">
    <el-row class="aig-items" key="pools-list" v-if="showPools">
      <transition-group name="slideUp">
        <el-col   :xs="24" :sm="12" :md="12" :lg="8" v-for="(pool, index) in pools.items" :key="index">
          <PoolsProductItem :item="pool" />
        </el-col>
      </transition-group>
      <el-col v-if="isWeb3Enabled">
        <transition name="slideUp">
            <Pagination v-if="pools.totalPages > 1  && isDataLoaded" :callback="loadPage" :total-page-count="pools.totalPages" :current-page="page"/>
        </transition>
      </el-col>
    </el-row>
    <el-row class="failure-message" v-else-if="showWeb3NotConnected" key="failure-message">
      <h2>{{ $t('general.web3NotConnected') }}</h2>
    </el-row>
    <el-row class="failure-message" key="no-pools-message" v-else-if="!showPools && isDataLoaded">
      <h2>{{ $t('general.noPools') }}</h2>
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
    },
    showWeb3NotConnected () {
      return !this.isWeb3Enabled && this.$store.getters['user/isWeb3Loaded']
    },
    showPools () {
      return this.isWeb3Enabled &&
             (!this.$store.getters.loading ||
             this.$store.getters['user/isWeb3Loaded']) &&
             this.pools &&
             (this.pools.items && this.pools.items.length !== 0)
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
