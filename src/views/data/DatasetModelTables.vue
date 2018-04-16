<template>
  <div class="table-container" v-loading="loading">
    <div class="aig-dataset-info-container">
      <h4 class="info-title">{{$t('data.dataset.model.models')}}</h4>
      <PreviewTable v-for="(model, index) in models" v-if="true" :cols="model[0]" :rows="model.slice(1, model.length)" :key="index"></PreviewTable>
    </div>

  </div>
</template>

<script>
import PreviewTable from '@/components/data/DatasetPreviewTable.vue'

export default {
  props: ['requestPath'],
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
    fetchModel () {
      this.loading = true
      this.axios.get(this.requestPath)
        .then(response => {
          this.models = JSON.parse(response.data.data.model)
          this.loading = false
        }).catch(e => {
          this.loading = false
        })
    }
  },
  created () {
    this.fetchModel()
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
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
</style>
