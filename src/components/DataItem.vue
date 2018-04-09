<template>
  <div class="aig-data">
    <router-link :to="{ name: 'datasetInfo', params: { id: data.id}}">
      <div class="aig-data-head">
        <div class="desc">{{ $t('data.card.added') }} {{ created }}</div>
        <div v-if="data.state === 'created'" class="desc">{{ $t('data.card.notApproved') }}</div>
      </div>
      <div class="aig-data-head">
        <div class="title">{{ data.title | truncate(50) }}</div>
      </div>
      <div class="aig-data-body">
        <div class="desc">
          <p>{{ data.description | truncate(70) }}</p>
        </div>
      </div>
    </router-link>

    <div class="aig-data-footer">
      <div class="aig-footer-container">
        <img src="/static/models24px.svg" alt="models">
        <span class="label">{{ $t('data.card.models' )}}</span>
      </div>
      <div class="aig-footer-container-right">
        <img src="/static/threads24px.svg" alt="threads">
        <span class="label">{{ $t('data.card.threads' )}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Status from '@/components/Status'
import moment from 'moment'

export default {
  name: 'DataItem',
  components: {
    Status
  },
  props: {
    data: {
      required: false,
      type: Object
    }
  },
  data () {
    return {
      models: 3,
      comments: 12
    }
  },
  computed: {
    created () {
      let createdUtc = moment.utc(this.data.createdUtc)
      let result = createdUtc.from(moment().utcNow)
      return result
    }
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
    .aig-data-body {
      margin-top: 60px;
      height: 100%;
      max-height: 80px;
    }
    .aig-data-head {
      display: flex;
      justify-content: space-between;
      margin-top: 0;
      width: 100%;
      height: 20px;
    }
    .aig-data-footer {
      opacity: 0.5;
      border-top: 1px solid $light-border-blue;
      height: 40px;
      width: 100%;
      font-size: 0;
      display: flex;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      .aig-footer-container {
        justify-content: left;
        display: flex;
        width: 50%;
        height: 100%;
        .label {
          margin-top: 4px;
          margin-left: 4px;
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
    }
    .desc {
      line-height: 1.3;
      font-size: 13px;
      height: 100%;
    }
  }

  /* Tablet */

  @media screen and (min-width: 680px) and (max-width: 1024px) {
    .aig-data .aig-data-footer .aig-footer-container-right {
      padding-left: 0px;
    }

    .aig-data {
      .aig-data-head:nth-child(2) {
        margin-top: 15px;
      }
      .aig-data-body {
        margin-top: 45px;
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-data {
      height: 265px;

      .aig-data-head {
        height: 40px;
        .title {
          width: 100%;
          word-wrap: break-word;
        }
      }

      .aig-data-body {
        margin-top: 35px;
        height: 100%;
        max-height: 80px;
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
