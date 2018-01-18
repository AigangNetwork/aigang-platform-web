<template>
  <div>
    <div class="aig__view__head">
      <div class="aig__view__title">Predictions</div>
    </div>
    <div class="aig__view__body">
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Predictions',
  data () {
    return {
      msg: 'Predictions view'
    }
  },
  mounted () {
    this.$message({
      message: 'Predictions view mounted',
      type: 'success'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
