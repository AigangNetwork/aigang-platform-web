<template>
  <div class="aig__container">
    <div class="aig__view__head">
      <el-breadcrumb class="aig__breadcrumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">AiGang Network</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('anchors.data') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="aig__view__heading">
        <div class="aig__view__title">{{ $t('anchors.data') }}</div>
        <div class="aig__view__description">
          <p>Suspendisse potenti. Sed sagittis, nisl a interdum lacinia, sem odio tincidunt erat, at ultrices mauris quam at ligula.</p>
        </div>
      </div>
    </div>
    <div class="aig__view__body"  v-loading="loading" element-loading-background="transparent" element-loading-text="Loading data..">
      <el-row :gutter="20" class="aig__items">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" v-if="$store.getters.isAuthenticated">
          <button class="aig__data aig__data--creatable" @click="showDialog = true">
            <span class="title">{{ $t('actions.upload_new_data') }}</span>
            <span class="desc">Click here to upload new data sets.</span>
          </button>
          <UploadData v-on:successfullUpload="loadDataItems" v-if="showDialog" :show-dialog.sync="showDialog" />
        </el-col>
        <transition-group name="list" tag="div">
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
        :total="totalPageCount"
        size="small">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import DataItem from '@/components/DataItem'
import UploadData from '@/components/UploadData'

export default {
  name: 'DataView',
  components: {
    DataItem,
    UploadData
  },
  data () {
    return {
      loading: true,
      showDialog: false,
      dataList: [],
      totalPageCount: 0,
      msg: 'Data view'
    }
  },
  methods: {
    loadDataItems () {
      this.axios.get('/data/list?page=1').then(response => {
        this.dataList = response.data.items
        this.totalPageCount = response.data.totalPages
        this.loading = false
      })
    }
  },
  mounted () {
    this.loadDataItems()
  }
}
</script>

<style lang="scss" scoped>@import '~helpers/variables';
@import '~helpers/mixins';

.aig__data {
  @include transition;
  position: relative;
  width: 100%;
  padding: 25px 25px 20px 25px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid darken($gray, 2);
  height: 137px;
  &:hover {
    box-shadow: 0 0 30px 0 rgba($purple, 0.12);
  }
  &.aig__data--creatable {
    cursor: pointer;
    font-family: $font-secondary;
    font-size: 16px;
    font-weight: 400;
    color: $black;
    background: transparent;
    box-shadow: none;
    border: 2px dashed darken($gray, 10);
    .title, .desc {
      display: block;
      height: auto;
    }
    &:hover {
      border-color: darken($gray, 20);
      .description {
        color: $purple;
      }
    }
    &:active {
      border-color: $purple;
      background: white;
    }
  }
  .aig__data__body {
    margin-top: 7px;
  }
  .aig__data__head {
    display: flex;
    align-items: center;
    .aig__status {
      margin-top: -1px;
      &+.title {
        margin-left: 6px;
      }
    }
  }
  .aig__data__footer {
    margin-top: 20px;
    width: 100%;
    font-size: 0;
    .aig__button {
      display: block;
      width: 50%;
      border-radius: 0;
    }
    .desc {
      font-size: 12px;
    }
  }
  .aig__data__more {
    display: block;
    height: 18px;
    width: auto;
    position: absolute;
    right: 7px;
    bottom: 12px;
    svg {
      @include transition(all, 200ms, ease-in-out);
      height: 100%;
      width: auto;
      fill: darken($gray, 25);
      &:hover {
        fill: $purple;
      }
    }
  }
  .title {
    font-family: $font-secondary;
    font-weight: 500;
    font-size: 15px;
  }
  .desc {
    line-height: 1.3;
    color: darken($gray, 50);
    font-size: 13px;
    height: 33px;
    overflow: hidden;
  }
}
</style>
