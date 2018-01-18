<template>
  <div>
    <div class="aig__view__head">
      <div class="aig__view__title">Data</div>
    </div>
    <div class="aig__view__body">
      <div class="aig__datas">
        <Data/>
        <Data/>
        <Data/>
      </div>
    </div>
  </div>
</template>

<script>
import Data from '@/components/Data'

export default {
  name: 'DataView',
  components: {
    Data
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
