<template>
  <div class="dataset-model-header-container">
    <div class="header-title-container" :class="{ disabled: !isCampaignRunning }">
      <div class="header-left-section">
        <InsuranceProductImage :type="product.type" />
        <h1>{{ product.title }}</h1>
        <div class="date" v-if="product.startDateUtc">{{ $t('insurance.product.productStart') }} <Date :dateUtc="product.startDateUtc" /></div>
        <div class="date" v-if="product.endDateUtc">{{ $t('insurance.product.productEnd') }} <Date :dateUtc="product.endDateUtc" /></div>
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
import moment from 'moment'
import Date from '@/components/Date'
import InsuranceProductImage from '@/components/insurance/InsuranceProductImage'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('insurance')

export default {
  components: { Date, InsuranceProductImage },
  computed: {
    ...mapGetters(['product']),
    isPremiumBig () {
      return !(String(this.product.basePremium).length > 7)
    },
    isCampaignRunning () {
      const currentDate = moment.utc()
      const campaignStartDate = moment.utc(this.product.startDateUtc)
      const campaignEndDate = moment.utc(this.product.endDateUtc)
      return currentDate.isAfter(campaignStartDate) && currentDate.isBefore(campaignEndDate)
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

    &.disabled {
      background: $grey-gradient-down-top;

      .header-right-section {
      background: $grey-gradient-top-down;
      }
    }
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

  .date {
    font-family: $font-secondary;
  }
</style>
