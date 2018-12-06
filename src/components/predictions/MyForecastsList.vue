<template>
  <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading">
    <el-row class="aig-items" key="predictions-list" v-show="isDataLoaded">
      <div class="filters-bar">
        <div class="filter-item">
          <div class="filter-label">{{ $t('predictions.forecast.status') }}:</div>
          <Dropdown :items="items" @itemSelected="onFilterByStatusDropdownItemSelected" />
        </div>
      </div>
      <div class="forecast-item" v-for="forecast in userForecasts.items" :key="forecast.id">
        <ForecastListItem :item="forecast" />
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
    ...mapGetters(['userForecasts'])
  },
  data () {
    return {
      page: 1,
      filters: {},
      isDataLoaded: false,
      items: [{
        name: this.$t('predictions.forecast.statuses.all'),
        value: ''
      }, {
        name: this.$t('predictions.forecast.statuses.pendingPayment'),
        value: '2'
      }, {
        name: this.$t('predictions.forecast.statuses.paid'),
        value: '3'
      }, {
        name: this.$t('predictions.forecast.statuses.canceled'),
        value: '4'
      }, {
        name: this.$t('predictions.forecast.statuses.won'),
        value: '5'
      }, {
        name: this.$t('predictions.forecast.statuses.lost'),
        value: '6'
      }, {
        name: this.$t('predictions.forecast.statuses.wonPaidout'),
        value: '7'
      }, {
        name: this.$t('predictions.forecast.statuses.availableRefund'),
        value: '8'
      }, {
        name: this.$t('predictions.forecast.statuses.pendingPayout'),
        value: '9'
      }, {
        name: this.$t('predictions.forecast.statuses.refundPaidout'),
        value: '10'
      }]
    }
  },
  async beforeMount () {
    if (!this.isDataLoaded) {
      await this.loadPage(1)
      this.isDataLoaded = true
    }
  },
  methods: {
    async onFilterByStatusDropdownItemSelected (value) {
      this.page = 1
      this.filters = {
        status: value
      }

      await this.loadPage(this.page)
    },
    async loadPage (page) {
      this.page = page
      await this.$store.dispatch('predictions/getUserForecasts', { page: this.page, filters: this.filters })
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

    h2 {
      margin: 20px;
    }
  }
</style>
