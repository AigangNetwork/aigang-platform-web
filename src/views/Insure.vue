<template>
  <div>
    <Header class="aig__view__head">
      <div class="aig__view__title" slot="title">Insure</div>
    </Header>
    <div class="aig__view__body aig__container">
      {{ $t('message.hello') }}
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'InsureView',
  components: {
    Header
  },
  data () {
    return {
      msg: 'Insure view'
    }
  }
}
</script>
