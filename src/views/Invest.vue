<template>
  <div>
    <Header class="aig__view__head">
      <div class="aig__view__title" slot="title">Invest</div>
    </Header>
    <div class="aig__view__body aig__container">
      {{ $t('message.hello') }}
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'InvestView',
  components: {
    Header
  },
  data () {
    return {
      msg: 'Invest view'
    }
  }
}
</script>
