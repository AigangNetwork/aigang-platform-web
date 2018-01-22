<template>
  <div>
    <Header>
      <div class="aig__view__title" slot="title">Dashboard</div>
    </Header>
    <div class="aig__view__head">

    </div>
    <div class="aig__view__body">
      {{ $t('message.hello') }}
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'DashboardView',
  components: {
    Header
  },
  data () {
    return {
      msg: 'Dashboard view'
    }
  }
}
</script>
