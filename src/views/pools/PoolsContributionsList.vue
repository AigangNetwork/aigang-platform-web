<template>
  <el-row v-loading="$store.getters.loading">
    <el-col v-if="isDataLoaded">
      <Card>
        <div slot="body">
          <table style="width: 100%">
            <thead class="investments-table-header">
              <tr>
                <th>{{ $t('pools.portfolioInfo.insuranceType') }}</th>
                <th>{{ $t('pools.portfolioInfo.investors') }}</th>
                <th>{{ $t('pools.portfolioInfo.investedAmount') }}</th>
                <th>{{ $t('pools.portfolioInfo.goalAmount') }}</th>
                <th>{{ $t('pools.portfolioInfo.status') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(contribution, index) in userContributions.items" :key="index" @click="navigateToContribution(contribution.id)">
                <td class="title">{{ contribution.poolName }}</td>
                <td>{{ contribution.investors }}</td>
                <td>{{ contribution.investedAmount }} {{ $t('general.aix') }}</td>
                <td>{{ contribution.goalAmount }} {{ $t('general.aix') }}</td>
                <td>
                  <span class="investment-list-item-status" :class="{'active': contribution.status.toUpperCase() === 'ACTIVE', 'closed': contribution.status.toUpperCase() === 'CLOSED'}">
                    {{ contribution.status}}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    Card,
    Pagination
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
    },
    navigateToContribution (id) {
      this.$router.push({ name: 'PoolContribution', params: { id }})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

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

    tbody {
      tr {
        border-top: 1px solid $gray;
        cursor: pointer; 

        &:hover {
          background: $transparent-light-yellow;
        }

        td {
          padding: 10px 5px 10px 0;
          text-align: center;
          min-width: 100px;
          height: 40px;

          &.title {
            text-align: left;
            font-weight: 500;
          }

          .button {
            margin-top: 0px;
          }

          &:first-child {
            padding-left: 15px;
          }
        }
      }
    }
  }

  .investment-list-item-status {
    border: 1px dashed $button-purple;
    padding: 5px 10px;
    min-width: 80px;
    display: inline-block;
    text-transform: uppercase;

    &.active {
      color: $button-purple;
    }

    &.closed {
      border: 1px dashed $gray;
      color: $gray;
    }
  }
</style>
