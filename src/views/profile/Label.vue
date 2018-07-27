<template>
  <span class="status">
    <el-tag v-if="type === 'blockchainPending'" type="info" :size="size">{{ $t('profile.transactions.status.blockchainPending') }}</el-tag>
    <el-tag v-if="type === 'blockchainSuccessful'" type="success" :size="size">{{ $t('profile.transactions.status.blockchainSuccessful') }}</el-tag>
    <el-tag v-if="type === 'blockchainFailed'" type="danger" :size="size">{{ $t('profile.transactions.status.blockchainFailed') }}</el-tag>
    <el-tag v-if="type === 'canceled'" type="warning" :size="size">{{ $t('profile.transactions.status.canceled') }}</el-tag>
    <el-tag v-if="type === 'successful'" type="success" :size="size">{{ $t('profile.transactions.status.successful') }}</el-tag>
    <el-tag v-if="type === 'failed'" type="danger" :size="size">{{ $t('profile.transactions.status.failed') }}</el-tag>
  </span>
</template>
<script>
export default {
  name: 'Label',
  props: ['type', 'size']
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .status {
    text-align: center;
    width: 100%;
    display: inline-block;

    .el-tag {
      width: 170px;
    }
  }

</style>
