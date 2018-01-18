<template>
  <div>
    <div class="aig__view__head">
      <div class="aig__view__title">Insure</div>
    </div>
    <div class="aig__view__body">
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InsureView',
  data () {
    return {
      msg: 'Insure view'
    }
  },
  mounted () {
    this.$message({
      message: 'Insure view mounted',
      type: 'success'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
