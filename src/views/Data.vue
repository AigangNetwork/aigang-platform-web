<template>
  <div>
    <div class="aig__view__head">
      <div class="aig__view__title">Data</div>
    </div>
    <div class="aig__view__body">
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataView',
  data () {
    return {
      msg: 'Data view'
    }
  }
}
</script>
