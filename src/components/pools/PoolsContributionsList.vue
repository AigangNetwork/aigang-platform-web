<template>
  <div v-loading="contributionsListLoading">
    <div class="items-container" v-if="isDataLoaded">
      <Card>
        <div slot="body">
          <div class="filters-bar">
            <div class="filter-item">
              <div class="filter-label">{{ $t('pools.contributions.filters.status') }}:</div>
              <Dropdown :items="items" @itemSelected="onFilterByStatusDropdownItemSelected" />
            </div>
          </div>

          <div class="scrollable">
            <table>
              <thead class="investments-table-header">
                <tr>
                  <th>{{ $t('pools.portfolioInfo.pool') }}</th>
                  <th>{{ $t('pools.portfolioInfo.contributedAmount') }}</th>
                  <th>{{ $t('pools.portfolioInfo.createdDate') }}</th>
                  <th>{{ $t('pools.portfolioInfo.status') }}</th>
                </tr>
              </thead>
              <tbody>
                <PoolsContributionsListItem v-for="(contribution, index) in userContributions.items" :key="index" :contribution="contribution" />
              </tbody>
            </table>
            <div class="no-data-message" v-if="!userContributions.items">{{ $t('pools.contributions.noData')}}</div>
          </div>

          <div class="pagination-container">
            <Pagination v-if="userContributions && userContributions.totalPages > 1" :callback="loadPage" :total-page-count="userContributions.totalPages" :current-page="page" />
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import Pagination from '@/components/Pagination'
import Dropdown from '@/components/common/Dropdown'
import PoolsContributionsListItem from './PoolsContributionsListItem'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    Card,
    Pagination,
    Dropdown,
    PoolsContributionsListItem
  },
  computed: {
    ...mapGetters(['userContributions', 'contributionsListLoading'])
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
        name: this.$t('pools.poolContributionStatuses.pendingPayment'),
        value: '1'
      }, {
        name: this.$t('pools.poolContributionStatuses.paid'),
        value: '2'
      }, {
        name: this.$t('pools.poolContributionStatuses.canceled'),
        value: '3'
      }, {
        name: this.$t('pools.poolContributionStatuses.availablePayout'),
        value: '4'
      }, {
        name: this.$t('pools.poolContributionStatuses.pendingPayout'),
        value: '5'
      }, {
        name: this.$t('pools.poolContributionStatuses.rewardPaidout'),
        value: '6'
      }, {
        name: this.$t('pools.poolContributionStatuses.availableRefund'),
        value: '7'
      }, {
        name: this.$t('pools.poolContributionStatuses.refundPaidout'),
        value: '8'
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
      await this.$store.dispatch('pools/getUserContributions', { page: this.page, filters: this.filters })
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
      margin-top: 10px;
      margin-right: 25px;
      margin-bottom: 25px;

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
  }

  .aig-card {
    width: 100%;
  }

  .scrollable {
    overflow: scroll;
  }

  .investment-list-item {
    border-top: 1px solid $button-purple;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 0.7px;

    .text-medium {
      font-weight: 600;
    }
  }

  .investments-table-header {
    font-size: 12px;
    text-transform: uppercase;
    text-align: center;

    th {
      padding: 20px 15px 20px 0;
      font-weight: 400;
      text-align: center;

      &:first-child {
        padding-left: 15px;
      }

      &:last-child {
        min-width: 120px;

      }

      &:hover {
        background: transparent;
      }
    }
  }

  table {
    width: 100%;
    font-size: 14px;
    border-collapse: collapse;

    thead {
      tr {
        &:first-child {
          border-top: none;
          border-bottom: 1px solid $gray;
        }
      }
    }
  }

  .no-data-message {
    padding-top: 20px;
    text-align: center;
  }

  .pagination-container {
    margin-top: 20px;
  }
</style>
