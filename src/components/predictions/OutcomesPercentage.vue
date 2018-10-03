<template>
  <div class="outcomes-percentage">
    <div class="outcomes-percentage-chart-container">
      <div class="outcomes-percentage-titles">
        <div class="outcomes-percentage-title" v-for="(item, index) in statistics" :key="index">{{ item.name }}</div>
      </div>
      <div class="outcomes-percentage-progress">
        <el-progress v-for="(item, index) in statistics" :key="index" :class="{ 'selected': isSelectedOutcome(item.outcomeId)}" :text-inside="true" :stroke-width="20" :percentage="item.outcomePercentage | round" />
      </div>
    </div>
    <div class="outcomes-percentage-legend-container" v-if="statistics.length > 0">
      <div><div class="dot dot-purple"></div>{{ $t('predictions.statistics.legend.yourPrediction') }}</div>
      <div><div class="dot dot-yellow"></div>{{ $t('predictions.statistics.legend.otherPredictions') }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['statistics', 'selectedOutcomeId'],
  methods: {
    isSelectedOutcome (outcomeId) {
      return outcomeId === this.selectedOutcomeId
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

  .outcomes-percentage {
    margin-bottom: 20px;

    .outcomes-percentage-chart-container {
      display: flex;

      .outcomes-percentage-titles {
        flex-grow: 0;

        .outcomes-percentage-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 12px;
        }
      }

      .outcomes-percentage-progress {
        margin-left: 20px;
        flex-grow: 1;
        overflow: hidden;

        .el-progress {
          margin-bottom: 10px;
        }
      }
    }

    .outcomes-percentage-legend-container {
      float: right;
      font-size: 10pt;
      .dot {
        float: left;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 5px;
        margin-top: 2px;
      }

      .dot-purple {
        background-color: $purple;
      }

      .dot-yellow {
        background-color: $yellow;
      }
    }
  }

  @media screen and (max-width: 700px) {
    .outcomes-percentage-titles {
      max-width: 50%;
    }
  }

</style>
