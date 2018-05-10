<template>
  <div class="aig-dataset-info-container">
    <div v-loading="loading">
      <h4 class="info-title">{{$t('data.upload.titles.description')}}</h4>
      <vue-markdown class="markup-content" :html="false" :source="data.description"></vue-markdown>
    </div>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  props: ['isDataset', 'isModel'],
  data () {
    return {
      data: {},
      loading: false
    }
  },
  methods: {
    async fetchData (datasetId, modelId) {
      this.loading = true
      try {
        if (this.isDataset) {
          await this.$store.dispatch('loadCurrentDataset', datasetId)
          this.data = this.$store.state.currentDataset
          this.loading = false
        } else if (this.isModel) {
          await this.$store.dispatch('loadCurrentModel', { datasetId, modelId })
          this.data = this.$store.state.currentModel
          this.loading = false
        }
      } catch (e) {
        this.loading = false
      }

      if (!this.data) {
        this.data = {}
      }
    }
  },
  mounted () {
    this.fetchData(this.$route.params.id, this.$route.params.modelId)
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  .aig-dataset-info-container {
    padding: 0px 53px 5px 53px;
    .info-title {
      color: $light-grey;
      margin-top: 40px;
      margin-bottom: 25px;
      text-transform: uppercase;
    }
    .markup-content {
      margin-bottom: 40px;

      p {
        word-wrap: break-word;
        max-width: 100%;
      }
    }
  }
</style>
