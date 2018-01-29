<template>
  <div>
    <div class="aig__view__body aig__container">
      {{ $t('strings.hello') }}
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
