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
  data () {
    return {
      dataset: {},
      loading: false
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
        this.loading = false
      })
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
    .markup-content {
      margin-bottom: 40px;
    }
  }

</style>
