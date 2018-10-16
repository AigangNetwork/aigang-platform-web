<template>
  <span>{{ getStatusString | uppercase }}</span>
</template>

<script>
import ForecastStatusMixin from '@/components/mixins/ForecastStatus'

export default {
  mixins: [ForecastStatusMixin],
  props: ['status']
}
</script>
