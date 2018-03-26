<template>
  <div class="aig-data" :class="{'aig-non-approved-data': data.state === 'created'}">
    <router-link :to="{ name: 'datasetInfo', params: { id: data.id}}" :class="{'aig-link-disabled': data.state === 'created'}">
      <div class="aig-data-head">
        <div class="desc">{{ $t('strings.added') }} {{ this.data.createdUtc | moment('from') }}</div>
        <div v-if="data.state === 'created'" class="desc">{{ $t('strings.notApproved') }}</div>
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
    readableState () {
      if (this.data.state === 'active') {
        return this.$t('status.active')
      } else if (this.data.state === 'closed') {
        return this.$t('status.closed')
      } else {
        return this.$t('status.pending')
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';
  .aig-non-approved-data {
    opacity: 0.5;
  }

  .aig-data {
    @include transition;
    padding: 20px;
    background: white;
    box-shadow: 0 0 30px 0 #e9f0f6;
    border: 1px solid $light-border-blue;
    height: 245px;
    .aig-data-body {
      margin-top: 7px;
      height: 100%;
      max-height: 80px;
    }
    .aig-data-head {
      display: flex;
      justify-content: space-between;
      height: 40px;
      margin-top: 0;
      width: 100%;
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
  }

  @media screen and (min-width: 100px) and (max-width: 380px) {
    .aig-data {
      height: 265px;
      .aig-data-head {
        .title {
          width: 100%;
          word-wrap: break-word;
        }
      }
      .aig-data-footer {
        flex-direction: column;
        .aig-footer-container-right {
          width: 100%;
          padding-left: 0;
        }
      }
    }
  }
</style>
