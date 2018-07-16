<template>
  <div class="aig-policy-item">
    <div class="policy-list-item-img-container">
      <img class="product-img" :src="policy.productImg">
    </div>
    <div class="policy-list-item-content">
      <div class="policy-item-header">
        <div class="text">
          {{$t('insurance.policy.policyId')}}
        </div>
        <div class="id">
          {{policy.id}}
        </div>
      </div>
      <div class="policy-item-body">
        <div class="policy-info-item">
          <div class="title">
            <p class="title">{{$t('insurance.policy.deviceId')}}</p>
          </div>
          <div class="content">
            {{policy.deviceId}}
          </div>
        </div>
        <div class="policy-info-item">
          <div class="title">
            <p class="title">{{$t('insurance.policy.startDate')}}</p>
          </div>
          <div class="content">
            {{policy.startUtc ? policy.startUtc : 'N/A'}}
          </div>
        </div>
        <div class="policy-info-item">
          <div class="title">
            <p class="title">{{$t('insurance.policy.endDate')}}</p>
          </div>
          <div class="content">
            {{policy.endUtc ? policy.endUtc : 'N/A'}}
          </div>
        </div>
        <div class="policy-info-item">
          <div class="title">
            <p class="title">{{$t('insurance.policy.status')}}</p>
          </div>
          <div class="content">
            {{policy.status}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    policy: {
      required: true
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  .aig-policy-item {
    height: 100px;
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
      vertical-align: middle;
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
        margin: 12px 0px 5px 10px;
        color: $purple;
        font-size: 12pt;
        word-wrap: break-word;
        max-width: 100%;
        .id {
          font-family: "Roboto", sans-serif;
          font-weight: 300;
        }
        .text {
          margin-right: 5px;
          font-family: $font-primary;
          font-weight: 600;
        }
      }
      .policy-item-body {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .policy-info-item {
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

</style>
