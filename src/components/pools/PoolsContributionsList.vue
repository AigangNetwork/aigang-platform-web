<template>
  <transition-group name="slideUp">
  <div class="contributions-container" v-loading="contributionsListLoading || !isWeb3Loaded"  key="contributions" v-if="showContributions">
    <div class="items-container">
      <Card>
        <div slot="body">

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
          </div>

          <div class="pagination-container">
            <transition name="slideUp">
              <Pagination v-if="userContributions && userContributions.totalPages > 1 && isDataLoaded" :callback="loadPage" :total-page-count="userContributions.totalPages" :current-page="page"/>
            </transition>
          </div>
        </div>
      </Card>
    </div>
  </div>
  <el-row class="failure-message" v-else-if="!showContributions" key="failure-message">
    <h2>{{ $t('pools.contributions.noData')}}</h2>
  </el-row>
</transition-group>
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
    ...mapGetters(['userContributions', 'contributionsListLoading']),
    isWeb3Loaded () {
      return this.$store.getters['user/isWeb3Loaded']
    },
    showContributions () {
      return this.contributionsListLoading || !this.isWeb3Loaded || this.userContributions.items.length !== 0
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
    async isWeb3Loaded (newValue) {
      if (newValue) {
        await this.loadPage(1)
      }
    }
  },
  async beforeMount () {
    if (this.isWeb3Loaded) {
      await this.loadPage(1)
    }
  },
  methods: {
    async loadPage (page) {
      this.isDataLoaded = false
      this.page = page
      await this.$store.dispatch('pools/getUserContributions', this.page)
      this.isDataLoaded = true
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
