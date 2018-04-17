<template>
  <div class="models-container" v-loading="loading">
    <h4 class="info-title">{{$t('data.dataset.model.models')}}</h4>
    <DatasetModelCard v-for="(model, index) in modelsList" :model="model" :key="index" />
  </div>
</template>
<script>
import DatasetModelCard from '@/components/data/model/DatasetModelCard'

export default {
  components: {
    DatasetModelCard
  },
  props: ['requestPath'],
  data () {
    return {
      loading: false,
      modelsList: []
    }
  },
  methods: {
    fetchModels (dataId) {
      this.loading = true
      this.axios.get(this.requestPath)
        .then(response => {
          this.modelsList = response.data.items
          this.loading = false
        }).catch(e => {
          this.loading = false
        })
    }
  },
  mounted () {
    this.fetchModels(this.$route.params.id)
  }
}
</script>
<style lang="scss" scoped>
  .models-container {
    padding: 0 54px 54px 54px;
  }
</style>
