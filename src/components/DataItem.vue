<template>
  <div class="aig-data">
    <div class="aig-data-head">
      <div>
        <span class="desc">{{ $t('strings.added') }} {{ this.data.createdUtc | moment('from') }}</span>
      </div>
    </div>
    <div class="aig-data-head">
      <el-tooltip class="item" :content="readableState" placement="top">
      </el-tooltip>
      <div class="title">{{ data.title }}</div>
    </div>
    <div class="aig-data-body">
      <div class="desc">
        <p>{{ data.description }}</p>
      </div>
    </div>

    <div class="aig-data-footer">
      <!-- <router-link class="aig-data-more" :to="{ name: 'DataDetails', params: { id: data.id }}" v-if="data.state != 'created'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 341.333 341.333" style="enable-background:new 0 0 341.333 341.333;" xml:space="preserve"> <g> <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z"/> <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z"/><path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z"/></g></svg>
      </router-link> -->
      <div class="aig-footer-contrainer">
        <img src="/static/card/models24px.svg" alt="models">
        <span class="label">{{ $t('data.card.models' )}} {{models}}</span>
      </div>
      <div class="aig-footer-container-right">
        <img src="/static/card/threads24px.svg" alt="threads">
        <span class="label">{{ $t('data.card.threads' )}} {{comments}}</span>
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
      align-items: center;
      height: 40px;
      margin-top: 0;
    }
    .aig-data-footer {
      border-top: 1px solid $light-border-blue;
      height: 40px;
      width: 100%;
      font-size: 0;
      display: flex;
      padding-top: 5px;
      .aig-footer-contrainer {
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
        @extend .aig-footer-contrainer;
        padding-left: 15px;
      }
    }
    .title {
      font-family: $font-primary;
      color: $purple;
      font-weight: 600;
      font-size: 17pt;
    }
    .desc {
      p {
        color: $light-grey;
        font-size: 14px;
      }
      line-height: 1.3;
      font-size: 13px;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
