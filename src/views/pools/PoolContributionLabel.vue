<template>
  <span class="status">
    <el-tag v-if="type === 'pendingPayment'" type="info" :size="size">{{ $t('pools.poolContributionStatuses.pendingPayment') }}</el-tag>
    <el-tag v-else-if="type === 'paid'" type="success" :size="size">{{ $t('pools.poolContributionStatuses.paid') }}</el-tag>
    <el-tag v-else-if="type === 'canceled'" type="danger" :size="size">{{ $t('pools.poolContributionStatuses.canceled') }}</el-tag>
    <el-tag v-else-if="type === 'availablePayout'" type="info" :size="size">{{ $t('pools.poolContributionStatuses.availablePayout') }}</el-tag>
    <el-tag v-else-if="type === 'pendingPayout'" type="info" :size="size">{{ $t('pools.poolContributionStatuses.pendingPayout') }}</el-tag>
    <el-tag v-else-if="type === 'rewardPaidout'" type="success" :size="size">{{ $t('pools.poolContributionStatuses.rewardPaidout') }}</el-tag>
    <el-tag v-else-if="type === 'availableRefund'" type="danger" :size="size">{{ $t('pools.poolContributionStatuses.availableRefund') }}</el-tag>
    <el-tag v-else-if="type === 'refundPaidout'" type="success" :size="size">{{ $t('pools.poolContributionStatuses.refundPaidout') }}</el-tag>
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
