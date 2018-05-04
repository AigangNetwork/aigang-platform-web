<template>
  <el-container class="aig-container">
    <el-button class="aig-back-btn" v-if="secondStepActive" @click="setPage(1)">Back</el-button>
    <Card class="aig-upload-card" v-if="firstStepActive">
      <div slot="body">
        <div class="step1-header">
          <h4>{{$t('data.upload.titles.upload')}}</h4>
          <el-switch v-model="isRemoteFile" @change="switchChanged" :active-text="$t('data.dataset.edit.remoteAccessPoint')" :inactive-text="$t('data.dataset.edit.file')">
          </el-switch>
        </div>
        <el-row v-if="!isRemoteFile" type="flex">
          <el-col :span="16">
            <el-form :model="dataUploadForm" ref="dataUploadForm" :rules="dataUploadFormRules">
              <el-form-item prop="file" size="small">
                <el-upload :limit="1" :on-remove="fileRemoved" :on-exceed="fileLimitExeeded" ref="csvFile" drag :action="''" :multiple="false"
                  :auto-upload="false" :on-change="handleFileChange" accept=".csv">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">{{$t('data.upload.input.placeholder.fileUploadPart0')}}
                    <em>{{$t('data.upload.input.placeholder.fileUploadPart1')}}</em>
                  </div>
                </el-upload>
              </el-form-item>
              <div v-if="isErrorOnFirstStep && invalidFile" class="aig-form-error">
                {{errorMessage}}
              </div>
              <el-button @click="loadFile('file')" class="aig-load-button" v-if="buttonActive" type="primary">{{$t('data.upload.titles.load')}}</el-button>
            </el-form>
          </el-col>
          <el-col :span="10">
            <DatasetFilePreferences/>
          </el-col>
        </el-row>
        <el-row v-if="isRemoteFile" class="aig-remote-access-point-cointainer">
          <el-form class="aig-remote-access-point-form">
            <el-form-item>
              <p>{{$t('data.upload.rules.rule2')}}</p>
              <el-input :placeholder="$t('data.upload.input.placeholder.fileAccess')" type="textarea" v-model="dataUploadForm.remoteFileAccessPoint"></el-input>
            </el-form-item>
            <div v-if="isErrorOnFirstStep" class="aig-form-error">
              {{errorMessage}}
            </div>
            <el-button @click="loadFile()" class="aig-load-button" type="primary">{{$t('data.upload.titles.load')}}</el-button>
          </el-form>
        </el-row>
      </div>
    </Card>
    <Card class="aig-upload-card-step-2" v-if="secondStepActive" v-loading="loading">
      <div slot="body" :element-loading-text="$t('general.loading')">
        <el-row>
          <el-col :span="24">
            <DatasetFileCard v-model="dataUploadForm.isPublic" :showUploadOption="false" />
            <el-form :model="dataUploadForm" :rules="dataUploadFormRules" ref="dataUploadForm">
              <DatasetTitleEdit v-model="dataUploadForm.title" />
              <DatasetDescriptionEdit v-model="dataUploadForm.description" />
              <DatasetStructureEdit :structure="dynamicFileStructure" v-model="remoteFileStructure" ref="structureComponent" :isStructured="!invalidFile"
              />
            </el-form>
          </el-col>
        </el-row>
        <el-row v-if="!isValidForm">
          <div class="aig-form-error">
            {{$t('data.upload.input.validation.emptyInputError')}}
          </div>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-button @click="submitForm('dataUploadForm')" class="aig-upload-button" type="primary">{{$t('data.upload.titles.upload')}}</el-button>
          </el-col>
        </el-row>
      </div>
    </Card>
  </el-container>
</template>
<script>
import Card from '@/components/Card'
import DatasetFileCard from '@/components/data/DatasetFileCard'
import DatasetTitleEdit from '@/components/data/DatasetTitleEdit'
import DatasetDescriptionEdit from '@/components/data/DatasetDescriptionEdit'
import DatasetStructureEdit from '@/components/data/DatasetStructureEdit'
import DatasetFilePreferences from '@/components/data/upload/DatasetFilePreferences'
import router from '@/router'

