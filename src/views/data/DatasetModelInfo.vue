<template>
  <div class="aig-container aig-view">
    <Card class="model-card">
      <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">
        <DatasetModelHeader :model="model" />
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@/components/Card'
import DatasetModelHeader from '@/components/data/DatasetModelHeader'

export default {
  components: {
    Card,
    DatasetModelHeader
  },
  data () {
    return {
      loading: false,
      model: null
    }
  },
  methods: {
    fetchModel (modelId) {
      this.loading = true

      this.axios.get(`data/model/${modelId}`)
        .then(response => {
          this.loading = false
          this.model = response.data.data
        }).catch(e => {
          this.loading = false
        })
    }
  },
  created () {
    this.fetchModel(this.$route.params.id)
  }
}

</script>
<style lang="scss">
  .model-card.aig-card {
    max-width: 932px;
    width: 100%;

    .aig-card-body {
      padding: 0 !important;

    }
  }
</style>
