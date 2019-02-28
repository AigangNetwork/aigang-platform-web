<template>
  <div class="items-container" v-loading="$store.getters.loading || !isWeb3Loaded">
    <el-row class="aig-items" key="predictions-list" v-if="isWeb3Enabled || !isWeb3Loaded">
      <transition-group name="slideUp">
        <div class="forecast-item" v-for="(forecast, index) in userForecasts.items" :key="index">
          <ForecastListItem :item="forecast" />
        </div>
      </transition-group>
      <el-col>
        <transition name="slideUp">
          <Pagination v-if="userForecasts.totalPages > 1 && isDataLoaded" :callback="loadPage" :total-page-count="userForecasts.totalPages" :current-page="page" />
        </transition>
      </el-col>
    </el-row>
    <el-row class="failure-message aig-items" v-else-if="!$store.getters.loading && userForecasts && !userForecasts.items">
        <h2>{{ $t('general.noMyPredictions') }}</h2>
    </el-row>
    <el-row class="failure-message aig-items" v-else>
        <h2>{{ $t('general.web3NotConnected') }}</h2>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Dropdown from '@/components/common/Dropdown'
import ForecastListItem from './ForecastListItem'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    Pagination,
    Dropdown,
    ForecastListItem
  },
  computed: {
    ...mapGetters(['userForecasts']),
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
      filters: {},
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
      this.page = page
      await this.$store.dispatch('predictions/getUserForecasts', this.page)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .items-container {
    height: 100%;
    display: inline-block;
    width: 100%;
    min-height: auto;

    .filters-bar {
      margin-left: 25px;
      margin-right: 25px;
      padding-bottom: 20px;
      .filter-item {
        display: flex;
        .filter-label {
          color: $light-grey;
          margin-top: 5px;
          font-size: 12pt;
          margin-right: 10px;
        }
      }
    }

    .forecast-item {
      margin: 10px 0px 10px 0px;
    }
  }
</style>
