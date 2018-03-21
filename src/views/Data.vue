<template>
  <div class="aig-container">
    <el-container class="aig-container">
      <el-aside width="20%" class="aig-data-menu">
        <span v-if="$store.state.user.authenticated">
          <ul>
            <li v-on:click="selectMenu(index)" :class="{ 'aig-menu-active': item.active }" v-for="(item, index) in dataMeniu" :key="item.name">
              <router-link :to="item.routeLink">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </span>
      </el-aside>
      <el-main class="aig-data-container">
        <el-row :gutter="26">
          <el-col :span="16">
            <el-input placeholder="Search by name or keywords" v-model="searchInput"></el-input>
          </el-col>
          <el-col :span="8">
            <div v-if="$store.getters.isAuthenticated" class="">
              <el-button type="primary" @click="$router.push({ name: 'Upload' })" class="aig-upload-btn">{{ $t('actions.upload_new_data')}}</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="aig-items">

          <transition-group name="list" tag="div">
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

export default {
  name: 'DataView',
  components: {
    DataItem
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

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .aig-data-container {
    padding-left: 60px;
    padding-right: 60px;
    @include breakpoint(max-width 1150px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .el-input-inner {
    height: 100px;
  }

  .aig-upload-btn {
    width: 100%;
  }

  .aig-data-menu {
    border-right: 1px solid $light-border-blue;
    border-left: 1px solid $light-border-blue;
    position: relative;
    ul {
      font-size: 18pt;
      padding: 45px;
      list-style-type: none;
      a {
        color: #ccc9d6;
        padding: 10px;
        display: block;
      }
      .aig-menu-active {

        a {
          color: $purple;
          &:before {
            display: inline-block;
            position: relative;
            content: "";
            height: 1px;
            width: 45px;
            background: purple;
            margin-bottom: 8px;
            margin-left: -55px;
            margin-right: 5px
          }
        }

      }
    }
  }
</style>
