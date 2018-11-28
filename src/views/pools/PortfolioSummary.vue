<template>
  <div class="summary-container" v-loading="portfolioSummaryLoading">
    <div v-if="isDataLoaded">
      <Card>
        <div slot="body" class="scrollable">
          <div class="details">
            <p>{{ $t('pools.contributions.summary.contributions') }}: <span class="value">{{ portfolioSummary.contributions}}</span></p>
            <p>{{ $t('pools.contributions.summary.contributionsAmount') }}: <span class="value">{{ portfolioSummary.contributionsAmount}} {{ $t('general.aix') }}</span></p>
            <p>{{ $t('pools.contributions.summary.availableReward') }}: <span class="value">{{ portfolioSummary.availableRefund}} {{ $t('general.aix') }}</span></p>
            <p>{{ $t('pools.contributions.summary.rewardPaidOut') }}: <span class="value">{{ portfolioSummary.rewardPaidOut}} {{ $t('general.aix') }}</span></p>
          </div>
        </div>
      </Card>
    </div>
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
  data () {
    return {
      isDataLoaded: false
    }
  },
  async beforeMount () {
    await this.$store.dispatch('pools/getPortfolioSummary')
    this.isDataLoaded = true
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';

  .aig-card {
    width: 100%;

    .details {
      margin-bottom: 20px;

      p {
        margin: 0px;
      }

      .value {
        font-weight: 400;
      }
    }
  }

</style>
