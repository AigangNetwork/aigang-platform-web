<template>
  <div class="outcomes-percentage">
    <h4>{{ $t('predictions.votesPerOutcome') }}</h4>
    <div class="outcomes-percentage-chart-container">
      <div class="outcomes-percentage-titles">
        <p class="outcomes-percentage-title" v-for="(row, index) in statistics.rows" :key="index">{{ row[1] }}</p>
      </div>
      <div class="outcomes-percentage-progress">
        <el-progress
          v-for="(row, index) in statistics.rows"
          :key="index"
          :class="{ 'purple': resultOutcomeId && isResultOutcome(row[0]) }"
          :text-inside="true"
          :stroke-width="20"
          :percentage="row[3] | round" />
      </div>
      <div class="outcomes-percentage-values">
        <p class="outcomes-percentage-value" v-for="(row, index) in statistics.rows" :key="index">{{ row[2] }}</p>
      </div>
    </div>
    <div class="outcomes-percentage-legend-container" v-if="statistics.rows && resultOutcomeId">
      <div><div class="dot dot-purple"></div>{{ $t('predictions.statistics.legend.wonForecast') }}</div>
      <div><div class="dot dot-yellow"></div>{{ $t('predictions.statistics.legend.otherForecasts') }}</div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
export default {
  props: ['statistics', 'resultOutcomeId'],
  methods: {
    isResultOutcome (outcomeId) {
      return outcomeId === this.resultOutcomeId
    }
  },
  filters: {
    round (value) {
      return Math.round(value)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
</style>
