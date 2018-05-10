<template>
  <div class="file-card-container">
    <div class="card-section" :class="{ 'hide-upload': !showUploadOption}">
      <img src="/static/dataset/csv_file_64px.svg">
      <div class="card-section-header">
        <p> {{$t('data.upload.titles.fileDetails')}} </p>
        <el-row v-if="showUploadOption">
          <el-switch v-model="isRemoteFile" @change="setIsFileRemote" :active-text="$t('data.dataset.edit.remoteAccessPoint')" :inactive-text="$t('data.dataset.edit.file')">
          </el-switch>
        </el-row>

        <transition name="slideDown">
          <el-row v-if="isRemoteFile && showUploadOption">
            <el-form-item prop="remoteFileAccessPoint" size="small" class="remote-input-container">
              <el-input type="textarea" autosize v-model="remoteFileAccessPoint" @blur="handleRemoteFileChange" :placeholder="$t('data.dataset.edit.describeRemoteAccessPoint' )"></el-input>
            </el-form-item>
          </el-row>
        </transition>
      </div>

      <transition name="fade">
        <div class="upload-button-container">
          <el-upload class="el-button" v-if="showUploadOption && !isRemoteFile" :limit="1" ref="csvFile" :action="''" :multiple="false"
            :auto-upload="false" :on-change="handleFileChange" :on-remove="fileRemoved" accept=".csv">
            {{ $t('data.dataset.edit.uploadNew') }}
          </el-upload>
          <div v-if="!isValid && !isRemoteFile" class="aig-form-error">
            {{ validationMessage }}
          </div>
        </div>
      </transition>
    </div>
    <div class="card-section">
      <div>
        <p>{{ $t('data.dataset.edit.registeredOnly') }}</p>
        <p>{{ $t('data.dataset.edit.byDefaultPublicAccess') }}</p>
      </div>
      <el-switch :value="value" @change="(value) => $emit('input', value)" :active-text="$t('data.dataset.edit.public')" :inactive-text="$t('data.dataset.edit.loggedIn')">
      </el-switch>
    </div>
  </div>
</template>
<script>
export default {
  props: ['value', 'showUploadOption', 'onFileChange'],
  data () {
    return {
      isDatasetPrivate: false,
      isRemoteFile: false,
      remoteFileAccessPoint: '',
      isValid: true,
      validationMessage: '',
      isFileEmpty: false,
      isInitiallyRemote: false
    }
  },
  methods: {
    setCurrentDatasetIsPublic () {
      this.$store.dispatch('setCurrentDatasetIsPublic', { isPublic: this.isPublic })
    },
    handleRemoteFileChange () {
      this.$store.dispatch('setRemoteFileAccessPoint',
        { remoteFileAccessPoint: this.remoteFileAccessPoint })
      this.$root.$emit('remoteFileAccessPoint', this.remoteFileAccessPoint)
    },
    handleFileChange (file) {
      this.$store.dispatch('setCurrentDatasetFile', { file })
      this.$store.dispatch('setHasFileChanged', { hasFileChanged: true })
      if (this.validate()) {
        this.onFileChange()
      }
    },
    fileRemoved () {
      this.$store.dispatch('setCurrentDatasetFile', { file: null })
      this.$store.dispatch('setHasFileChanged', { hasFileChanged: false })
      this.onFileChange()
    },
    setIsFileRemote (value) {
      this.$store.dispatch('setIsFileRemote', { isFileRemote: value })
      this.$root.$emit('isFileRemote', value)
    },
    validate () {
      if (!this.$store.state.currentDataset.hasFileChanged &&
          !this.$store.state.currentDataset.isFileRemote &&
          !this.isInitiallyRemote) {
        return true
      }

      if (this.$store.state.currentDataset.isFileRemote) {
        return true
      }

      if (!this.$store.state.currentDataset.isFileRemote &&
          !this.$store.state.currentDataset.file) {
        this.isValid = false
        this.validationMessage = this.$t('data.dataset.validation.fileEmpty')
        return false
      }

      const fileSize = this.$store.state.currentDataset.file.raw.size / 1024 / 1024
      if (fileSize > 10) {
        this.$refs.csvFile.clearFiles()
        this.isValid = false
        this.validationMessage = this.$t('data.dataset.validation.fileTooBig')
        return false
      }

      this.isValid = true
      return true
    }
  },
  mounted () {
    if (!this.$store.state.currentDataset) {
      return
    }

    if (this.$store.state.currentDataset.remoteFileAccessPoint) {
      this.isRemoteFile = true
      this.isInitiallyRemote = true
    }

    if (this.showUploadOption) {
      this.remoteFileAccessPoint = this.$store.state.currentDataset.remoteFileAccessPoint
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
      &.hide-upload {
        .card-section-header {
          min-height: 30px
        }
      }
      .card-section-header {
        flex-grow: 1;
        margin: 0 15px;
        min-height: 115px;
        p {
          margin: 0;
          &:first-child {
            flex-grow: 1
          }
        }
      }
      .upload-button-container {
        transition: all 200ms;
        min-height: 80px;
      }
      .remote-input-container {}
      p {
        display: inline;
        line-height: 32px;
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

    .aig-form-error {
      margin-top: 5px;
      font-size: 14px;
      margin-bottom: -22px;
    }

  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .file-card-container {
      .card-section {
        flex-direction: column;
        align-items: flex-start;
        img {
          margin: 0 auto;
        }
        &.hide-upload {
          height: 150px;
          .card-section-header {
            min-height: 20px;
            height: 20px;
            flex-grow: 0;
          }
          .upload-button-container {
            min-height: 0;
          }
          p {
            height: 20px;
          }
        }
        .card-section-header {
          margin: 0;
          text-align: center;
        }
        div {
          display: block;
          width: 100%;
          p {
            margin-left: 0;
            height: 40px;
            line-height: 20px
          }
        }
        &:last-child {
          padding-bottom: 40px;
          min-height: 180px;
        }
      }
    }

  }
</style>
