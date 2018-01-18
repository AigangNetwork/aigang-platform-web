<template>
  <div>
    <div class="aig__view__head">
      <div class="aig__view__title">Data</div>
    </div>
    <div class="aig__view__body">
      <div class="aig__datas">
        <DataItem/>
        <DataItem/>
        <DataItem/>
      </div>
    </div>
  </div>
</template>

<script>
import DataItem from '@/components/DataItem'

export default {
  name: 'DataView',
  components: {
    DataItem
  },
  data () {
    return {
      msg: 'Data view'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/mixins';
.aig__datas {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > .aig__data {
    flex-basis: calc(33.333% - 15px);
  }
}
</style>
