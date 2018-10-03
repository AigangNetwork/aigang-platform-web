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
        <Outcomes :selectedOutcomeId="selectedOutcomeId" :items="prediction.outcomes" @selected="onOutcomeSelected" />
      </div>
    </div>
    <ConfirmForecastDialog :prediction="prediction.title" :selectedOutcome="selectedOutcome" :isVisible="isPredictionConfirmDialogVisible"
      :displayDialog="dispalyPredictionConfirmDialog" @createForecast="onCreateForecast" />

    <PaymentConfirmationDialog :isVisible="isPaymentDialogVisible" :displayDialog="displayPaymentDialog" />
  </div>
</template>

<script>
import PredictionInfoHeader from './PredictionInfoHeader'
import Card from '@/components/Card'
import Date from '@/components/Date'
import Outcomes from '@/components/predictions/Outcomes'
import OutcomesPercentage from '@/components/predictions/OutcomesPercentage'
import ConfirmForecastDialog from '@/components/predictions/ConfirmForecastDialog'
import PaymentConfirmationDialog from '@/components/predictions/PaymentConfirmationDialog'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    PredictionInfoHeader,
    Card,
    Outcomes,
    ConfirmForecastDialog,
    PaymentConfirmationDialog,
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
      isPaymentDialogVisible: false,
      selectedOutcome: {},
      selectedOutcomeId: 0
    }
  },
  async created () {
    await this.$store.dispatch('predictions/getPrediction', this.$route.params.id)
    this.isDataLoaded = true
  },
  methods: {
    onOutcomeSelected (id) {
      this.prediction.outcomes.map(o => {
        if (o.id === id) {
          this.selectedOutcome = o
        }
      })

      this.selectedOutcomeId = id

      this.dispalyPredictionConfirmDialog(true)
    },
    dispalyPredictionConfirmDialog (value) {
      if (!value) {
        this.selectedOutcomeId = 0
      }

      this.isPredictionConfirmDialogVisible = value
    },
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    },
    async onCreateForecast (data) {
      this.dispalyPredictionConfirmDialog(false)

      const payload = {
        predictionId: this.prediction.id,
        outcomeId: data.selectedOutcomeId,
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
    .aig-info-content{
      p.description {
        margin-bottom: 40px;
      }

      .info-title {
        margin-top: 0px;
      }
    }
  }

</style>
