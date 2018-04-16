<template>
  <div>
    <el-row class="dataset-title">
      <span class="back-button" @click="$router.go(-1)">
        <img src="@/../static/left.svg">
      </span>
      <h3>
        {{ $store.state.currentDataset.title }}
      </h3>
    </el-row>
    <el-row>
      <div class="header-left-section">
        <p>
          {{ $t('data.dataset.model.by') }} {{ model.firstName }} {{ model.lastName }}
          <span></span>
          {{ $t('data.dataset.model.lastUpdated')}}: {{ created }}
        </p>
        <h1>{{ model.title }}</h1>
      </div>
      <div class="header-right-section"></div>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  props: ['model'],
  data () {
    return {
      loading: false
    }
  },
  computed: {
    created () {
      let createdUtc = moment.utc(this.model.createdUtc)
      let result = createdUtc.from(moment().utcNow)
      return result
    }
  }

}

</script>
<style lang="scss" scoped>
  .back-button {
    height: 26px;
    width: 26px;
    margin-right: 10px;

    img {
      height: 22px;

    }
  }

  .back-button:hover {
    cursor: pointer;
  }

  .dataset-title {
    display: flex;
    align-items: center;
    padding: 35px;
    h3 {
      height: 28px;
      line-height: 26px;
      margin: 0;
    }
  }
</style>
