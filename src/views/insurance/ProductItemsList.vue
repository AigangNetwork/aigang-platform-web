<template>
  <transition-group class="data-items-container" name="slideUp" v-loading="loading">
    <el-col v-if="!loading" :xs="24" :sm="12" :md="12" :lg="8" v-for="productItem in productList" :key="productItem.id">
      <ProductItem :product="productItem" :key="productItem.id" />
    </el-col>
    <el-col v-if="!loading" :key="totalPageCount">
      <Pagination v-if="totalPageCount > 0" :callback="loadPage" :total-page-count="totalPageCount" :current-page="page" />
    </el-col>
    <el-col v-if="!loading && errorOccured && isMyPolicies">
      <h2>
        {{ $t('general.unableToFindYourDatasets') }}
      </h2>
    </el-col>
  </transition-group>
</template>
<script>
import ProductItem from '@/components/insurance/ProductItem'
import Pagination from '@/components/Pagination'

export default {
  props: ['requestPath', 'routerPath', 'isMyPolicies'],
  components: {
    ProductItem,
    Pagination
  },
  data () {
    return {
      productList: [],
      totalPageCount: 0,
      page: 0,
      loading: false,
      errorOccured: false
    }
  },
  methods: {
    loadProductItems () {
      this.loading = true
      this.axios.get(this.requestPath + this.page).then(response => {
        this.loading = false
        this.productList = response.data.items
        this.totalPageCount = response.data.totalPages
      }).catch(e => {
        this.loading = false
        this.errorOccured = true
      })
    },
    loadPage (page) {
      if (page <= this.totalPageCount) {
        this.page = page
        this.$router.push(this.routerPath + page)
        this.loadProductItems()
      }
    }
  },
  created () {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page)
      this.loadProductItems()
    } else {
      this.page = 1
      this.loadProductItems()
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
