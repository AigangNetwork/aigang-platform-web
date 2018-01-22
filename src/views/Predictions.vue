<template>
  <div>
    <Header>
      <div class="aig__view__title" slot="title">Predictions</div>
    </Header>
    <div class="aig__view__body aig__container">
      {{ $t('message.hello') }}
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'PredictionsView',
  components: {
    Header
  },
  data () {
    return {
      msg: 'Predictions view'
    }
  }
}
</script>
