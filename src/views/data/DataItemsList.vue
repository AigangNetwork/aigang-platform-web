<template>

  <transition-group class="data-items-container" name="slideUp" v-loading="loading">
    <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="dataItem in dataList" :key="dataItem.id">
      <DataItem :data="dataItem" :key="dataItem.id" />
    </el-col>
    <el-col :key="totalPageCount">
      <Pagination v-if="totalPageCount > 0" :callback="loadPage" :total-page-count="totalPageCount" :current-page="page" />
    </el-col>
    <el-col v-if="!dataList && isUpload" key="uploadError">
      <h2>
        {{ $t('general.unableToFindYourDatasets') }}
      </h2>
    </el-col>
    <el-col v-if="!dataList && isModels" key="modelsError">
      <h2>
        {{ $t('general.unableToFindYourModels') }}
      </h2>
    </el-col>
  </transition-group>

</template>
<script>
import DataItem from '@/components/data/DataItem'
import Pagination from '@/components/Pagination'

export default {
  props: ['requestPath', 'routerPath', 'isUpload', 'isModels'],
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
      this.axios.get(this.requestPath + this.page).then(response => {
        this.loading = false
        this.dataList = response.data.items
        this.totalPageCount = response.data.totalPages
      }).catch(e => {
        this.loading = false
      })
    },
    loadPage (page) {
      if (page <= this.totalPageCount) {
        this.page = page
        this.$router.push(this.routerPath + page)
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

<style lang="scss" scoped>
  .data-items-container {
    height: 100%;
    display: inline-block;
    width: 100%;
    min-height: 250px;
  }

</style>
