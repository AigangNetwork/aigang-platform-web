<template>
  <Card class="guest-card portfolio-card">
    <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">
      <div class="section-container">
        <div class="left-section">
          <div class="text-medium sub-section">
            <span class="image-container"><img src="/static/logo.png" alt="aigang-logo" class="aigang-logo"></span> {{
            $t('general.aix')
            }}
          </div>
          <div class="sub-section">
            <el-row class="address">
              {{ $t('pools.portfolioInfo.yourAddress') }}:
            </el-row>
            {{ $store.state.user.userWeb3.coinbase }}
          </div>
          <div class="sub-section aligned">
            <span>{{ $t('pools.portfolioInfo.yourBalance') }}</span>
            <span class="text-big">{{$store.state.user.userWeb3.aixBalance}} {{ $t('general.aix') }}</span>
          </div>
          <div class="sub-section">
            <div class="aligned">
              <span>{{ $t('pools.portfolioInfo.invested') }}</span>
              <span class="text-big-medium">{{ invested }} {{ $t('general.aix') }}</span>
            </div>
            <div class="aligned">
              <span>{{ $t('pools.portfolioInfo.claimedProfit') }}</span>
              <span class="text-big-medium">{{ claimedProfit }} {{ $t('general.aix') }}</span>
            </div>
          </div>

        </div>
        <div class="right-section">
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.totalInsuranceProducts') }}</span>
            {{ products }}
          </div>
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.totalPolicies') }}</span>
            {{ policies }}
          </div>
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.totalInvestedAmount') }}</span>
            {{ totalInvested }} {{ $t('general.aix') }}
          </div>
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.totalAmountInReserves') }}</span>
            {{ reserves }} {{ $t('general.aix') }}
          </div>
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.totalPaidForClaims') }}</span>
            {{ paid }} {{ $t('general.aix') }}
          </div>
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.totalInvestors') }}</span>
            {{ totalInvestors }}
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
      claimedProfit: 43,
      products: 6,
      policies: 123,
      totalInvested: 45,
      reserves: 1432,
      paid: 132,
      totalInvestors: 312
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .aigang-logo {
    height: 25px;
  }

  .section-container {
    color: white;
    background: $purple;
    background: $purple-gradient;
    display: flex;
    flex-direction: row;
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

  .investment-item-label {
    display: block;
    text-transform: uppercase;
    font-size: 10pt;
    font-weight: 300;
  }

  .right-section {
    padding: 53px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    div {
      min-width: 50%;
      font-size: 20pt;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: right;
    }
  }
</style>
