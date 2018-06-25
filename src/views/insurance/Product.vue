<template>
  <div class="aig-container aig-view">
    <Card class="product-card">
      <div slot="body" v-loading="loading">
        <ProductDetailsHeader :product="product" />
        <router-view></router-view>
      </div>
    </Card>
  </div>

</template>
<script>
import Card from '@/components/Card'
import EndDate from '@/components/mixins/EndDate'
import ProductDetailsHeader from '@/components/insurance/ProductDetailsHeader'
import { mapGetters } from 'vuex'

export default {
  components: { Card, ProductDetailsHeader },
  mixins: [EndDate],
  computed: { ...mapGetters(['product', 'loading']) },
  async created () {
    await this.$store.dispatch('loadCurrentProduct', this.$route.params.id)
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
  }

  .aig-button {
    margin: 40px auto;
  }

  .terms-and-conditions {
    overflow-y: scroll;
    max-height: 180px;
    border: 1px solid $light-blue;
    padding: 5px;
  }

  .product-card .contract-address {
    font-size: 18px;
    color: $light-blue;
    font-family: $font-secondary;
    word-wrap: break-word;
  }

  @media screen and (min-width: 100px) and (max-width: 710px) {
    .product-details-body {
      padding: 0 20px;
    }
  }
</style>
