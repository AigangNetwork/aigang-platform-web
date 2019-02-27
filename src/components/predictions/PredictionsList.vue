<template>
  <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading">
    <el-row class="aig-items" key="predictions-list">
      <transition-group name="slideUp">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" v-if="isWeb3Enabled" v-for="(prediction, index) in predictions.items" :key="index">
        <PredictionListItem :item="prediction" />
      </el-col>
      </transition-group>
      <transition name="slideUp">
      <el-col v-if="isWeb3Enabled">
        <Pagination v-if="predictions.totalPages > 1 && isDataLoaded" :callback="loadPage" :total-page-count="predictions.totalPages" :current-page="page" />
      </el-col>
      </transition>
      <el-col class="failure-message" v-if="!isWeb3Enabled">
        <h2>{{ $t('general.web3NotConnected') }}</h2>
      </el-col>
      <el-col class="failure-message" v-else-if="!$store.getters.loading && predictions && !predictions.items">
        <h2>{{ $t('general.noPredictions') }}</h2>
      </el-col>
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
    }
  },
  data () {
    return {
      page: 1,
      isDataLoaded: false
    }
  },
  async beforeMount () {
    if (!this.isDataLoaded && this.isWeb3Enabled) {
      await this.loadPage(1)
      this.isDataLoaded = true
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
