<template>
  <div>
    <div class="aig__view__body aig__container">
      {{ $t('message.hello') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PredictionsView',
  data () {
    return {
      msg: 'Predictions view'
    }
  }
}
</script>
