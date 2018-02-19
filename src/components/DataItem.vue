<template>
  <div class="aig__data">
    <div class="aig__data__head">
      <el-tooltip class="item" :content="readableState" placement="top">
        <Status :status="data.state" />
      </el-tooltip>
      <div class="title">{{ data.title }}</div>
    </div>
    <div class="aig__data__body">
      <div class="desc">{{ data.description }}</div>
    </div>
    <div class="aig__data__footer">
      <!-- <el-button type="primary" size="mini">Models</el-button>
      <el-button size="mini" icon="el-icon-more" @click="$router.push({ name: 'DataInner', params: { id: data.id }})"></el-button> -->
      <router-link class="aig__data__more" :to="{ name: 'DataDetails', params: { id: data.id }}" v-if="data.state != 'created'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 341.333 341.333" style="enable-background:new 0 0 341.333 341.333;" xml:space="preserve"> <g> <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z"/> <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z"/><path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z"/></g></svg>
      </router-link>
      <span class="desc" style="margin-top: 8px">{{ $t('strings.added') }} {{ this.data.createdUtc | moment('from') }}</span>
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

.aig__data {
  @include transition;
  position: relative;
  width: 100%;
  padding: 25px 25px 20px 25px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid darken($gray, 2);
  height: 137px;
  &:hover {
    box-shadow: 0 0 30px 0 rgba($purple, 0.12);
  }
  &.aig__data--creatable {
    cursor: pointer;
    font-family: $font-secondary;
    font-size: 16px;
    font-weight: 400;
    color: $black;
    background: transparent;
    box-shadow: none;
    border: 2px dashed darken($gray, 10);
    .title, .desc {
      display: block;
      height: auto;
    }
    &:hover {
      border-color: darken($gray, 20);
      .description {
        color: $purple;
      }
    }
    &:active {
      border-color: $purple;
      background: white;
    }
  }
  .aig__data__body {
    margin-top: 7px;
  }
  .aig__data__head {
    display: flex;
    align-items: center;
    .aig__status {
      margin-top: -1px;
      &+.title {
        margin-left: 6px;
      }
    }
  }
  .aig__data__footer {
    margin-top: 20px;
    width: 100%;
    font-size: 0;
    .aig__button {
      display: block;
      width: 50%;
      border-radius: 0;
    }
    .desc {
      font-size: 12px;
    }
  }
  .aig__data__more {
    display: block;
    height: 18px;
    width: auto;
    position: absolute;
    right: 7px;
    bottom: 12px;
    svg {
      @include transition(all, 200ms, ease-in-out);
      height: 100%;
      width: auto;
      fill: darken($gray, 25);
      &:hover {
        fill: $purple;
      }
    }
  }
  .title {
    font-family: $font-secondary;
    font-weight: 500;
    font-size: 15px;
  }
  .desc {
    line-height: 1.3;
    color: darken($gray, 50);
    font-size: 13px;
    height: 33px;
    overflow: hidden;
  }
}
</style>
