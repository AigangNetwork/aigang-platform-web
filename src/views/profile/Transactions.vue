<template>
  <div v-loading="loading" :element-loading-text="$t('general.loading')">
    <el-row>
      <el-col>
        <p class="input-section-title">{{ $t('profile.transactions.title') }}</p>
      </el-col>
      <el-col>
        <p>{{ $t('profile.transactions.description') }}</p>
      </el-col>
      <el-row v-show="dataLoaded">
        <el-table class="transactions" :data="transactions.items" :empty-text="$t('profile.transactions.table.emptyText')">
          <el-table-column prop="createdUtc" :label="$t('profile.transactions.table.titles.date')" width="160">
            <template slot-scope="scope">
              <Date :dateUtc="scope.row.createdUtc" />
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
      <el-row v-show="dataLoaded">
        <el-col class="paging">
          <Pagination v-if="transactions.totalPages > 1" :callback="loadPage" :total-page-count="transactions.totalPages" :current-page="page" />
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import Date from '@/components/Date'
import Label from './Label'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Date,
    Label,
    Pagination
  },
  computed: {
    ...mapGetters(['transactions', 'loading'])
  },
  data () {
    return {
      page: 1,
      dataLoaded: false
    }
  },
  async mounted () {
    if (!this.dataLoaded) {
      await this.loadPage(1)
      this.dataLoaded = true
    }
  },

  methods: {
    formatTxLink (txId) {
      return process.env.ETHERSCAN_ADDRESS + process.env.TX_PATH + txId
    },
    async loadPage (page) {
      this.page = page

      try {
        await this.$store.dispatch('loadProfileTransactions', this.page)
      } catch (error) {}
    },
    formatTypeText (type) {
      switch (type.toUpperCase()) {
        case 'POLICYPAYMENT':
          return this.$t('profile.transactions.type.policypayment')
        case 'ADDPOLICY':
          return this.$t('profile.transactions.type.addpolicy')
        case 'ADDCLAIM':
          return this.$t('profile.transactions.type.addclaim')
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
