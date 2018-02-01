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
    <div class="aig__view__body"  v-loading="loading" element-loading-background="transparent" element-loading-text="Loading data..">
      <el-row :gutter="20" class="aig__items">
        <transition-group name="list" tag="div">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" v-if="$store.getters.isAuthenticated">
            <DataItem :creatable="true" />
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="dataItem in dataList" :key="dataItem.id">
            <DataItem :data="dataItem" :key="dataItem.id" />
          </el-col>
        </transition-group>
      </el-row>
      <el-pagination
        v-if="this.dataList.length > 0"
        style="text-align: center; margin-top: 30px;"
        background
        layout="prev, pager, next"
        :total="1000"
        size="small">
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
      loading: true,
      dataList: [],
      msg: 'Data view'
    }
  },
  mounted () {
    this.axios.get('/data/list?page=1').then(response => {
      this.dataList = response.data.items
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/mixins';
</style>
