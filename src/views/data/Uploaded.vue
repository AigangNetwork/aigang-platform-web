<template>
  <div>
    <transition-group name="list" tag="div" v-loading="loading">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="dataItem in myDataList" :key="dataItem.id">
        <div>
          <DataItem :data="dataItem" :key="dataItem.id" />
        </div>
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
export default {
  components: {
    DataItem
  },
  data () {
    return {
      myDataList: [],
      totalPageCount: 0,
      loading: false,
      errorOccured: false
    }
  },
  methods: {
    loadDataItems () {
      this.loading = true
      this.axios.get('/data/mylist?page=1').then(response => {
        this.myDataList = response.data.items
        this.totalPageCount = response.data.totalPages
        this.loading = false
      }).catch(e => {
        this.loading = false
        this.errorOccured = true
      })
    }
  },
  created () {
    this.loadDataItems()
  }
}

</script>
