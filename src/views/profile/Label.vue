<template>
  <span>
    <el-tag v-if="type === 'successful'" type="success">{{ $t('profile.transactions.status.success') }}</el-tag>
    <el-tag v-if="type === 'canceled'" type="danger">{{ $t('profile.transactions.status.canceled') }}</el-tag>
    <el-tag v-if="type === 'pending'" type="info">{{ $t('profile.transactions.status.pending') }}</el-tag>
    <el-tag v-if="type === 'failed'" type="danger">{{ $t('profile.transactions.status.failed') }}</el-tag>
  </span>
</template>
<script>
export default {
  name: 'Label',
  props: ['type']
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

</style>
