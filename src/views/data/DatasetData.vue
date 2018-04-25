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
          <el-col :span="24">
            <div>
              <h5 class="column-name">{{column.name || truncate(15) }}</h5>
            </div>
          </el-col>
          <el-col>
            <h5 class="column-decsription">{{column.description | truncate(15) }}</h5>
          </el-col>
          <el-col class="column-datatype" :span="24">
            <h5>{{column.dataType}}</h5>
          </el-col>
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
        <h3>
          {{$t('data.dataset.invalidPreview')}}
        </h3>
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
  props: ['requestPath'],
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
    fetchData () {
      this.loading = true
      this.axios.get(this.requestPath).then(response => {
        this.parsePreview(response.data.data.preview)
        this.dataset = response.data.data

        if (this.isJson(this.dataset.structure)) {
          this.structure = JSON.parse(this.dataset.structure)
          this.isValidJson = true
        } else {
          this.isValidJson = false
        }
      })
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
