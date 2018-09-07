<template>
  <div class="side-section-container">
    <el-row class="text-medium sub-section">
      <span class="image-container"><img src="/static/logo.png" alt="aigang-logo" class="aigang-logo"></span> {{ $t('general.aix')
      }}
    </el-row>

  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  .aigang-logo {
    height: 25px;
  }

  .side-section-container {
    color: white;
    background: rgba(148, 75, 200, 1);
    background: linear-gradient(to bottom, rgba(148, 75, 200, 1) 0%, rgba(98, 55, 187, 1) 100%);
  }

  .image-container {
    display: inline-block;
    max-width: 48px;
    overflow: hidden;
    height: 100%;
    vertical-align: middle;
  }

  .sub-section {
    border-bottom: 2px solid white;

    &:first-child {
      padding: 43px 0 23px 23px;
    }
  }
</style>
