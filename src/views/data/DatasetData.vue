<template>
  <div class="table-container" v-loading="loading">
    <PreviewTable v-if="validJsonPreview" :cols="cols" :rows="rows"></PreviewTable>
    <div class="invalid-preview" v-else>
      <h3>
        {{$t('data.dataset.invalidPreview')}}
      </h3>
    </div>
  </div>
</template>

<script>
import PreviewTable from '@/components/data/DatasetPreviewTable.vue'
export default {
  components: {
    PreviewTable
  },
  created () {
    this.fetchData()
  },
  data () {
    return {
      cols: [],
      rows: [],
      preview: {},
      validJsonPreview: true,
      loading: false
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      this.axios.get('data/' + this.$route.params.id).then(response => {
        this.parsePreview(response.data.data.preview)
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
  .table-container {
    display: flex;
    justify-content: center;
  }

</style>
