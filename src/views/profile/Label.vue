<template>
  <span>
    <el-tag v-if="type === '2'" type="success">{{ $t('profile.transactions.status.success') }}</el-tag>
    <el-tag v-if="type === '1'" type="danger">{{ $t('profile.transactions.status.rejected') }}</el-tag>
    <el-tag v-if="type === '0'" type="info">{{ $t('profile.transactions.status.pending') }}</el-tag>
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
