<template>
  <div class="summary-container" v-loading="portfolioSummaryLoading" :element-loading-text="$t('pools.calculatingSummary')">
      <Card >
        <div slot="body" class="scrollable">
          <div class="details">
            <div class="details-item">
              <div class="title">{{ $t('pools.contributions.summary.contributions') }}</div>
              <span class="value">{{ portfolioSummary.contributions }}</span>
            </div>
            <div class="details-item">
              <div class="title">{{ $t('pools.contributions.summary.contributionsAmount') }}</div>
              <span class="value">{{ portfolioSummary.contributionsAmount }} {{ $t('general.aix') }}</span>
            </div>
            <div class="details-item">
              <div class="title">{{ $t('pools.contributions.summary.availableReward') }}</div>
              <span class="value">{{ portfolioSummary.availableRefund }} {{ $t('general.aix') }}</span>
            </div>
            <div class="details-item">
              <div class="title">{{ $t('pools.contributions.summary.rewardPaidOut') }}</div>
              <span class="value">{{ portfolioSummary.rewardPaidOut }} {{ $t('general.aix') }}</span>
            </div>
          </div>
        </div>
      </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: { Card },
  computed: {
    ...mapGetters(['portfolioSummary', 'portfolioSummaryLoading'])
  },
  async beforeMount () {
    await this.$store.dispatch('pools/getPortfolioSummary')
    this.isDataLoaded = true
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';

  .summary-container .aig-card {
    width: 100%;

    .aig-card-body {
      margin: 0 auto;
    }

    .details {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .details-item {
        margin: 20px 15px;
        text-align: center;

        .title {
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .value {
          font-family: $font-secondary;
          font-weight: 400;
          font-size: 20pt;
        }
      }
    }
  }
</style>
