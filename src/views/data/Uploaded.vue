<template>
  <transition-group name="list" tag="div">
    <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="dataItem in myDataList" :key="dataItem.id">
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
      myDataList: [],
      totalPageCount: 0
    }
  },
  methods: {
    loadDataItems () {
      this.axios.get('/data/mylist?page=1').then(response => {
        this.myDataList = response.data.items
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
