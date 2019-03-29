<template>
  <transition name="fade" mode="out-in" appear>
  <router-link :to="{ name: 'Policy', params: { address: policy.address, type: policy.type, id: policy.id } }" v-if="policy && policy.id">
    <div class="aig-policy-item" >
      <div class="policy-list-item-img-container">
        <InsuranceProductImage :type="policy.type" />
      </div>
      <div class="policy-list-item-content">
        <div class="policy-item-header">
          <div class="text">{{$t('insurance.policy.policyId')}}:</div>
          <div class="id">{{policy.id}}</div>
        </div>
        <div class="policy-item-body">
          <div class="policy-info-item">
            <div class="title">
              <p class="title">{{$t('insurance.policy.productAddress')}}:</p>
            </div>
            <div class="content">{{policy.address}}</div>
          </div>
          <div class="policy-info-item-date">
            <div class="title">
              <p class="title">{{$t('insurance.policy.startDate')}}:</p>
            </div>
            <div class="content">
              <Date :dateUtc="policy.startUtc" format="YYYY-MM-DD" />
            </div>
          </div>
          <div class="policy-info-item-date">
            <div class="title">
              <p class="title">{{$t('insurance.policy.endDate')}}:</p>
            </div>
            <div class="content">
              <Date :dateUtc="policy.endUtc" format="YYYY-MM-DD"/>
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
  </router-link>

  <div class="aig-policy-item placeholder-container" v-else>
    <div class="policy-list-item-img-container "> </div>
    <div class="policy-list-item-content">
      <div class="policy-item-header">
          <PlaceholderBar class="placeholder" />
      </div>
      <div class="policy-item-body">
        <div class="policy-info-item">
          <PlaceholderBar class="placeholder" />
        </div>
        <div class="policy-info-item-date">
          <PlaceholderBar class="placeholder" />
        </div>
        <div class="policy-info-item-date">
          <PlaceholderBar class="placeholder" />
        </div>
        <div class="policy-info-item-status">
          <PlaceholderBar class="placeholder" />
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import Date from '@/components/Date'
import PolicyStatus from '@/components/mixins/PolicyStatus'
import InsuranceProductImage from '@/components/insurance/InsuranceProductImage'
import PlaceholderBar from '@/components/common/PlaceholderBar'

export default {
  components: { Date, InsuranceProductImage, PlaceholderBar },
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
            color: $purple;
          }
        }
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 1024px) {
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
              margin: 2px 10px 0px 5px;
              word-wrap: break-word;
              /* max-width: calc(100% - 42px); */
              overflow: auto;
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

  .placeholder-container {
      min-height: 96px;

      .policy-list-item-content .policy-item-header .placeholder {
        margin-top: 5px;
        width: 220px;
        margin-left: 40px;
      }

      .policy-list-item-content .placeholder {
        max-height: 15px;
        width: 100%;
      }

      .policy-list-item-content .policy-info-item  {
        width: 100%;

        .placeholder{
          margin-left: 38px;
          max-height: 15px;
        }
      }

      .policy-item-body {
        margin-top: 30px;
      }

      .policy-info-item-date .placeholder, .policy-info-item-status .placeholder  {

        margin-left: 0;
      }

      .policy-info-item-date, .policy-info-item-status {
        max-width: 15%;
      }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {

    .placeholder-container {
        min-height: 275px;

        .policy-list-item-content .policy-item-header .placeholder {
          margin-top: 40px;
          width: 100%;;
          margin-left: 0px;
        }

        .policy-list-item-content .placeholder {
          max-height: 15px;
          width: 100%;
          margin: 10px;
        }

        .policy-list-item-content .policy-info-item  {

          .placeholder{
            margin-left: 0px;
            max-height: 15px;
          }
        }

        .policy-item-body {
          margin-top: 30px;
        }

        .policy-info-item-date, .policy-info-item-status  {
          width: 100%;
        }

        .policy-info-item-date .placeholder, .policy-info-item-status .placeholder  {
          margin-left: 0;
          width: 50%;
        }

        .policy-info-item-date, .policy-info-item-status {
          max-width: 100%;
        }
    }
  }

</style>
