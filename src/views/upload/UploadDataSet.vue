<template>
  <el-container class="aig-container">
    <Card class="aig-upload-card" v-if="firstStepActive">
      <div slot="body">
        <h4>{{$t('data.upload.titles.upload')}}</h4>
        <el-row type="flex">
          <el-col :span="16">
            <el-form :model="dataUploadForm">
              <el-form-item prop="file" size="small">
                <el-upload ref="csvFile" drag :action="''" :multiple="false" :auto-upload="false" :on-change="handleFileChange" accept=".csv">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload-text">Drop file here or
                    <em>click to upload</em>
                  </div>
                  <!-- ADD THIS TO TRANSLATIONS -->
                </el-upload>
              </el-form-item>
              <el-button @click="loadFile('file')" class="aig-load-button" v-if="buttonActive" type="primary">{{$t('data.upload.titles.load')}}</el-button>
              <div v-if="invalidFile">
                <el-form-item>
                  <p>{{$t('data.upload.rules.rule2')}}</p>
                  <el-input :placeholder="$t('data.upload.input.placeholder.fileAccess')" type="textarea" v-model="dataUploadForm.remoteFileAccessPoint"></el-input>
                </el-form-item>
                <el-button @click="loadFile()" class="aig-load-button" type="primary">{{$t('data.upload.titles.load')}}</el-button>
              </div>
            </el-form>
          </el-col>
          <el-col :span="10">
            <div class="aig-upload-info">
              <div class="aig-upload-info-header">
                <img src="/static/upload/info24px.svg" alt="threads">
                <h5>{{$t('data.upload.titles.fileUploadPreferences')}}</h5>
              </div>
              <div class="aig-upload-info-body">
                <ul>
                  <li>{{$t('data.upload.rules.rule0')}}</li>
                  <li>{{$t('data.upload.rules.rule1')}}</li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </Card>
    <Card class="aig-upload-card-step-2" v-if="secondStepActive">
      <div slot="body" :element-loading-text="$t('general.loading')">
        <el-row>
          <el-col :span="24">
            <div class="aig-file-information-container">
              <div class="header">
                <img src="/static/upload/doc64px.svg" alt="threads">
                <!-- Change this to file details -->
                <h3>{{ dataUploadForm.file.name }}</h3>
              </div>
              <div class="footer">
                <div class="left">
                  <!-- Use translations -->
                  <h4>File visibility</h4>
                  <p>By default datasets are with public access</p>
                </div>
                <div class="right">
                  <el-form style="width: 100%">
                    <el-form-item size="small">
                      <el-radio-group v-model="dataUploadForm.isPublic" size="small">
                        <el-radio-button :label="true">Public</el-radio-button>
                        <el-radio-button :label="false">Users only</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
            <el-form class="aig-dataset-upload-form" :model="dataUploadForm" ref="dataUploadForm">
              <h4>{{$t('data.upload.titles.title')}}</h4>
              <el-form-item prop="title" size="small">
                <el-input :placeholder="$t('data.upload.input.placeholder.title')" v-model="dataUploadForm.title"></el-input>
              </el-form-item>
              <h4>{{$t('data.upload.titles.description')}}</h4>
              <el-form-item prop="description" size="small">
                <el-input :placeholder="$t('data.upload.input.placeholder.description')" type="textarea" v-model="dataUploadForm.description"></el-input>
              </el-form-item>
              <div v-if="dynamicFileStructure.length > 0">
                <h4>{{$t('data.upload.titles.structure')}}</h4>
                <el-row :gutter="20" type="flex" v-for="column in dynamicFileStructure" :key="column.name">
                  <el-col :span="10">
                    <h5>{{column.name}}</h5>
                  </el-col>
                  <el-col>
                    <el-form-item size="medium">
                      <el-input :placeholder="$t('data.upload.input.placeholder.column')" v-model="column.description"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <!-- Move this to translations -->
                    <el-select size="medium" aria-required="true" v-model="column.dataType" placeholder="Data type">
                      <el-option v-for="item in dataTypeOptions" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <div v-else>
                <h4>{{$t('data.upload.titles.structure')}}</h4>
                <el-form-item>
                  <el-input :placeholder="$t('data.upload.input.placeholder.structure')" type="textarea" v-model="remoteFileStructure"></el-input>
                </el-form-item>
              </div>
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
            <el-button @click="uploadDataset" class="aig-upload-button" type="primary">{{$t('data.upload.titles.upload')}}</el-button>
          </el-col>
        </el-row>
      </div>
    </Card>
  </el-container>
</template>
<script>
import Card from '@/components/Card'
import router from '@/router'

