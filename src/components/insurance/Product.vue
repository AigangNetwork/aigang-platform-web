<template>
  <div class="aig-container aig-view" v-loading="$store.getters.loading || !isWeb3Loaded">
    <Card class="product-card" v-if="isWeb3Loaded && product">
      <div slot="body">
        <transition-group name="slideUp" mode="out-in">
          <ProductHeader key="1" v-if="!isPolicyLoadingVisible" />
          <ProductDetails key="2" v-if="!isPolicyLoadingVisible" />
          <PolicyLoadingInfo v-else key="3" />
        </transition-group>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import ProductHeader from '@/components/insurance/ProductHeader'
import ProductDetails from '@/components/insurance/ProductDetails'
import PolicyLoadingInfo from '@/components/insurance/PolicyLoadingInfo'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('insurance')

export default {
  components: { Card, ProductHeader, ProductDetails, PolicyLoadingInfo },
  computed: {
    ...mapGetters(['product', 'isPolicyLoadingVisible']),
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    },
    isWeb3Loaded () {
      return this.$store.getters['user/isWeb3Loaded']
    }
  },
  methods: {
    ...mapMutations({
      clearLoadingInfo: 'clearPolicyLoadingInfo',
      setIsPolicyLoadingVisible: 'setIsPolicyLoadingVisible'
    }),
    async loadData () {
      const payload = {
        address: this.$route.params.address,
        type: this.$route.params.type
      }

      await this.$store.dispatch('insurance/getProduct', payload)
    }
  },
  watch: {
    async isWeb3Enabled (newValue) {
      if (newValue) {
        await this.loadData()
      }
    }
  },
  async mounted () {
    if (this.$store.getters['user/isWeb3Enabled']) {
      await this.loadData()
    }
  },
  async beforeMount () {
    this.clearLoadingInfo()
    this.setIsPolicyLoadingVisible(false)
  },
  beforeRouteLeave (to, from, next) {
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

  @media screen and (min-width: 100px) and (max-width: 710px) {
    .product-details-body {
      padding: 0 20px;
    }
  }
</style>
