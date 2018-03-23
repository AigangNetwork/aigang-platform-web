<template>
  <div class="aig-dataset-info-container">
    <div v-loading="loading">
      <h4 class="info-title">{{$t('data.upload.titles.description')}}</h4>
      <div class="info-content">{{dataset.description}}</div>
      <div class="structure-content">
        <h4 class="info-title">{{$t('data.upload.titles.structure')}}</h4>
        <el-row v-if="isValidJson" class="structure-row" :gutter="20" type="flex" v-for="column in structure" :key="column.name">
          <el-col :span="10">
            <div>
              <h5 class="column-name">{{column.name}}</h5>
            </div>
          </el-col>
          <el-col>
            <h5 class="column-decsription">{{column.description}}</h5>
          </el-col>
          <el-col class="column-decsription" :span="10">
            <h5>{{column.dataType}}</h5>
          </el-col>
        </el-row>
        <el-row v-if="!isValidJson">
          <div class="info-content">
            {{dataset.structure}}
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataset: {},
      structure: [],
      loading: false,
      isValidJson: false
    }
  },
  mounted () {
    this.fetchDataset()
  },
  methods: {
    fetchDataset () {
      this.loading = true
      this.axios.get('/data/' + this.$route.params.id).then(response => {
        this.dataset = response.data.data
        if (this.isJson(this.dataset.structure)) {
          this.structure = JSON.parse(this.dataset.structure)
          this.isValidJson = true
        } else {
          this.isValidJson = false
        }
        this.loading = false
      })
    },
    isJson (str) {
      try {
        JSON.parse(str)
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
  .aig-dataset-info-container {
    padding: 0px 53px 5px 53px;
    .info-title {
      color: $light-grey;
      margin-top: 40px;
      margin-bottom: 25px;
      text-transform: uppercase;
    }
    .info-content {
      word-wrap: break-word;
      color: $purple;
    }
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
    }
    .structure-row {
      border-bottom: 1px solid $light-grey-border;
    }
  }
</style>
