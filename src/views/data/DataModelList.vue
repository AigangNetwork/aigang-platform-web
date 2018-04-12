<template>
  <div class="models-container">
    <h4 class="info-title">{{$t('data.dataset.model.models')}}</h4>

  </div>
</template>
<script>
export default {
  data () {
    return {
      modelsList: []
    }
  },
  methods: {
    fetchModels (dataId) {
      console.log(dataId)
      this.axios.get(`data/${dataId}/modelList`)
        .then(response => {
          console.log(response)
          this.loading = false
        }).catch(e => {
          this.loading = false
        })
    }
  },
  mounted () {
    const dataId = this.$store.state.currentDataset.id
    this.fetchModels(dataId)
  }
}
</script>
<style lang="scss" scoped>
  .models-container {
    padding: 0 54px 54px 54px;
  }
</style>
