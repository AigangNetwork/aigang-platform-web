<template>
  <div class="aig-container aig-view">
    <Card class="product-card">
      <div slot="body" v-loading="loading">
        <transition-group name="slideUp" mode="out-in">

          <ProductHeader key="1" :product="product" v-if="!isPolicyLoadingVisible" />
          <ProductDetails key="2" v-if="!isPolicyLoadingVisible" />
          <PolicyLoadingInfo v-else key="3" />

        </transition-group>
      </div>
    </Card>
  </div>

</template>
<script>
import Card from '@/components/Card'
import EndDate from '@/components/mixins/EndDate'
import ProductHeader from '@/components/insurance/ProductHeader'
import ProductDetails from '@/components/insurance/ProductDetails'
import PolicyLoadingInfo from '@/components/insurance/PolicyLoadingInfo'

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { Card, ProductHeader, ProductDetails, PolicyLoadingInfo },
  mixins: [EndDate],
  computed: {
    ...mapGetters(['product', 'loading', 'isPolicyLoadingVisible'])
  },
  methods: {
    ...mapMutations({
      clearLoadingInfo: 'CLEAR_POLICY_LOADING_INFO',
      setIsPolicyLoadingVisible: 'SET_IS_POLICY_LOADING_VISIBLE'
    })
  },
  async created () {
    await this.$store.dispatch('loadProduct', this.$route.params.id)
  },
  async beforeMount () {
    this.clearLoadingInfo()
    this.setIsPolicyLoadingVisible(false)
  },
  beforeRouteLeave (to, from, next) {
    this.clearLoadingInfo()
    this.setIsPolicyLoadingVisible(false)
    next()
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';

  .product-card.aig-card .aig-card-body {
    padding: 0 !important;
  }

  .product-details-body {
    padding: 0 53px;

    .wrapper.el-button {
      display: block;
      width: 100%;
      margin: 40px 0;
    }
    .aig-button {
      margin-top: 0;
    }
  }

  .terms-and-conditions {
    overflow-y: scroll;
    max-height: 180px;
    border: 1px solid $light-blue;
    padding: 5px;
  }

  .contract-address {
    font-size: 18px;
    color: $light-blue !important;
    font-family: $font-secondary;
    word-wrap: break-word;
  }

  @media screen and (min-width: 100px) and (max-width: 710px) {
    .product-details-body {
      padding: 0 20px;
    }
  }
</style>