export default {
  components: {
    Card,
    DatasetTitleEdit,
    DatasetDescriptionEdit,
    DatasetStructureEdit,
    DatasetFileCard,
    DatasetFilePreferences
  },
  data () {
    return {
      buttonActive: true,
      isRemoteFile: false,
      invalidFile: false,
      firstStepActive: true,
      secondStepActive: false,
      isValidForm: true,
      isErrorOnFirstStep: false,
      dynamicFileStructure: [],
      remoteFileStructure: '',
      loading: false,
      dataUploadForm: {
        title: '',
        description: '',
        isPublic: true,
        file: [],
        remoteFileAccessPoint: ''
      },
      dataUploadFormRules: {
        title: [{
          required: true,
          message: this.$t('data.dataset.validation.titleEmpty'),
          trigger: 'blur'
        },
        {
          min: 6,
          message: this.$t('data.dataset.validation.titleTooShort'),
          trigger: 'blur'
        },
        {
          max: 64,
          message: this.$t('data.dataset.validation.titleTooLong'),
          trigger: 'blur'
        }
        ],
        description: [{
          required: true,
          message: this.$t('data.dataset.validation.descriptionEmpty'),
          trigger: 'blur'
        },
        {
          min: 6,
          message: this.$t('data.dataset.validation.descriptionTooShort'),
          trigger: 'blur'
        }
        ]
      },
      errorMessage: ''
    }
  },
  methods: {
    handleFileChange (file, fileList) {
      this.isErrorOnFirstStep = false
      let regex = new RegExp('(.*?).(csv)$')
      if (!regex.test(file.name)) {
        this.invalidFile = true
        this.isErrorOnFirstStep = true
        this.errorMessage = this.$t('data.upload.input.validation.invalidFile')
        this.$refs.csvFile.clearFiles()
        return
      }
      const fileSize = file.raw.size / 1024 / 1024 // filesize in mb
      if (fileSize <= 10) { // if less than 10MB
        this.dataUploadForm.file = file.raw
        this.invalidFile = false
        this.buttonActive = true
        this.parseFileStructure()
      } else {
        this.$refs.csvFile.clearFiles()
        this.invalidFile = true
        this.isErrorOnFirstStep = true
        this.errorMessage = this.$t('data.upload.input.validation.fileTooLarge')
      }
    },
    loadFile (file) {
      if (file) {
        if (this.dataUploadForm.file.size > 0 && !this.invalidFile) {
          this.setPage(2)
          return
        }
        return
      }
      if (this.dataUploadForm.remoteFileAccessPoint.length > 0) {
        this.isErrorOnFirstStep = false
        this.setPage(2)
      } else {
        this.isErrorOnFirstStep = true
        this.invalidFile = true
        this.errorMessage = this.$t('data.upload.input.validation.emptyInputError')
      }
    },
    parseFileStructure () {
      let dynamicFileFields = []
      let fileReader = new FileReader()
      try {
        fileReader.onload = (event) => {
          let fileContent = event.target.result
          if (fileContent.length > 0) {
            var fileColumns = fileContent.split('\n').shift().split(',')
            fileColumns.forEach(col => {
              dynamicFileFields.push({
                name: col,
                description: '',
                dataType: 'String'
              })
            })
          } else {
            this.isErrorOnFirstStep = true
          }
        }
      } catch (error) {
        this.isErrorOnFirstStep = true
        this.errorMessage = this.$t('data.upload.input.validation.unableAccessFileContent')
      }
      fileReader.readAsText(this.dataUploadForm.file)
      this.dynamicFileStructure = dynamicFileFields
    },
    submitForm (formName) {
      this.loading = true
      let isValid = true
      if (!this.$refs.structureComponent.validate()) {
        isValid = false
      }
      this.$refs[formName].validate(isFormValid => {
        if (isFormValid && isValid) {
          this.uploadDataset()
        } else {
          this.loading = false
          return false
        }
      })
    },
    uploadDataset () {
      var uploadForm = new FormData()

      for (var key in this.dataUploadForm) {
        uploadForm.append(key, this.dataUploadForm[key])
      }

      if (this.dynamicFileStructure.length > 0) {
        uploadForm.append('structure', JSON.stringify(this.dynamicFileStructure))
      } else {
        uploadForm.append('structure', this.remoteFileStructure)
      }

      this.axios.post('/data', uploadForm).then(response => {
        this.successfullUpload()
      }, e => {
        this.loading = false
      })
    },
    successfullUpload () {
      this.$notify({
        title: this.$t('data.upload.notifications.titles.success'),
        type: 'success',
        message: this.$t('data.upload.notifications.upload_success')
      })
      router.push('/data')
    },
    setPage (num) {
      switch (num) {
        case 1:
          this.firstStepActive = true
          this.secondStepActive = false
          break
        case 2:
          this.firstStepActive = false
          this.secondStepActive = true
          break
      }
    },
    fileLimitExeeded (file, fileList) {
      this.errorMessage = this.$t('data.upload.input.validation.fileLimitExceed')
      this.isErrorOnFirstStep = true
      this.invalidFile = true
    },
    fileRemoved (file, fileList) {
      this.isErrorOnFirstStep = false
    },
    handleCsvInformaton (event) {
      event.preventDefault()
      window.open('https://tools.ietf.org/html/rfc4180', '_blank')
    },
    switchChanged () {
      this.isErrorOnFirstStep = false
      this.errorMessage = ''
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  .aig-container {
    max-width: 1200px;
    position: relative;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: baseline;
    .aig-upload-card {
      margin-top: 100px;
      width: 100%;
      max-width: 665px;
      height: 100%;
      max-height: 365px;
      .step1-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        h4 {
          text-transform: uppercase;
          margin: 0px 0px 15px 0px;
        }
      }
      .aig-load-button {
        width: 100%;
      }
      .aig-remote-access-point-cointainer {
        display: flex;
        justify-content: center;
        .aig-remote-access-point-form {
          max-width: 500px;
        }
      }
    }
    .aig-upload-card-step-2 {
      margin-top: 50px;
      width: 100%;
      max-width: 665px;
      .aig-upload-button {
        width: 100%;
      }
    }
    .aig-back-btn {
      position: absolute;
      left: 25px;
      top: 15px;
    }

  }
</style>
