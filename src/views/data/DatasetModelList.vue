<template>
  <div class="models-container" v-loading="loading">
    <h4 class="info-title">{{$t('data.dataset.model.models')}}</h4>
    <DatasetModelCard v-for="(model, index) in modelsList" :model="model" :key="index" />
  </div>
</template>
<script>
import DatasetModelCard from '@/components/data/DatasetModelCard'

export default {
  components: {
    DatasetModelCard
  },
  data () {
    return {
      loading: false,
      modelsList: []
    }
  },
  methods: {
    fetchModels (dataId) {
      this.loading = true
      this.axios.get(`data/${dataId}/modelList`)
        .then(response => {
          this.modelsList = response.data.items
          this.$store.dispatch('setDatasetModels', { models: this.modelsList })
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
