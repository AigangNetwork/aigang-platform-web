<template>
  <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading">
    <el-row class="aig-items" key="predictions-list" v-show="isDataLoaded">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="prediction in predictions.items" :key="prediction.id">
        <PredictionListItem :item="prediction" />
      </el-col>
      <el-col>
        <Pagination v-if="predictions.totalPages > 1" :callback="loadPage" :total-page-count="predictions.totalPages" :current-page="page" />
      </el-col>
      <el-col v-if="!$store.getters.loading && predictions && !predictions.items">
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
    ...mapGetters(['predictions'])
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
