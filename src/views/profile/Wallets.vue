<template>
  <div v-loading="loading" :element-loading-text=" $t('general.loading')">
    <el-row>
      <el-col>
        <p class="input-section-title">{{ $t('profile.wallets.title') }}</p>
      </el-col>
      <el-col>
        <p>{{ $t('profile.wallets.description') }}</p>
      </el-col>
      <el-row  v-show="dataLoaded">
        <el-table :data="wallets.items" :empty-text="$t('profile.wallets.table.emptyText')">
          <el-table-column prop="createdUtc" :label="$t('profile.wallets.table.titles.date')" width="160">
            <template slot-scope="scope">
              <Date :dateUtc="scope.row.createdUtc" />
            </template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('profile.wallets.table.titles.wallet')"></el-table-column>
        </el-table>
      </el-row>
      <el-row v-show="dataLoaded">
        <el-col class="paging">
          <Pagination v-if="wallets.totalPages > 1" :callback="loadPage" :total-page-count="wallets.totalPages" :current-page="page" />
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Date from '@/components/Date'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Date,
    Pagination
  },
  computed: {
    ...mapGetters(['wallets', 'loading'])
  },
  data () {
    return {
      page: 1,
      dataLoaded: false
    }
  },
  async beforeMount () {
    if (!this.dataLoaded) {
      await this.loadPage(1)
      this.dataLoaded = true
    }
  },
  methods: {
    async loadPage (page) {
      this.page = page

      try {
        await this.$store.dispatch('loadProfileWallets', this.page)
      } catch (error) {}
    }
  }
}

</script>
<style lang="scss" scoped>
  table {
    width: 100%;
  }

  .paging {
    margin-top: 15px;
  }

</style>
