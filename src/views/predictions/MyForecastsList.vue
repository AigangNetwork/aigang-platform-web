<template>
  <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading">
    <el-row class="aig-items" key="predictions-list" v-show="isDataLoaded">
      <div class="forecast-item" v-for="forecast in userForecasts.items" :key="forecast.id">
        <ForecastItem :item="forecast" />
      </div>
      <el-col>
        <Pagination v-if="userForecasts.totalPages > 1" :callback="loadPage" :total-page-count="userForecasts.totalPages" :current-page="page" />
      </el-col>
      <el-col v-if="!$store.getters.loading && userForecasts && !userForecasts.items">
        <h2>{{ $t('general.noMyPredictions') }}</h2>
      </el-col>
    </el-row>
  </transition-group>
</template>

<script>
import Pagination from '@/components/Pagination'
import ForecastItem from './ForecastItem'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    Pagination,
    ForecastItem
  },
  computed: {
    ...mapGetters(['userForecasts'])
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
      await this.$store.dispatch('predictions/getUserForecasts', this.page)
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

    .forecast-item {
      margin: 10px 0px 10px 0px;
    }

    h2 {
      margin: 20px;
    }
  }
</style>
