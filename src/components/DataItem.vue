<template>
  <div class="aig__data">
    <div class="aig__data__head">
      <el-tooltip class="item" content="Top Left prompts info">
        <Status :status="'active'"/>
      </el-tooltip>
      <div class="title">Samsung Galaxy Tab 3</div>
    </div>
    <div class="aig__data__body">
      <div class="desc">Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc pharetra faucibus tellus.</div>
    </div>
    <div class="aig__data__footer">
      <Button>Details</Button>
      <Button>Models</Button>
    </div>
  </div>
</template>

<script>
import Status from '@/components/Status'
import Button from '@/components/Button'

export default {
  name: 'DataItem',
  components: {
    Status,
    Button
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__data {
  width: 100%;
  padding: 25px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  float: left;
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
    display: flex;
    width: 100%;
    .aig__button {
      display: block;
      width: 50%;
      border-radius: 0;
      &:first-child {
        margin-right: 1px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        margin-left: 1px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
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
  }
}
</style>
