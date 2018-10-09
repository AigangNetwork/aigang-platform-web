<template>
  <div class="dataset-model-header-container">
    <div class="header-title-container">
      <div class="header-left-section">
        <img :src="product.imageUrl" />
        <h1>{{ product.title }}</h1>
        <span v-if="product.endDateUtc">{{ $t('insurance.product.productEnds') }} <Date :dateUtc="product.endDateUtc" /></span>
      </div>
      <div class="header-right-section">
        <span class="text-small">{{ $t('insurance.product.basePremium') }}</span>
        <span :class="{'text-big': isPremiumBig, 'text-big-medium': !isPremiumBig}">{{ product.basePremium }}</span>
        <span class="text-medium">{{ $t('general.aix') }} </span>
      </div>
    </div>

  </div>
</template>
<script>
import Date from '@/components/Date'

export default {
  components: {
    Date
  },
  props: ['product'],
  computed: {
    isPremiumBig () {
      return !(String(this.product.basePremium).length > 7)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include aig-header;

  .header-title-container {
    background: rgba(148, 75, 200, 1);
    background: linear-gradient(to bottom, rgba(148, 75, 200, 1) 0%, rgba(98, 55, 187, 1) 100%);
  }

  .header-right-section {
    background: rgba(148, 75, 200, 1);
    background: linear-gradient(to top, rgba(148, 75, 200, 1) 0%, rgba(98, 55, 187, 1) 100%);
  }

  .header-left-section {
    img {
      height: 100px;
      margin: 0 auto;
    }
  }
</style>
