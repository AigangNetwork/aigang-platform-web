<template>
  <div class="aig-container aig-view aig-info" v-loading="$store.getters.loading">
    <div class="aig-info-header" v-if="isDataLoaded">
      <div class="back-button-container">
        <router-link :to="{ name: 'PredictionsList' }" class="back-button">{{ $t('general.backToList')}}</router-link>
      </div>
      <div class="aig-info-header-content">
        <PredictionInfoHeader :info="headerInfo" />
      </div>
    </div>
    <div class="aig-info-content-container" v-if="isDataLoaded">
      <div class="aig-info-content">
        <h4 class="info-title">{{ $t('predictions.description') }}</h4>
        <vue-markdown class="markup-content" :html="false" :source="prediction.description || $t('predictions.noDescription')"></vue-markdown>

        <h4 class="info-title">{{ $t('predictions.predictionDetails') }}</h4>
        <div class="details">
          <p class="no-margin-bottom">{{ $t('predictions.marketContractAddress') }}: <a class="contract-address" target="_blank" :href="contractLink">{{ prediction.marketAddress }}</a></p>
          <p>{{ $t('predictions.fee') }}: <span class="value">{{ prediction.fee }} {{ $t('general.aix') }}</span></p>
          <p v-if="this.prediction.status === 'resolved'">{{ $t('predictions.wonOutcome') }}: <span class="value">{{ prediction.resultOutcomeName }} ({{ $t('predictions.index') }}: {{ prediction.resultOutcomeIndex }})</span></p>
        </div>

        <div v-if="prediction.status !== 'resolved'">
          <h4 class="info-title">{{ $t('predictions.outcomes') }}</h4>
          <Outcomes :selectedOutcomeIndex="selectedOutcomeIndex" :items="prediction.outcomes" :disabled="isOutcomesDisabled" @selected="onOutcomeSelected" />
        </div>

        <div v-if="isPercentageVisible">
          <h4 class="info-title">{{ $t('predictions.predictionStatistics') }}</h4>
          <OutcomesPercentage v-loading="statisticsLoading" :statistics="predictionStatistics" :resultOutcomeId="prediction.resultOutcomeId"/>
        </div>

      </div>
    </div>

    <ConfirmForecastDialog
      :prediction="prediction.title"
      :selectedOutcome="selectedOutcome"
      :isVisible="isPredictionConfirmDialogVisible"
      :displayDialog="displayPredictionConfirmDialog"
      :fee="prediction.fee"
      @createForecast="onCreateForecast"/>

    <PaymentConfirmationDialog
      :isVisible="isPaymentDialogVisible && !transactionError"
      :displayDialog="displayPaymentDialog"
      :content="$t('predictions.prediction.paymentInfo.metamaskAlert')" />
  </div>
</template>

<script>
import PredictionInfoHeader from './PredictionInfoHeader'
import Card from '@/components/Card'
import Outcomes from '@/components/predictions/Outcomes'
import OutcomesPercentage from '@/components/predictions/OutcomesPercentage'
import ConfirmForecastDialog from '@/components/predictions/ConfirmForecastDialog'
import PaymentConfirmationDialog from '@/components/predictions/PaymentConfirmationDialog'
import VueMarkdown from 'vue-markdown'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    PredictionInfoHeader,
    Card,
    Outcomes,
    ConfirmForecastDialog,
    PaymentConfirmationDialog,
    OutcomesPercentage,
    VueMarkdown
  },
  computed: {
    ...mapGetters(['prediction', 'predictionStatistics', 'statisticsLoading', 'transactionError']),
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATX + this.prediction.marketAddress
    },
    isPercentageVisible () {
      return this.predictionStatistics && this.prediction.status.toUpperCase() === 'RESOLVED'
    },
    isOutcomesDisabled () {
      return (
        this.prediction.status === 'paused' ||
        this.prediction.status === 'canceled' ||
        this.prediction.status === 'pendingPublished' ||
        this.prediction.status === 'pendingPublish'
      )
    }
  },
  data () {
    return {
      isDataLoaded: false,
      isPredictionConfirmDialogVisible: false,
      isPaymentDialogVisible: false,
      selectedOutcome: {},
      selectedOutcomeIndex: 0,
      headerInfo: {}
    }
  },
  async mounted () {
    await this.$store.dispatch('predictions/getPrediction', this.$route.params.id)
    this.isDataLoaded = true
    this.headerInfo = {
      title: this.prediction.title,
      status: this.prediction.status,
      forecastStartUtc: this.prediction.forecastStartUtc,
      forecastEndUtc: this.prediction.forecastEndUtc,
      resultDateUtc: this.prediction.resultDateUtc,
      forecastsCount: this.prediction.forecastsCount,
      poolSize: this.prediction.poolSize
    }
  },
  methods: {
    onOutcomeSelected (index) {
      this.prediction.outcomes.map(o => {
        if (o.index === index) {
          this.selectedOutcome = o
        }
      })

      this.selectedOutcomeIndex = index

      this.displayPredictionConfirmDialog(true)
    },
    displayPredictionConfirmDialog (value) {
      if (!value) {
        this.selectedOutcomeIndex = 0
      }

      this.isPredictionConfirmDialogVisible = value
    },
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    },
    async onCreateForecast (data) {
      this.displayPredictionConfirmDialog(false)

      const payload = {
        predictionId: this.prediction.id,
        outcomeId: data.selectedOutcomeId,
        outcome: data.selectedOutcomeIndex,
        amount: data.amount
      }

      await this.$store.dispatch('predictions/addForecast', payload)

      this.displayPaymentDialog(true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .aig-info {
    .aig-info-content {
      p.description {
        margin-bottom: 40px;
      }

      .info-title {
        margin-top: 0px;
      }
    }

    .details {
      margin-bottom: 20px;

      p {
        margin: 0px;
      }

      .value {
        font-weight: 400;
      }
    }

    .markup-content {
      margin-bottom: 20px;
    }
  }

  .no-margin-bottom {
    margin-bottom: 0;
  }

  .no-margin-top {
    margin-top: 0;
  }
</style>
