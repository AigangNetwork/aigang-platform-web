<template>
  <transition-group v-loading="loading" name="list" tag="div">
    <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="dataItem in dataList" :key="dataItem.id">
      <div :class="[{'aig-non-approved-data': dataItem.state === 'created'}, {'aig-link-disabled': dataItem.state === 'created'}]">
        <DataItem :data="dataItem" :key="dataItem.id" />
      </div>
    </el-col>
    <el-col :key="totalPageCount">
      <Pagination v-if="totalPageCount > 0" :callback="loadPage" :total-page-count="totalPageCount" :current-page="page" />
    </el-col>
  </transition-group>
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
      dataList: [],
      totalPageCount: 0,
      page: 0,
      loading: false
    }
  },
  methods: {
    loadDataItems () {
      this.loading = true
      this.axios.get('/data/list?page=' + this.page).then(response => {
        this.dataList = response.data.items
        this.totalPageCount = response.data.totalPages
        this.loading = false
      })
    },
    loadPage (page) {
      if (page <= this.totalPageCount) {
        this.page = page
        this.$router.push('/data/all?page=' + page)
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
