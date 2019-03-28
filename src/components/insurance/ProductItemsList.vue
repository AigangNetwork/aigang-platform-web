<template>
  <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading || !$store.getters['user/isWeb3Loaded']">
    <el-row class="aig-items" key="insurance-produts-list">
      <transition-group v-if="isWeb3Enabled" name="slideUp">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="(product, index) in itemsList" :key="index">
          <ProductItem :product="product" :key="index" />
        </el-col>
      </transition-group>

      <el-col v-if="isWeb3Enabled">
        <transition name="slideUp">
            <Pagination v-if="products.totalPages > 1" :callback="loadPage" :total-page-count="products.totalPages" :current-page="page"/>
        </transition>
      </el-col>
    </el-row>

    <el-row class="failure-message" v-if="!isWeb3Enabled && $store.getters['user/isWeb3Loaded']" key="failure-message">
      <h2>{{ $t('general.web3NotConnected') }}</h2>
    </el-row>

    <el-row class="failure-message" key="no-pools-message" v-else-if="$store.getters['user/isWeb3Loaded'] && !$store.getters.loading && !isProductsExist">
      <h2>{{ $t('general.noInsuranceProducts') }}</h2>
    </el-row>
  </transition-group>
</template>

<script>
import ProductItem from '@/components/insurance/ProductItem'
import Pagination from '@/components/Pagination'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('insurance')

export default {
  props: ['requestPath', 'routerPath', 'isMyPolicies'],
  components: {
    ProductItem,
    Pagination
  },
  computed: {
    ...mapGetters(['products']),
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    },
    isProductsExist () {
      return this.products && this.products.items && this.products.items.length > 0
    },
    itemsList () {
      if (this.products.items.length < this.products.totalItems) {
        const placeholders = new Array(this.products.totalItems - this.products.items.length)
        return this.products.items.concat(placeholders)
      } else {
        return this.products.items
      }
    }
  },
  data () {
    return {
      page: 1,
      isDataLoaded: false
    }
  },
  watch: {
    async isWeb3Enabled (newValue) {
      if (newValue) {
        await this.loadPage(1)
        this.isDataLoaded = true
      }
    }
  },
  async beforeMount () {
    if (!this.isDataLoaded && this.isWeb3Enabled) {
      await this.loadPage(1)
      this.isDataLoaded = true
    }
  },
  methods: {
    async loadPage (page) {
      this.isDataLoaded = false
      this.page = page
      await this.$store.dispatch('insurance/getProductsList', this.page)
      this.isDataLoaded = true
    }
  }
}

</script>

<style lang="scss" scoped>
  .items-container {
    height: 100%;
    display: inline-block;
    width: 100%;
    min-height: auto;

    .aig-items .el-col {
      padding: 5px !important;
    }
  }
</style>
