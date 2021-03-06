<template>
  <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading || !isWeb3Loaded">
    <el-row class="aig-items" v-if="showPredictions" key="list">
      <transition-group name="slideUp">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="(prediction, index) in itemsList" :key="index">
        <PredictionListItem :item="prediction" />
      </el-col>
      </transition-group>
      <transition name="slideUp">
      <el-col v-if="isWeb3Enabled">
        <Pagination v-if="predictions.totalPages > 1" :callback="loadPage" :total-page-count="predictions.totalPages" :current-page="page" />
      </el-col>
      </transition>
    </el-row>
    <el-row class="failure-message" v-if="!isWeb3Enabled && isWeb3Loaded" key="failure-message">
      <h2>{{ $t('general.web3NotConnected') }}</h2>
    </el-row>
    <el-row class="failure-message"
      v-else-if="!showPredictions  && isDataLoaded" key="no-predictions">
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
    },
    showPredictions () {
      return this.isWeb3Enabled &&
          (!this.$store.getters.loading ||
            this.$store.getters['user/isWeb3Loaded']) &&
          this.predictions &&
          (this.predictions.items && this.predictions.items.length !== 0)
    },
    itemsList () {
      if (this.predictions.items.length < this.predictions.totalItems) {
        const placeholders = new Array(this.predictions.totalItems - this.predictions.items.length)
        return this.predictions.items.concat(placeholders)
      } else {
        return this.predictions.items
      }
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
      this.isDataLoaded = false
      this.page = page
      await this.$store.dispatch('predictions/getPredictionsList', this.page)
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
