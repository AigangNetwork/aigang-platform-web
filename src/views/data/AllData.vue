<template>
  <transition-group v-loading="loading" name="list" tag="div">
    <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="dataItem in dataList" :key="dataItem.id">
      <DataItem :data="dataItem" :key="dataItem.id" />
    </el-col>
  </transition-group>
</template>
<script>
import DataItem from '@/components/DataItem'
export default {
  components: {
    DataItem
  },
  data () {
    return {
      dataList: [],
      totalPageCount: 0,
      loading: false
    }
  },
  methods: {
    loadDataItems () {
      this.loading = true
      this.axios.get('/data/list?page=1').then(response => {
        this.dataList = response.data.items
        this.totalPageCount = response.data.totalPages
        this.loading = false
      })
    }
  },
  created () {
    this.loadDataItems()
  }
}

</script>
