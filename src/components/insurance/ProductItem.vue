<template>
  <div class="aig-product-data" :class="{ disabled: !isCampaignRunning }" v-if="product && product.address">
    <router-link :to="{ name: 'Product', params: { address: product.address, type: product.type }}">
      <div class="aig-product-data-body-container">

        <div class="aig-product-data-head" v-if="!isCampaignRunning && isCampaignNotStartedYet">
          <div class="desc date">{{ $t('insurance.product.productWillStart') }}
            <Date :dateUtc="product.startDateUtc" />
          </div>
        </div>

        <div class="aig-product-data-head" v-else-if="isCampaignRunning">
          <div class="desc date">{{ $t('insurance.product.productEnds') }}
            <Date :dateUtc="product.endDateUtc" />
          </div>
        </div>

        <div class="aig-product-data-head" v-else-if="!isCampaignRunning">
          <div class="desc">{{ $t('insurance.product.productEnded') }}</div>
        </div>

        <div class="aig-product-ata-head" v-else>
          <div class="desc">{{ $t('insurance.product.productClosed') }}</div>
        </div>

        <div class="aig-product-data-head">
          <div class="title">{{ product.title | truncate(50) }}</div>
        </div>
        <div class="aig-product-data-body">
          <InsuranceProductImage :type="product.type" />
          <div class="premium-container">
            <p>{{ $t('insurance.product.basePremium') }}:</p>
            <p class="premium-amount">{{ product.basePremium }}</p>
            <p>{{ $t('general.aix') }}</p>
          </div>
        </div>
      </div>
    </router-link>

  </div>

  <div class="aig-product-data placeholder-container" v-else>
      <div class="aig-product-data-body-container">

        <div class="aig-product-data-head">
          <div class="desc date"><PlaceholderBar class="placeholder" />
          </div>
        </div>

        <div class="aig-product-data-head">
          <div class="title"><PlaceholderBar class="placeholder" /></div>
        </div>
        <div class="aig-product-data-body">
          <div class="premium-container">
            <PlaceholderBar class="placeholder" />
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import Date from '@/components/Date'
import InsuranceProductImage from '@/components/insurance/InsuranceProductImage'
import PlaceholderBar from '@/components/common/PlaceholderBar'

export default {
  components: { Date, InsuranceProductImage, PlaceholderBar },
  props: ['product'],
  computed: {
    isCampaignRunning () {
      const currentDate = moment.utc()
      const campaignStartDate = moment.utc(this.product.startDateUtc)
      const campaignEndDate = moment.utc(this.product.endDateUtc)
      return currentDate.isAfter(campaignStartDate) && currentDate.isBefore(campaignEndDate)
    },
    isCampaignNotStartedYet () {
      const currentDate = moment.utc()
      const campaignStartDate = moment.utc(this.product.startDateUtc)

      return currentDate.isBefore(campaignStartDate)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .aig-product-data {
    @include transition;
    box-shadow: 0 0 30px 0 #e9f0f6;
    border: 1px solid $light-border-blue;
    height: 440px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    background: rgba(148, 75, 200, 1);
    background: linear-gradient(to bottom, rgba(148, 75, 200, 1) 0%, rgba(98, 55, 187, 1) 100%);
    transition: all 250ms;

    &.enabled:hover {
      margin: -4px 4px 4px -4px;
      box-shadow: 10px 10px 23px -13px rgba(0, 0, 0, 0.75);
      border: 1px solid transparent;
    }

    &.disabled {
      opacity: 0.6;
      filter: grayscale(100%);
    }

    .aig-product-data-body-container {
      padding: 20px;
    }

    .aig-product-data-body {
      flex-grow: 1;

      p {
        margin: 0;
        max-height: 50px;
        font-size: 14px;
        color: white;
      }
    }

    .aig-product-data-head {
      display: flex;
      justify-content: space-between;
      margin-top: 0;
      width: 100%;

      .title {
        text-align: center;
        color: white;
        width: 100%;
        padding: 10px 0;
        height: 72px;
      }
    }

    .aig-product-data-footer {
      border-top: 1px solid $light-border-blue;
      height: 40px;
      width: 100%;
      font-size: 0;
      display: flex;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      height: 30px;
      background: white;

      .aig-product-footer-container {
        justify-content: left;
        display: flex;
        width: 50%;
        height: 100%;

        .label {
          font-family: $font-secondary;
          margin-left: 2px;
          display: flex;

          span {
            margin-left: 2px;
          }
        }
      }
      .aig-product-footer-container-right {
        justify-content: right;
      }
    }

    .title {
      font-family: $font-primary;
      color: $purple;
      font-weight: 600;
      font-size: 17pt;
      word-wrap: break-word;
      max-width: 100%;
    }

    .desc {
      min-height: 20px;
      line-height: 1.3;
      font-size: 13px;
      word-wrap: break-word;
      max-width: 100%;
      color: white
    }
  }

  .product-img {
    height: 200px;
    margin: 20px auto;
    display: block;
    margin-top: 1;
  }

  .premium-container {
    margin-top: 20px;

    p {
      width: 100%;
      text-align: center;
      margin: 0;
      line-height: 1;
    }

    p.premium-amount {
      font-size: 36px;
      font-weight: 500;
    }
  }

  .desc.date {
    font-family: $font-secondary;
  }

  @media screen and (min-width: 680px) and (max-width: 1024px) {
    .aig-product-data {
      height: 480px;

      .aig-product-data-footer .aig-product-footer-container-right {
        padding-left: 0px;
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-product-data {
      height: 430px;

      .aig-product-data-head .title {
        width: 100%;
        word-wrap: break-word;
      }

      .aig-product-data-body p {
        font-size: 13px;
      }

      p.premium-amount {
        font-size: 36px;
        font-weight: 500;
      }

      .aig-product-data-footer {
        justify-content: space-between;

        .aig-product-footer-container-right {
          padding-left: 0;
        }
      }

      .product-img {
        height: 150px;
      }

    }
  }

  .placeholder-container.aig-product-data {
    background: white;

    .desc.date {
      margin: 0 auto;

      .placeholder {
        max-height: 15px;
        max-width: 70%;
      }
    }

    .premium-container {
      margin-top: 90%;

      .placeholder {
        margin: 10px auto;
        max-width: 50%;
      }
    }
  }
</style>
