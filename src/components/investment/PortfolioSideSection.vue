<template>
  <Card class="guest-card portfolio-card">
    <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">
      <div class="side-section-container">
        <div class="text-medium sub-section">
          <span class="image-container"><img src="/static/logo.png" alt="aigang-logo" class="aigang-logo"></span> {{
          $t('general.aix')
          }}
        </div>
        <div class="sub-section">
          <el-row class="address">
            {{ $t('investment.portfolioInfo.yourAddress') }}:
          </el-row>
          {{ $store.state.user.userWeb3.coinbase }}
        </div>
        <div class="sub-section aligned">
          <span>{{ $t('investment.portfolioInfo.yourBalance') }}</span>
          <span class="text-big">{{$store.state.user.userWeb3.aixBalance}}</span>
        </div>
        <div class="sub-section">
          <div class="aligned">
            <span>{{ $t('investment.portfolioInfo.invested') }}</span>
            <span class="text-big-medium">{{ invested }}</span>
          </div>
          <div class="aligned">
            <span>{{ $t('investment.portfolioInfo.claimedProfit') }}</span>
            <span class="text-big-medium">{{ claimedProfit }}</span>
          </div>
        </div>

      </div>
    </div>
  </Card>
</template>
<script>
import Card from '@/components/Card'

export default {
  components: { Card },
  data () {
    return {
      loading: false,
      invested: 223,
      claimedProfit: 43
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .aigang-logo {
    height: 25px;
  }

  .side-section-container {
    color: white;
    background: $purple;
    background: $purple-gradient;
  }

  .image-container {
    display: inline-block;
    max-width: 48px;
    overflow: hidden;
    height: 100%;
    vertical-align: middle;
  }

  .sub-section {
    max-width: 500px;
    font-family: $font-secondary;
    border-bottom: 1px solid white;
    border-right: 1px solid white;
    padding: 23px;

    &:first-child {
      padding: 43px 0 23px 23px;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .aligned {
    display: flex;
    justify-content: space-between;

    span {

      display: inline-block;
      height: 38px;
      line-height: 38px;
    }
  }

  .address {
    margin-bottom: 10px;
  }

  .text-big-medium {
    width: initial;
  }
</style>
