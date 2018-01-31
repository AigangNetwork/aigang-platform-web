<template>
  <div class="aig__data" v-if="!creatable">
    <div class="aig__data__head">
      <el-tooltip class="item" content="Pending" placement="top">
        <Status />
      </el-tooltip>
      <div class="title">{{ data.title }}</div>
    </div>
    <div class="aig__data__body">
      <div class="desc">{{ data.description }}</div>
    </div>
    <div class="aig__data__footer">
      <el-button type="primary" size="mini">Models</el-button>
      <el-button size="mini" icon="el-icon-more" @click="$router.push({ name: 'DataInner', params: { id: data.id }})"></el-button>
      <span class="desc" style="margin-top: 8px">Added {{ this.data.createdUtc | moment('from') }}</span>
    </div>
  </div>
  <button class="aig__data aig__data--creatable" @click="$emit('click', $event.target.value)" v-else>
    <span class="title">{{ $t('actions.upload_new_data') }}</span>
    <span class="desc">Lorem ipsum dolar sit amet</span>
  </button>
</template>

<script>
import Status from '@/components/Status'

export default {
  name: 'DataItem',
  components: {
    Status
  },
  props: {
    creatable: {
      type: Boolean,
      required: false,
      default: false
    },
    data: {
      required: false,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__data {
  @include transition;
  width: 100%;
  padding: 25px 25px 20px 25px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid darken($gray, 2);
  height: 145px;
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
    margin-top: 15px;
    width: 100%;
    font-size: 0;
    .aig__button {
      display: block;
      width: 50%;
      border-radius: 0;
    }
    .desc {
      margin-left: 10px;
      font-size: 12px;
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
