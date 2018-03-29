<template>
  <div class="file-card-container">
    <div class="card-section">
      <img src="/static/dataset/csv_file_64px.svg">
      <p> {{$t('data.upload.titles.fileDetails')}} </p>
      <el-button v-if="showUploadButton" @ class="profile-button">{{ $t('data.dataset.edit.uploadNew') }}</el-button>
    </div>
    <div class="card-section">
      <div>
        <p>{{ $t('data.dataset.edit.registeredOnly') }}</p>
        <p>{{ $t('data.dataset.edit.byDefaultPublicAccess') }}</p>
      </div>
      <el-switch :value="value" @change="(value) => $emit('input', value)" :active-text="$t('data.dataset.edit.on')" :inactive-text="$t('data.dataset.edit.off')">
      </el-switch>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showUploadButton', 'value'],
  data () {
    return {
      isDatasetPrivate: false
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .file-card-container {
    width: 100%;
    border-radius: 4px;
    border: solid 1px #c8d0f1;
    .card-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px;
      &:first-child {
        border-bottom: 1px solid $light-grey-border;
      }
      p {
        display: inline;
        line-height: 32px;
        flex-grow: 1;
        color: $purple;
        font-size: 16px;
      }
      div {
        p {
          display: block;
          margin: 0 15px;
          height: 26px;
          line-height: 26px;
          &:first-child {
            font-weight: 500;
          }
          &:last-child {
            color: $dark-gray;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
