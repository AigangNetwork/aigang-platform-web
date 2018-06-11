<template>
  <div class="aig-data">
    <div>
      <div class="aig-data-head">
        <div class="desc">{{ $t('data.card.added') }} {{ created }}</div>
      </div>
      <router-link :to="{ name: 'productInfo', params: { id: product.id}}">
        <div class="aig-data-head">
          <div class="title">{{ product.title | truncate(50) }}</div>
        </div>
        <div class="aig-data-body">
          <div class="desc">
            <p>{{ product.description | truncate(60) }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import CreatedDate from '@/components/mixins/CreatedDate'

export default {
  mixins: [CreatedDate],
  props: ['product'],
  data () {
    return {
      createdUtc: ''
    }
  },
  created () {
    this.createdUtc = this.product.createdUtc
  }
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
    height: 245px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    background: url('/static/android-phone.jpg');
    background-size: cover;
    opacity: 0.9;

    &::after {
      display: block;
      position: absolute;
      content: '';
      width: calc(33.3% - 21px);
      height: 244px;
      margin-left: -20px;
      margin-top: -20px;
      background: rgba(148, 75, 200, 1);
      background: linear-gradient(to bottom, rgba(148, 75, 200, 1) 0%, rgba(98, 55, 187, 1) 100%);
      z-index: -1;
      opacity: 0.85;
    }

    .aig-data-body {
      height: 100%;
      max-height: 80px;
      color: white;

      p {
        margin: 0;
        max-height: 50px;
        font-size: 14px;
        color: white;
      }
    }
    .aig-data-head {
      display: flex;
      justify-content: space-between;
      margin-top: 0;
      width: 100%;

      .title {
        color: white;
      }
    }
    .aig-data-footer {
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

      .aig-footer-container {
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
      .aig-footer-container-right {
        justify-content: right;
        @extend .aig-footer-container;
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
    }

    .status {
      padding: 10px 0;
      font-weight: 600;
    }

    .status-bubble {
      height: 15px;
      width: 15px;

      border-radius: 50%;

      &.green {
        background: #87D37C;
      }

      &.grey {
        background: #DADFE1;
      }

      &.yellow {
        background: #F4D03F;
      }

      &.green-border {
        border: 3px solid #87D37C;
      }

    }
  }

  /* Tablet */

  @media screen and (min-width: 680px) and (max-width: 1024px) {
    .aig-data .aig-data-footer .aig-footer-container-right {
      padding-left: 0px;
    }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-data {
      height: 245px;

      .aig-data-head {
        .title {
          width: 100%;
          word-wrap: break-word;
        }

      }

      .aig-data-body {
        p {
          font-size: 13px;
        }
      }
      .aig-data-footer {
        justify-content: space-between;
        .aig-footer-container-right {
          padding-left: 0;
        }
      }
    }
  }
</style>
