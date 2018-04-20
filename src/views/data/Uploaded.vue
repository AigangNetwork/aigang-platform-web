<template>
  <div>
    <transition-group name="list" tag="div" v-loading="loading">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="dataItem in myDataList" :key="dataItem.id">
        <div>
          <DataItem :data="dataItem" :key="dataItem.id" />
        </div>
      </el-col>
      <el-col :key="totalPageCount">
        <Pagination v-if="totalPageCount > 0" :callback="loadPage" :total-page-count="totalPageCount" :current-page="page" />
      </el-col>
    </transition-group>
    <el-col v-if="errorOccured">
      <h2>
        {{ $t('general.unableToFindYourDatasets') }}
      </h2>
    </el-col>
  </div>
</template>
<script>
import DataItem from '@/components/DataItem'
import Pagination from '@/components/Pagination'
export default {
  components: {
    DataItem,
    Pagination
  },
  data () {
    return {
      myDataList: [],
      totalPageCount: 0,
      page: 0,
      loading: false,
      errorOccured: false
    }
  },
  methods: {
    loadDataItems () {
      this.loading = true
      this.errorOccured = false
      this.axios.get('/data/mylist?page=' + this.page).then(response => {
        this.myDataList = response.data.items
        this.totalPageCount = response.data.totalPages
        this.loading = false
      }).catch(e => {
        this.loading = false
        this.errorOccured = true
      })
    },
    loadPage (page) {
      if (page <= this.totalPageCount) {
        this.page = page
        this.$router.push('/data/uploaded?page=' + page)
        this.loadDataItems()
      }
    }
  },
  created () {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page)
      this.loadDataItems()
    } else {
      this.page = 1
      this.loadDataItems()
    }
  }
}

</script>
