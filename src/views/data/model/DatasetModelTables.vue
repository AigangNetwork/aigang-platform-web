<template>
  <div class="table-container" v-loading="loading">
    <div class="aig-dataset-info-container">
      <div class="tables-container">
        <PreviewTable v-for="(model, index) in models" v-if="true" :cols="model[0]" :rows="model.slice(1, model.length)" :key="index"></PreviewTable>
      </div>
    </div>

  </div>
</template>

<script>
import PreviewTable from '@/components/data/DatasetPreviewTable.vue'

export default {

  components: {
    PreviewTable
  },
  data () {
    return {
      models: [],
      loading: false
    }
  },
  methods: {
    async fetchModel (datasetId, modelId) {
      this.loading = true

      try {
        await this.$store.dispatch('loadCurrentModel', {
          datasetId,
          modelId
        })
        this.models = JSON.parse(this.$store.state.currentModel.model)
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  },
  created () {
    this.fetchModel(this.$route.params.id, this.$route.params.modelId)
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  .tables-container {
    margin-top: 30px;
    .table-container {
      align-items: center;
      .structure-content {
        margin-bottom: 25px;
        .column-name {
          word-wrap: break-word;
          color: $active-dark-purple;
          font-weight: 600;
        }
        .column-decsription {
          word-wrap: break-word;
          font-weight: 400;
          color: $purple;
        }
        .column-datatype {
          word-wrap: break-word;
          font-weight: 400;
          color: $purple;
          text-align: right;
        }
      }
      .structure-row {
        border-bottom: 1px solid $light-grey-border;
      }
    }
  }

</style>
