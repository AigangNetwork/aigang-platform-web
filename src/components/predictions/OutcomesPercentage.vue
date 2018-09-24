<template>
  <div class="outcomes-percentage-container">
    <div v-for="(outcome, index) in outcomes" :key="index">
      <div class="outcome-title"> {{ outcome.name }} </div>
      <el-progress :text-inside="true" :stroke-width="24" :percentage="outcome.outcomePercentage"></el-progress>
    </div>
  </div>
</template>
<script>
export default {
  props: ['outcomes']
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .outcome-title {
    margin: 20px 0 10px 0;
    width: 100%;
    text-align: center;
  }

  .outcomes-percentage-container {
    margin-bottom: 40px;
  }
</style>
