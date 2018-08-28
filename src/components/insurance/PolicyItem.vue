<template>
  <div class="aig-policy-item">
    <div class="policy-list-item-img-container">
      <img class="product-img" :src="policy.productImg">
    </div>
    <div class="policy-list-item-content">
      <div class="policy-item-header">
        <div class="text">{{$t('insurance.policy.policyId')}}:</div>
        <div class="id">{{policy.id}}</div>
      </div>
      <div class="policy-item-body">
        <div class="policy-info-item">
          <div class="title">
            <p class="title">{{$t('insurance.policy.deviceId')}}:</p>
          </div>
          <div class="content">{{policy.deviceId}}</div>
        </div>
        <div class="policy-info-item-date">
          <div class="title">
            <p class="title">{{$t('insurance.policy.startDate')}}:</p>
          </div>
          <div class="content">
            <Date :dateUtc="policy.startUtc" />
          </div>
        </div>
        <div class="policy-info-item-date">
          <div class="title">
            <p class="title">{{$t('insurance.policy.endDate')}}:</p>
          </div>
          <div class="content">
            <Date :dateUtc="policy.endUtc" />
          </div>
        </div>
        <div class="policy-info-item-status">
          <div class="title">
            <p class="title">{{$t('insurance.policy.status')}}:</p>
          </div>
          <div class="content">{{ status | uppercase }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Date from '@/components/Date'
import PolicyStatus from '@/components/mixins/PolicyStatus'

export default {
  components: {
    Date
  },
  mixins: [PolicyStatus],
  props: ['policy']
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  .aig-policy-item {
    width: 85%;
    background: white;
    margin: 0px 25px 0px 25px;
    box-shadow: 0 0 30px 0 #e9f0f6;
    border: 1px solid #e5f0ff;
    display: flex;

    .policy-list-item-img-container {
      background: rgba(148, 75, 200, 1);
      background: linear-gradient(to bottom, rgba(148, 75, 200, 1) 0%, rgba(98, 55, 187, 1) 100%);
      display: inline-block;

      .product-img {
        padding: 7px;
        width: 80px;
        height: 80px;
        margin-top: 10px;
      }
    }

    .policy-list-item-content {
      width: 100%;
      .policy-item-header {
        display: flex;
        margin: 12px 12px 5px 10px;
        color: $purple;
        font-size: 12pt;
        word-wrap: break-word;
        max-width: 100%;
        .id {
          font-family: "Roboto", sans-serif;
          font-weight: 300;
        }
        .text {
          margin-right: 10px;
          font-family: $font-primary;
          word-wrap: break-word;
          font-weight: 600;
        }
      }

      .policy-item-body {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;

        .policy-info-item,
        .policy-info-item-date,
        .policy-info-item-status {
          padding: 0px 15px 0px 15px;

          .title {
            color: #9eb1c7;
            font-weight: 300;
            font-size: 11pt;
            word-wrap: break-word;
            max-width: 100%;
            margin-bottom: 5px;
            p {
              margin: 0px
            }
          }

          .content {
            font-family: "Roboto", sans-serif;
            font-weight: 300;
          }
        }
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 765px) {
    .aig-policy-item {
      .policy-list-item-img-container {
        .product-img {
          padding: 4px;
          width: 60px;
          margin-top: 30px;
        }
      }

      .policy-list-item-content {
        overflow: hidden;
        .policy-item-header {
          font-size: 10pt;
          .id {
            overflow: auto;
          }
        }

        .policy-item-body {
          display: block;
          padding-bottom: 5px;

          .policy-info-item,
          .policy-info-item-date,
          .policy-info-item-status {
            margin-left: 12px;
            display: flex;
            padding: 0px;

            .title,
            .content {
              font-size: 10pt !important;
            }

            .content {
              margin: 2px 0px 0px 5px;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 465px) {
    .aig-policy-item {
      flex-direction: column;

      .policy-list-item-img-container {
        text-align: center;

        .product-img {
          padding: 8px;
          width: 100px;
          margin-top: 10px;
        }
      }
    }
  }
</style>
