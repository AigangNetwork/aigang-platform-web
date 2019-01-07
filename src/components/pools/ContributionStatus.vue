<template>
  <span v-if="status === 'pendingPayment'"> {{ $t('pools.poolContributionStatuses.pendingPayment') }} </span>
  <span v-else-if="status === 'paid'"> {{ $t('pools.poolContributionStatuses.paid') }} </span>
  <span v-else-if="status === 'canceled'">
    {{ $t('pools.poolContributionStatuses.canceled') }}
    <el-tooltip :content="$t('pools.contribution.explanations.canceled')"> <i class="el-icon-info"></i> </el-tooltip>
  </span>
  <span v-else-if="status === 'availablePayout'"> {{ $t('pools.poolContributionStatuses.availablePayout') }} </span>
  <span v-else-if="status === 'pendingPayout'"> {{ $t('pools.poolContributionStatuses.pendingPayout') }} </span>
  <span v-else-if="status === 'rewardPaidout'"> {{ $t('pools.poolContributionStatuses.rewardPaidout') }} </span>
  <span v-else-if="status === 'availableRefund'">{{ $t('pools.poolContributionStatuses.availableRefund') }}</span>
  <span v-else-if="status === 'refundPaidout'">{{ $t('pools.poolContributionStatuses.refundPaidout') }}</span>
</template>

<script>
export default {
  props: ['status']
}
</script>
