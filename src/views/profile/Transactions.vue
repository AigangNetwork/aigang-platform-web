<template>
    <div v-loading="loading" :element-loading-text="$t('general.loading')">
      <el-row>
        <el-col>
          <p class="input-section-title">{{ $t('profile.transactions.title') }}</p>
        </el-col>
        <el-col>
          <p>{{ $t('profile.transactions.description') }}</p>
        </el-col>
        <el-row>
          <el-table class="transactions" :data="transactions.blockchainTransactions" :empty-text="$t('profile.transactions.table.emptyText')">
            <el-table-column prop="date" :label="$t('profile.transactions.table.titles.date')" width="180">
              <template slot-scope="scope">
                <Date :dateUtc="scope.row.date" />
              </template>
            </el-table-column>
            <el-table-column prop="txId" :label="$t('profile.transactions.table.titles.transaction')"></el-table-column>
            <el-table-column prop="txType" :label="$t('profile.transactions.table.titles.type')" width="180"></el-table-column>
            <el-table-column prop="status" :label="$t('profile.transactions.table.titles.status')" width="100">
              <template slot-scope="scope">
                <Label :type="scope.row.status" />
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-row>
    </div>
</template>
<script>
import {
  mapState
} from 'vuex'
import Date from '@/components/Date'
import Label from './Label'

export default {
  components: {
    Date,
    Label
  },
  computed: mapState({
    transactions: state => state.user.profile.transactions
  }),
  data () {
    return {
      page: 1,
      loading: false
    }
  },
  async created () {
    this.loading = true
    try {
      await this.$store.dispatch('loadProfileTransactions', this.page)
    } catch (error) {}

    this.loading = false
  }
}

</script>
<style lang="scss" scoped>
  table {
    width: 100%;
  }

</style>
