<template>
  <div>
    <div class="aig__view__head">
      <div class="aig__view__title">Dashboard</div>
    </div>
    <div class="aig__view__body">
      {{ msg }}
      <Button :color="'green'">qwe</Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
export default {
  name: 'DashboardView',
  data () {
    return {
      msg: 'Dashboard view'
    }
  },
  components: {
    Button
  }
}
</script>
