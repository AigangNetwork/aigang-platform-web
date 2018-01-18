<template>
  <div>
    <div class="aig__view__head">
      <div class="aig__view__title">Dashboard</div>
    </div>
    <div class="aig__view__body">
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data () {
    return {
      msg: 'Dashboard view'
    }
  }
}
</script>
