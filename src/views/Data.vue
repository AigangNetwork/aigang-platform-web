<template>
  <div class="aig__container">
    <div class="aig__view__head">
      <el-breadcrumb class="aig__breadcrumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">AiGang Network</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('anchors.data') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="aig__view__title">
        {{ $t('anchors.data') }}
      </div>
    </div>
    <div class="aig__view__body">
      <el-row :gutter="20" class="aig__items" style="margin-top: 30px">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" v-if="$store.getters.isAuthenticated">
          <DataItem :creatable="true" />
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="dataItem in dataList" :key="dataItem.id">
          <DataItem :data="dataItem" :key="dataItem.id" />
        </el-col>
      </el-row>
      <el-pagination
        style="text-align: center; margin-top: 30px;"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import DataItem from '@/components/DataItem'

export default {
  name: 'DataView',
  components: {
    DataItem
  },
  data () {
    return {
      dataList: [],
      msg: 'Data view'
    }
  },
  mounted () {
    this.axios.get('/data/list?page=1').then(response => {
      this.dataList = response.data.items
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/mixins';
</style>
