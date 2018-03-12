<template>
<div class="aig__container">
<el-container class="aig__container">
      <el-aside width="20%" class="aig__data__menu">
        <ul>
         <li v-on:click="selectMenu(index)" :class="{ aig__menu__active: item.active }" v-for="(item, index) in dataMeniu" :key="item.name">
           <router-link :to="item.routeLink">
             {{ item.name }}
           </router-link>
         </li>
        </ul>
      </el-aside>
      <el-main class="aig__data__container">
        <el-row :gutter="26">
          <el-col :span="16">
            <el-input placeholder="Search by name or keywords" v-model="searchInput"></el-input>
          </el-col>
          <el-col :span="8">
            <div v-if="$store.getters.isAuthenticated" class="">
              <el-button type="primary" @click="$router.push({ name: 'Upload' })" class="aig__upload__btn">{{ $t('actions.upload_new_data')}}</el-button>
              <!-- <UploadData v-on:successfullUpload="loadDataItems" v-if="showDialog" :show-dialog.sync="showDialog" /> -->
            </div>
          </el-col>
        </el-row>
         <el-row :gutter="20" class="aig__items">

        <transition-group name="list" tag="div">
            <!-- <el-col :span="6"  v-for="dataItem in dataList" :key="dataItem.id">
                <DataItem :data="dataItem" :key="dataItem.id" />
            </el-col> -->
          <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="dataItem in dataList" :key="dataItem.id">
            <DataItem :data="dataItem" :key="dataItem.id" />
          </el-col>
        </transition-group>
      </el-row>
      <!-- <el-pagination
        v-if="this.dataList.length > 0"
        style="text-align: center; margin-top: 30px;"
        background
        layout="prev, pager, next"
        :total="totalPageCount"
        size="small">
      </el-pagination> -->
      </el-main>
    </el-container>
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
      dataMeniu: [
        { name: this.$t('data.menu.all'), routeLink: '/', active: true },
        { name: this.$t('data.menu.uploaded'), routeLink: '/', active: false },
        { name: this.$t('data.menu.models'), routeLink: '/', active: false }
      ],
      searchInput: '',
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
    },
    selectMenu (index) {
      this.dataMeniu.forEach(function (val, key) {
        val.active = false
      })
      this.dataMeniu[index].active = true
    }
  },
  mounted () {
    this.loadDataItems()
  }
}
</script>

<style lang="scss" scoped>@import '~helpers/variables';
@import '~helpers/mixins';

.aig__data__container {
  background-image: url("/static/background/backgroud_pattern.svg");
  padding-left: 60px;
  padding-right: 60px;
  @include breakpoint(max-width 1150px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
  .el-input__inner {
    height: 100px;
  }
.aig__upload__btn {
  width: 100%;
}

.aig__data__menu {
  border-right: 1px solid $light-border-blue;
  ul {
    font-size: 18pt;
    padding: 15px;
    list-style-type: none;
    a {
    color: #ccc9d6;
      padding: 10px;
      display: block;
    }
    .aig__menu__active {
      a {
        color: $purple
      }
    }
  }
}
</style>
