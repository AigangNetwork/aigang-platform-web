<template>
  <div class="aig-dataset-info-container">
    <div v-loading="loading">
      <h4 class="info-title">{{$t('data.upload.titles.description')}}</h4>
      <vue-markdown class="markup-content" :html="false" :source="dataset.description"></vue-markdown>
    </div>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  props: ['requestPath'],
  data () {
    return {
      dataset: {},
      loading: false
    }
  },
  watch: {
    data (val) {
      if (this.useData) {
        this.dataset = val
      }
    }
  },
  methods: {
    fetchDataset () {
      this.loading = true
      this.axios.get(this.requestPath)
        .then(response => {
          this.dataset = response.data.data
          this.loading = false
        }).catch(e => {
          this.loading = false
        })
    }
  },
  created () {
    this.fetchDataset()
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
