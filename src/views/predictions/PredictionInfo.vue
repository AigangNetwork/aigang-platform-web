<template>
  <div class="aig-container aig-view aig-info" v-loading="$store.getters.loading">
    <div class="aig-info-header" v-if="isDataLoaded">
      <div class="back-button-container">
        <router-link :to="{ name: 'PredictionsList' }" class="back-button">{{ $t('general.backToList')}}</router-link>
      </div>
      <div class="aig-info-header-content">
        <PredictionInfoHeader :prediction="prediction" />
      </div>
    </div>
    <div class="aig-info-content-container" v-if="isDataLoaded">
      <div class="aig-info-content">
        <h4 class="info-title">{{ $t('predictions.prediction.description') }}</h4>
        <p>{{ prediction.description || $t('predictions.prediction.noDescription') }}</p>
        <h4 class="info-title">{{ $t('predictions.prediction.marketContractAddress') }}</h4>
        <p><a class="contract-address" target="_blank" :href="contractLink">{{ prediction.marketAddress }}</a></p>
        <h4 class="info-title">{{ $t('predictions.prediction.outcomes') }}</h4>
        <Outcomes :selectedOutcomeIndex="selectedOutcomeIndex" :items="prediction.outcomes" @selected="onOutcomeSelected" />
      </div>
    </div>
    <ConfirmForecastDialog :prediction="prediction.title" :selectedOutcome="selectedOutcome" :isVisible="isPredictionConfirmDialogVisible"
      :displayDialog="displayPredictionConfirmDialog" @createForecast="onCreateForecast" />
  </div>
</template>

<script>
import PredictionInfoHeader from './PredictionInfoHeader'
import Card from '@/components/Card'
import Date from '@/components/Date'
import Outcomes from '@/components/predictions/Outcomes'
import OutcomesPercentage from '@/components/predictions/OutcomesPercentage'
import ConfirmForecastDialog from '@/components/predictions/ConfirmForecastDialog'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    PredictionInfoHeader,
    Card,
    Outcomes,
    ConfirmForecastDialog,
    Date,
    OutcomesPercentage
  },
  computed: {
    ...mapGetters(['prediction']),
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATX + this.prediction.marketAddress
    }
  },
  data () {
    return {
      isDataLoaded: false,
      isPredictionConfirmDialogVisible: false,
      selectedOutcome: {},
      selectedOutcomeIndex: 0
    }
  },
  async created () {
    await this.$store.dispatch('predictions/getPrediction', this.$route.params.id)
    this.isDataLoaded = true
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
    async onCreateForecast (data) {
      this.displayPredictionConfirmDialog(false)

      const payload = {
        predictionId: this.prediction.id,
        outcomeId: data.selectedOutcomeId,
        outcome: data.selectedOutcomeIndex,
        amount: data.amount
      }

      await this.$store.dispatch('predictions/makeForecast', payload)
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
  }
</style>
