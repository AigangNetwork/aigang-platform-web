<template>
  <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading || !isWeb3Loaded">
    <el-row class="aig-items" v-if="isWeb3Enabled" key="list">
      <transition-group name="slideUp">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="(prediction, index) in predictions.items" :key="index">
        <PredictionListItem :item="prediction" />
      </el-col>
      </transition-group>
      <transition name="slideUp">
      <el-col v-if="isWeb3Enabled">
        <Pagination v-if="predictions.totalPages > 1 && isDataLoaded" :callback="loadPage" :total-page-count="predictions.totalPages" :current-page="page" />
      </el-col>
      </transition>
    </el-row>
    <el-row class="failure-message" v-if="!isWeb3Enabled && isWeb3Loaded" key="failure-message">
      <h2>{{ $t('general.web3NotConnected') }}</h2>
    </el-row>
    <el-row class="failure-message"
      v-else-if="!$store.getters.loading && predictions && !predictions.items && isWeb3Loaded" key="no-predictions">
      <h2>{{ $t('general.noPredictions') }}</h2>
    </el-row>
  </transition-group>
</template>

<script>
import Pagination from '@/components/Pagination'
import PredictionListItem from './PredictionListItem'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    Pagination,
    PredictionListItem
  },
  computed: {
    ...mapGetters(['predictions']),
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    },
    isWeb3Loaded () {
      return this.$store.getters['user/isWeb3Loaded']
    }
  },
  data () {
    return {
      page: 1,
      isDataLoaded: false
    }
  },
  async beforeMount () {
    if (!this.isDataLoaded && this.isWeb3Enabled && this.isWeb3Loaded) {
      await this.loadPage(1)
      this.isDataLoaded = true
    }
  },
  watch: {
    async isWeb3Enabled (newValue) {
      if (newValue && this.isWeb3Loaded) {
        await this.loadPage(1)
        this.isDataLoaded = true
      }
    }
  },
  methods: {
    async loadPage (page) {
      this.page = page
      await this.$store.dispatch('predictions/getPredictionsList', this.page)
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
