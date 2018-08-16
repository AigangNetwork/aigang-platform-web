<script>

export default {
computed: {
    wearLevel() {
      switch (this.data.WL) {
        case "100":
          return this.$t('insurance.policy.wearLevel.good')
        case "30":
          return this.$t('insurance.policy.wearLevel.overheated')
        case "20":
          return this.$t('insurance.policy.wearLevel.overvoltage')
        case "10":
          return this.$t('insurance.policy.wearLevel.dead')
        default:
          return '-'
      }
    }
  }
}
</script>
