<template>
  <div class="table-container" v-loading="loading">
    <div class="aig-dataset-info-container">
      <div v-if="dataset.remoteFileAccessPoint">
        <h4 class="info-title">{{$t('data.upload.titles.remoteFileAccessPoint')}}</h4>
        <div>
          {{dataset.remoteFileAccessPoint}}
        </div>
      </div>
      <div class="structure-content">
        <h4 class="info-title">{{$t('data.upload.titles.structure')}}</h4>
        <el-row v-if="isValidJson" class="structure-row" :gutter="20" type="flex" v-for="column in structure" :key="column.name">
          <div class="column-name">
            <h5>{{column.name}}</h5>
          </div>
          <div class="column-description">
            <h5>{{column.description}}</h5>
          </div>
          <div class="column-datatype">
            <h5>{{column.dataType}}</h5>
          </div>
        </el-row>
        <el-row v-if="!isValidJson">
          <div class="info-content">
            {{dataset.structure}}
          </div>
        </el-row>
      </div>
      <h4 class="info-title">{{$t('data.upload.titles.preview')}}</h4>
      <PreviewTable v-if="validJsonPreview" :cols="cols" :rows="rows"></PreviewTable>
      <div class="invalid-preview" v-else>
        {{$t('data.dataset.invalidPreview')}}
      </div>
    </div>
  </div>
</template>

<script>
import PreviewTable from '@/components/data/dataset/DatasetPreviewTable.vue'
export default {
  components: {
    PreviewTable
  },
  props: ['isDataset', 'isModel'],
  created () {
    this.fetchData()
  },
  data () {
    return {
      cols: [],
      rows: [],
      dataset: {},
      preview: {},
      validJsonPreview: true,
      loading: false,
      structure: [],
      isValidJson: false
    }
  },
  methods: {
    async fetchData () {
      this.loading = true

      if (this.isDataset) {
        try {
          await this.$store.dispatch('loaddataset', this.$route.params.id)
          this.dataset = this.$store.state.dataset
        } catch (e) {
          this.loading = false
        }
      }

      if (this.isModel) {
        try {
          await this.$store.dispatch('loaddataset', this.$route.params.id)
          this.dataset = this.$store.state.dataset
        } catch (e) {
          this.loading = false
        }
      }

      this.parsePreview(this.dataset.preview)
      if (this.isJson(this.dataset.structure)) {
        this.structure = JSON.parse(this.dataset.structure)
        this.isValidJson = true
      } else {
        this.isValidJson = false
      }
      this.loading = false
    },
    parsePreview (preview) {
      if (this.isJson(preview)) {
        var tempPreview = JSON.parse(preview)
        this.cols = tempPreview[0]
        this.rows = tempPreview.slice(1, tempPreview.length)
        this.validJsonPreview = true
        this.loading = false
        return
      }
      this.preview = preview
      this.validJsonPreview = false
      this.loading = false
    },
    isJson (obj) {
      try {
        JSON.parse(obj)
      } catch (e) {
        return false
      }
      return true
    }
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
        width: 15%;
        min-width: 50px;

        h5 {
          word-wrap: break-word;
          color: $active-dark-purple;
          font-weight: 600;
        }
      }

      .column-description {
        width: 70%;

        h5 {
          word-wrap: break-word;
          font-weight: 400;
          color: $purple;
        }
      }

      .column-datatype {
        word-wrap: break-word;
        font-weight: 400;
        color: $purple;
        text-align: right;
        width: 15%;
        min-width: 50px;
      }
    }

    .structure-row {
      border-bottom: 1px solid $light-grey-border;
      width: 100%;

      >div {
        padding: 0 10px;
      }
    }
  }

  .invalid-preview {
    margin-bottom: 20px;
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .table-container .structure-row>div {
      padding: 0 5px;
    }
  }

</style>
