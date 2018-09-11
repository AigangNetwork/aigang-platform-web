<template>
  <div class="aig-container aig-view" v-loading="$store.getters.loading">
    <Card class="prediction-card" v-show="isDataLoaded">
      <div slot="body">
        <div class="dataset-model-header-container">
          <el-row class="header">
            <router-link :to="{ name: 'PredictionsList' }" class="back-button">
              <i class="back-icon el-icon-arrow-left"></i>
            </router-link>
            <h3>{{ prediction.title }}</h3>
          </el-row>
        </div>

        <div class="dataset-content-container">
          <div class="content">
            <div class="prediction-info">
              <p>{{ prediction.description }}</p>
              <p>{{`${$t('predictions.predictions.forecastTill')}: ${prediction.endDateUtc}`}}</p>
              <p>{{`${$t('predictions.predictions.poolSize')}: ${prediction.poolSize}`}} {{ $t('general.aix') }}</p>
            </div>
            <Outcomes
              :selectedOutcomeId="selectedOutcomeId"
              :items="prediction.outcomes"
              @selected="onOutcomeSelected" />
          </div>
        </div>
      </div>
    </Card>

    <ConfirmForecastDialog
      :prediction="prediction.title"
      :selectedOutcome="selectedOutcome"
      :isVisible="isPredictionConfirmDialogVisible"
      :displayDialog="dispalyPredictionConfirmDialog"
      @createForecast="onCreateForecast"/>
  </div>
</template>

<script>
import Card from '@/components/Card'
import Outcomes from '@/components/predictions/Outcomes'
import ConfirmForecastDialog from '@/components/predictions/ConfirmForecastDialog'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    Card,
    Outcomes,
    ConfirmForecastDialog
  },
  computed: {
    ...mapGetters(['prediction'])
  },
  data () {
    return {
      isDataLoaded: false,
      isPredictionConfirmDialogVisible: false,
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
    async onCreateForecast (data) {
      this.dispalyPredictionConfirmDialog(false)

      const payload = {
        predictionId: this.prediction.id,
        outcomeId: data.selectedOutcomeId,
        amount: data.amount
      }

      await this.$store.dispatch('predictions/makeForecast', payload)

      this.$router.push({ name: 'MyForecastsList' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .aig-container {
    .prediction-card {
      .header {
        display: flex;
        flex-direction: row;

        .back-icon {
          margin-top: 24px;
          margin-right: 10px;
        }
      }

      .content {
        .prediction-info {
          margin-bottom: 30px;
        }
      }
    }
  }

</style>
