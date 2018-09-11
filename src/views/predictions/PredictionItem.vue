<template>
  <router-link :to="{ name: 'PredictionInfo', params: { id: item.id}}">
    <div class="aig-data">
        <div class="aig-data-body">
          <div class="title">
            <h3>{{ item.title | truncate(50) }}</h3>
          </div>
          <div class="info">
            <p>{{ $t('predictions.predictions.forecastTill') }}: <Date :dateUtc="item.endDateUtc" /></p>
            <p>{{ $t('predictions.predictions.poolSize') }}: {{item.poolSize }} {{ $t('general.aix') }}</p>
          </div>
        </div>
    </div>
  </router-link>
</template>

<script>
import Date from '@/components/Date'

export default {
  components: {
    Date
  },
  props: ['item']
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .aig-data {
    @include transition;
    padding: 20px;
    background: white;
    box-shadow: 0 0 30px 0 #e9f0f6;
    border: 1px solid $light-border-blue;
    height: 350px;
    justify-content: space-between;
    margin-left: 10px;
    margin-right: 10px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 150px;
    background-image: url('/static/balance.svg');

    .aig-data-body {
      height: 100%;
      display: flex;
      flex-direction: column;

      .title {
        flex-grow: 1;
        h3 {
          margin: 0;
        }
      }

      .info {
        flex-grow: 0;
      }

      p {
        margin: 0;
        font-size: 14px;
        color: $dark-gray;
      }
    }
  }

</style>
