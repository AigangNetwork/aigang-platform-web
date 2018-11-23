<template>
  <el-row v-loading="$store.getters.loading">
    <el-col v-if="isDataLoaded">
      <Card>
        <div slot="body" class="scrollable">
          <table>
            <thead class="investments-table-header">
              <tr>
                <th>{{ $t('pools.portfolioInfo.insuranceType') }}</th>
                <th>{{ $t('pools.portfolioInfo.investors') }}</th>
                <th>{{ $t('pools.portfolioInfo.myInvestment') }}</th>
                <th>{{ $t('pools.portfolioInfo.investedAmount') }}</th>
                <th>{{ $t('pools.portfolioInfo.goalAmount') }}</th>
                <th>{{ $t('pools.portfolioInfo.status') }}</th>
              </tr>
            </thead>
            <tbody>
              <PoolsContributionsListItem v-for="(contribution, index) in userContributions.items" :key="index" :contribution="contribution" />
            </tbody>
          </table>
          <div class="no-data-message" v-if="!userContributions.items">{{ $t('pools.contributions.noData')}}</div>
        </div>
      </Card>
    </el-col>
    <el-col v-if="isDataLoaded">
      <Pagination v-if="userContributions && userContributions.totalPages > 1" :callback="loadPage" :total-page-count="userContributions.totalPages" :current-page="page" />
    </el-col>
  </el-row>
</template>

<script>
import Card from '@/components/Card'
import Pagination from '@/components/Pagination'
import PoolsContributionsListItem from './PoolsContributionsListItem'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    Card,
    Pagination,
    PoolsContributionsListItem
  },
  computed: {
    ...mapGetters(['userContributions'])
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
      await this.$store.dispatch('pools/getUserContributions', this.page)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

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
</style>
