<template>
  <div class="dataset-model-header-container">
    <div class="header-title-container">
      <div class="header-left-section">
        <img :src="product.imageUrl" />
        <h1>{{ product.title }}</h1>
        <p>
          <span class="date">{{ $t('insurance.product.productEnds') }} {{ endDate }} {{ $t('general.utc') }} </span>
        </p>
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

export default {
  props: ['product'],
  computed: {
    isPremiumBig () {
      return !(String(this.product.basePremium).length > 7)
    },
    endDate () {
      let date = new Date(this.product.endDateUtc)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDay()

      if (day < 10) day = '0' + day
      if (month < 10) month = '0' + month

      return `${year}-${month}-${day}`
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