export default {
  components: {
    Card
  },
  data () {
    return {
      buttonActive: true,
      invalidFile: false,
      firstStepActive: true,
      secondStepActive: false,
      isValidForm: true,
      dynamicFileStructure: [],
      dataTypeOptions: ['String', 'Numeric', 'Boolean'],
      remoteFileStructure: '',
      dataUploadForm: {
        title: '',
        description: '',
        isPublic: true,
        file: [],
        remoteFileAccessPoint: ''
      }
    }
  },
  methods: {
    handleFileChange (file, fileList) {
      console.log(file)
      console.log(fileList)
      this.dataUploadForm.file = fileList = []
      fileList.length = 0
      var fileSize = file.raw.size / 1024 / 1024 // filesize in mb
      if (fileSize <= 10) { // if less than 10MB
        this.dataUploadForm.file = file.raw
        this.invalidFile = false
        this.buttonActive = true
        this.parseFileStructure()
        return
      }
      this.dataUploadForm.file = fileList = []
      this.buttonActive = false
      this.invalidFile = true
    },
    loadFile (file) {
      if (file) {
        if (this.dataUploadForm.file.size > 0 && !this.invalidFile) { // MAKE STEP ACTIVE METHOD
          this.firstStepActive = false
          this.secondStepActive = true
          return
        }
        return
      }
      if (this.dataUploadForm.remoteFileAccessPoint.length > 0) {
        this.firstStepActive = false
        this.secondStepActive = true
      }
    },
    parseFileStructure () {
      var dynamicFileFields = []
      var fileReader = new FileReader()
      try {
        fileReader.onload = function (event) {
          var fileContent = event.target.result
          var fileColumns = fileContent.split('\n').shift().split(',')
          fileColumns.forEach(col => {
            dynamicFileFields.push(
              {
                name: col,
                description: '',
                dataType: ''
              }
            )
          })
        }
      } catch (error) {
        console.log('make notification for user about invalid file and delete file')
      }
      fileReader.readAsText(this.dataUploadForm.file)
      this.dynamicFileStructure = dynamicFileFields
    },
    uploadDataset () {
      this.validateForm()
      if (this.isValidForm) {
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
        }, error => {
          console.log(error)
          this.uploading = false
        })
      }
    },
    validateForm () {
      this.isValidForm = true
      for (var key in this.dataUploadForm) {
        if (this.dataUploadForm[key] === undefined || this.dataUploadForm[key] === '') {
          if (key === 'remoteFileAccessPoint') {
            continue
          } else {
            this.isValidForm = false
            return
          }
        }
      }
      if (this.dynamicFileStructure.length > 0) {
        for (var obj in this.dynamicFileStructure) {
          for (var prop in this.dynamicFileStructure[obj]) {
            if (this.dynamicFileStructure[obj][prop] === undefined || this.dynamicFileStructure[obj][prop] === '') {
              this.isValidForm = false
              return
            }
          }
        }
      } else {
        if (this.remoteFileStructure.length <= 0) {
          this.isValidForm = false
        }
      }
    },
    successfullUpload () {
      this.$notify({
        title: this.$t('data.upload.notifications.titles.success'),
        type: 'success',
        message: this.$t('data.upload.notifications.upload_success')
      })
      router.push('/data')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  .aig-container {
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 650px;
    background-image: url("/static/background/backgroud_pattern.svg");
    .aig-upload-card {
      width: 100%;
      max-width: 665px;
      height: 100%;
      max-height: 365px;
      h4 {
        text-transform: uppercase;
        margin: 0px 0px 15px 0px;
      }
      .aig-upload-info {
        height: 100%;
        max-height: 176px;
        margin-left: 10px;
        padding: 10px;
        .aig-upload-info-header {
          display: flex;
          h5 {
            font-size: 12pt;
            margin: 4px 0px 5px 5px;
          }
        }
        .aig-upload-info-body {
          height: 100%;
          max-height: 180px;
          ul {
            font-size: 11pt;
            padding: 5px;
            list-style-type: none;
            li {
              margin: 3px 3px 5px 3px;
            }
          }
        }
      }
      .aig-load-button {
        width: 100%;
      }
    }
    .aig-file-information-container {
      border: solid 1px $light-border-blue;
      border-radius: 5px;
      width: 100%;
      padding: 10px;
      max-width: 655px;
      background-color: $darker-white;
      .header {
        display: flex;
        border-bottom: solid 2px $light-border-blue;
      }
      .footer {
        display: flex;
        .left {
          width: 70%;
        }
        .right {
          margin: auto;
        }
        h4 {
          margin: 10px 0px 0px 5px;
          color: $purple;
        }
        p {
          margin-left: 5px;
          font-size: 11pt;
          color: $light-grey;
        }
      }
    }
    .aig-dataset-upload-form {
      h4 {
        margin-bottom: 5px;
        color: $purple;
        text-transform: uppercase;
        font-weight: 600;
      }
      h5 {
        margin: 5px 0px 0px 0px;
        color: $purple;
        font-weight: 600;
      }
    }
    .aig-upload-card-step-2 {
      height: 100%;
      margin-top: 50px;
      width: 100%;
      max-width: 665px;
      .aig-upload-button {
        width: 100%;
      }
    }
    .aig-form-error {
      text-align: center;
      margin-bottom: 15px;
      color: red;
    }
  }
</style>
