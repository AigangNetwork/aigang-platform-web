<template>
  <div>
    <div class="aig__view__head">
      <div class="aig__view__title">Invest</div>
    </div>
    <div class="aig__view__body">
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvestView',
  data () {
    return {
      msg: 'Invest view'
    }
  },
  mounted () {
    this.$message({
      message: 'Invest view mounted',
      type: 'success'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
