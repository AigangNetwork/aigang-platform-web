<template>
  <div class="header-content">
    <div class="prediction-title">{{ info.title | truncate(128) }}</div>
    <div class="info">
    </div>
  </div>
</template>

<script>
import Date from '@/components/Date'

export default {
  components: {
    Date
  },
  props: ['info']
}
</script>

<style lang="scss">
  @import '~helpers/variables';

  .header-content {
    .prediction-title {
      padding-bottom: 20px;
      font-size: 27pt;
      font-weight: 700;
      max-width: 100%;
      word-wrap: break-word;
    }

    .info {
      margin-left: 20px;
      font-family: $font-secondary;

      .icon-container {
        display: flex;
        margin-bottom: 5px;
        vertical-align: middle;

        .header-icon {
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }
      }
    }
  }
</style>
