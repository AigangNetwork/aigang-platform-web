<template>
  <div v-loading="loading" :element-loading-text=" $t('general.loading')">
    <el-row>
      <el-col>
        <p class="input-section-title">{{ $t('profile.wallets.title') }}</p>
      </el-col>
      <el-col>
        <p>{{ $t('profile.wallets.description') }}</p>
      </el-col>
      <el-row>
        <el-table :data="wallets" :empty-text="$t('profile.wallets.table.emptyText')">
          <el-table-column prop="date" :label="$t('profile.wallets.table.titles.date')" width="180">
            <template slot-scope="scope">
              <Date :dateUtc="scope.row.date"/>
            </template>
          </el-table-column>
          <el-table-column prop="wallet" :label="$t('profile.wallets.table.titles.wallet')"></el-table-column>
        </el-table>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Date from '@/components/Date'

export default {
  components: {
    Date
  },
  computed: mapState({
    wallets: state => state.user.profile.wallets
  }),
  data () {
    return {
      loading: false,
      isSuccessfullyUpdate: false
    }
  },
  async created () {
    this.loading = true
    try {
      await this.$store.dispatch('loadProfileWallets')
    } catch (error) {
    }

    this.loading = false
  }
}
</script>
<style lang="scss" scoped>
  table {
    width: 100%;
  }
</style>
