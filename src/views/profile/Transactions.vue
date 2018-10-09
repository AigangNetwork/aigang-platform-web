<template>
  <div v-loading="$store.getters.loading" :element-loading-text="$t('general.loading')">
    <el-row>
      <el-col>
        <p class="input-section-title">{{ $t('profile.transactions.title') }}</p>
      </el-col>
      <el-col>
        <p>{{ $t('profile.transactions.description') }}</p>
      </el-col>
      <el-row v-show="isDataLoaded">
        <el-table class="transactions" :data="transactions.items" :empty-text="$t('profile.transactions.table.emptyText')">
          <el-table-column prop="createdUtc" :label="$t('profile.transactions.table.titles.date')" width="160">
            <template slot-scope="scope">
              <Date :dateUtc="scope.row.createdUtc" format="YYYY-MM-DD HH:mm:ss (UTC Z)"/>
            </template>
          </el-table-column>
          <el-table-column prop="txId" :label="$t('profile.transactions.table.titles.transaction')" min-width="250">
            <template slot-scope="scope">
              <a :href="formatTxLink(scope.row.txId)" target="_blank">{{ scope.row.txId }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="isCreatedByUser" :label="$t('profile.transactions.table.titles.fromSystem')" width="110">
            <template slot-scope="scope">
              <div v-if="!scope.row.isCreatedByUser" class="center">
                <i class="el-icon-check"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="txType" :label="$t('profile.transactions.table.titles.type')">
            <template slot-scope="scope">
              <span class="type">{{ formatTypeText(scope.row.txType) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('profile.transactions.table.titles.status')" width="190">
            <template slot-scope="scope">
              <Label :type="scope.row.status" size="small" />
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-show="isDataLoaded">
        <el-col class="paging">
          <Pagination v-if="transactions.totalPages > 1" :callback="loadPage" :total-page-count="transactions.totalPages" :current-page="page" />
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import Date from '@/components/Date'
import Label from './Label'
import Pagination from '@/components/Pagination'
const { mapGetters } = createNamespacedHelpers('user')

export default {
  components: {
    Date,
    Label,
    Pagination
  },
  computed: {
    ...mapGetters(['transactions'])
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
    formatTxLink (txId) {
      return process.env.ETHERSCAN_ADDRESS + process.env.TX_PATH + txId
    },
    async loadPage (page) {
      this.page = page

      try {
        await this.$store.dispatch('user/loadProfileTransactions', this.page)
      } catch (error) { }
    },
    formatTypeText (type) {
      switch (type.toUpperCase()) {
        case 'POLICYPAYMENT':
          return this.$t('profile.transactions.type.policypayment')
        case 'ADDPOLICY':
          return this.$t('profile.transactions.type.addpolicy')
        case 'ADDCLAIM':
          return this.$t('profile.transactions.type.addclaim')
        case 'ADDFORECAST':
          return this.$t('profile.transactions.type.addForecast')
        case 'FORECASTPAYOUT':
          return this.$t('profile.transactions.type.forecastPayout')
        case 'FORECASTREFUND':
          return this.$t('profile.transactions.type.forecastRefund')
        default:
          return this.$t('profile.transactions.type.unknown')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  table {
    width: 100%;

    a {
      color: #548fd4;
      word-wrap: break-word;
    }

    .center {
      text-align: center;
    }

    .el-icon-check {
      color: $green;
      font-weight: bold;
    }

    .type {
      word-break: break-word;
    }
  }

  .paging {
    margin-top: 15px;
  }
</style>
