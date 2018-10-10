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
        <h4 class="info-title">{{ $t('predictions.marketContractAddress') }}</h4>
        <p><a class="contract-address" target="_blank" :href="contractLink">{{ prediction.marketAddress }}</a></p>
        <div v-if="prediction.status === 'published' && forecastStartUtc <= utcNow">
          <h4 class="info-title">{{ $t('predictions.outcomes') }}</h4>
          <Outcomes :selectedOutcomeIndex="selectedOutcomeIndex" :items="prediction.outcomes" @selected="onOutcomeSelected" />
        </div>
        <div v-if="isPercentageVisible">
          <h4 class="info-title">{{ $t('predictions.predictionStatistics') }}</h4>
          {{ forecastStartUtc }}
          <OutcomesPercentage :statistics="predictionStatistics" />
        </div>
      </div>
    </div>

    <ConfirmForecastDialog :prediction="prediction.title" :selectedOutcome="selectedOutcome" :isVisible="isPredictionConfirmDialogVisible"
      :displayDialog="displayPredictionConfirmDialog" @createForecast="onCreateForecast" />

    <PaymentConfirmationDialog :isVisible="isPaymentDialogVisible" :displayDialog="displayPaymentDialog" :content="$t('predictions.prediction.paymentInfo.metamaskAlert')" />
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
    ...mapGetters(['prediction', 'predictionStatistics']),
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATX + this.prediction.marketAddress
    },
    isPercentageVisible () {
      return this.prediction.status.toUpperCase() === 'RESOLVED'
    },
    forecastStartUtc () {
      return new Date(this.prediction.forecastStartUtc)
    }
  },
  data () {
    return {
      isDataLoaded: false,
      isPredictionConfirmDialogVisible: false,
      isPaymentDialogVisible: false,
      selectedOutcome: {},
      selectedOutcomeIndex: 0,
      headerInfo: {},
      utcNow: new Date().getTime()
    }
  },
  async mounted () {
    await this.$store.dispatch('predictions/getPrediction', this.$route.params.id)
    this.isDataLoaded = true
    this.headerInfo = {
      title: this.prediction.title,
      status: this.prediction.status,
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

    .markup-content {
      margin-bottom: 20px;
    }
  }
</style>
