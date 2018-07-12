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
        <el-table :data="wallets.userWallets" :empty-text="$t('profile.wallets.table.emptyText')">
          <el-table-column prop="createdUtc" :label="$t('profile.wallets.table.titles.date')" width="180">
            <template slot-scope="scope">
              <Date :dateUtc="scope.row.date" />
            </template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('profile.wallets.table.titles.wallet')"></el-table-column>
        </el-table>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import Date from '@/components/Date'

export default {
  components: {
    Date
  },
  computed: {
    ...mapGetters(['wallets'])
  },
  data () {
    return {
      page: 1,
      loading: false,
      isSuccessfullyUpdate: false
    }
  },
  async mounted () {
    this.loading = true
    try {
      await this.$store.dispatch('loadProfileWallets', this.page)
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
