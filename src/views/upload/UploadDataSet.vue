<template>
<el-container class="aig__container">
  <Card class="aig__upload__card" v-if="firstStepActive">
     <div slot="body">
      <h4>{{$t('data.upload.titles.upload')}}</h4>
       <el-row type="flex">
         <el-col :span="16">
          <el-form :model="dataUploadForm">
           <el-form-item prop="file" size="small">
             <el-upload ref="csvFile" drag :action="`${axios.defaults.baseURL}/data`"  :multiple="false" :auto-upload="false" :on-change="handleFileChange" accept=".csv">
             <i class="el-icon-upload"></i>
             <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
           </el-upload>
          </el-form-item>
          <el-button @click="loadFile('file')" class="aig__load__button" v-if="buttonActive" type="primary">{{$t('data.upload.titles.load')}}</el-button>
          <div v-if="invalidFile">
            <el-form-item >
              <p>{{$t('data.upload.rules.rule2')}}</p>
              <el-input :placeholder="$t('data.upload.input.placeholder.fileAccess')" type="textarea" v-model="dataUploadForm.fileRemoteAccess"></el-input>
            </el-form-item>
            <el-button @click="loadFile()" class="aig__load__button" type="primary">{{$t('data.upload.titles.load')}}</el-button>
          </div>

          </el-form>
         </el-col>
         <el-col :span="10">
           <div class="aig__upload__info">
             <div class="aig__upload__info__header">
              <img src="/static/upload/info24px.svg" alt="threads">
              <h5>File preferences</h5>
             </div>
             <div class="aig__upload__info__body">
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
  <Card class="aig__upload__card__step__2" v-if="secondStepActive">
    <div slot="body" :element-loading-text="$t('general.loading')">
      <el-row>
        <el-col :span="24">
          <div class="aig__file__information__container">
            <div class="header">
              <img src="/static/upload/doc64px.svg" alt="threads">
              <h3>{{ dataUploadForm.file.name }} TestFileName.csv</h3>
            </div>
            <div class="footer">
              <h4>For register users only</h4>
              <p>By default datasets are with public access</p>
            </div>
          </div>
          <el-form class="aig__dataset__upload__form" :model="dataUploadForm" ref="dataUploadForm">
            <h4>{{$t('data.upload.titles.title')}}</h4>
            <el-form-item prop="title" size="small">
              <el-input :placeholder="$t('data.upload.input.placeholder.title')" v-model="dataUploadForm.title"></el-input>
            </el-form-item>
            <h4>{{$t('data.upload.titles.description')}}</h4>
            <el-form-item prop="description" size="small">
              <el-input :placeholder="$t('data.upload.input.placeholder.description')" type="textarea" v-model="dataUploadForm.description"></el-input>
            </el-form-item>
            <div v-if="this.fileStructure.length > 0">
            <h4>{{$t('data.upload.titles.structure')}}</h4>
            <el-row :gutter="20" type="flex" v-for="column in fileStructure" :key="column.name">
              <el-col :span="10">
                  <h5>{{column.name}}</h5>
              </el-col>
              <el-col>
                <el-form-item size="medium">
                  <el-input :placeholder="$t('data.upload.input.placeholder.column')" v-model="column.description"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
               <el-select aria-required="true" v-model="column.dataType" placeholder="Data type">
                  <el-option
                    v-for="item in dataTypeOptions"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12" :offset="6">
          <el-button @click="uploadDataset" class="aig__upload__button" type="primary">{{$t('data.upload.titles.upload')}}</el-button>
        </el-col>
      </el-row>
    </div>
  </Card>
</el-container>
</template>
<script>
import Card from '@/components/Card'

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
      fileStructure: [],
      dataTypeOptions: ['String', 'Numeric', 'Boolean'],
      dataUploadForm: {
        title: '',
        description: '',
        isPublic: true,
        file: [],
        fileRemoteAccess: ''
      }
    }
  },
  methods: {
    handleFileChange (file, fileList) {
      this.dataUploadForm.file = fileList = []
      var fileSize = file.raw.size / 1024 / 1024 // filesize in mb
      if (fileSize <= 10) { // if less than 10MB
        this.dataUploadForm.file = file.raw
        this.invalidFile = false
        this.buttonActive = true
        return
      }
      this.dataUploadForm.file = fileList = []
      this.buttonActive = false
      this.invalidFile = true
    },
    loadFile (file) {
      if (file) {
        if (this.dataUploadForm.file.size > 0 && !this.invalidFile) {
          this.firstStepActive = false
          this.secondStepActive = true
          this.parseFileStructure()
          return
        }
        console.log('no upload')
        return
      }
      if (this.dataUploadForm.fileRemoteAccess.length > 0) {
        this.firstStepActive = false
        this.secondStepActive = true
        console.log('upload file access')
      }
    },
    parseFileStructure () {
      var fileReader = new FileReader()
      fileReader.onload = function (event) {
        var fileContent = event.target.result
        var fileColumns = fileContent.split('\n').shift().split(',')
        // TODO: fill file structure with json objects
        var dynamicFileFields = []
        fileColumns.forEach(col => {
          dynamicFileFields.push(
            {
              name: col,
              description: '',
              dataType: ''
            }
          )
        })
        this.fileStructure = dynamicFileFields
        console.log(this.fileStructure)
      }
      fileReader.readAsText(this.dataUploadForm.file)
    },
    uploadDataset () {
      if (this.validForm()) {
        console.log('submiting form')
      } else {
        console.log('throw an error dude')
      }
    },
    validForm () {
      var isValid = true
      for (var key in this.dataUploadForm) {
        if (this.dataUploadForm[key] === undefined || this.dataUploadForm[key] === '') {
          if (key === 'fileRemoteAccess') {
            continue
          } else {
            isValid = false
            return isValid
          }
        }
      }
      if (this.fileStructure.length > 0) {
        for (var obj in this.fileStructure) {
          for (var prop in this.fileStructure[obj]) {
            if (this.fileStructure[obj][prop] === undefined || this.fileStructure[obj][prop] === '') {
              console.log('true')
              isValid = false
              return isValid
            }
          }
        }
      }
      return isValid
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~helpers/variables';
  .aig__container {
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 650px;
    background-image: url("/static/background/backgroud_pattern.svg");
    .aig__upload__card {
      width: 100%;
      max-width: 665px;
      height: 100%;
      max-height: 365px;
      h4 {
        text-transform: uppercase;
        margin: 0px 0px 15px 0px;
      }
      .aig__upload__info {
        height: 100%;
        max-height: 176px;
        margin-left: 10px;
        padding: 10px;
        .aig__upload__info__header {
          display: flex;
          h5 {
            font-size: 12pt;
            margin: 4px 0px 5px 5px;
          }
        }
        .aig__upload__info__body {
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
      .aig__load__button {
        width: 100%;
      }
    }
    .aig__file__information__container {
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
    .aig__dataset__upload__form {
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
    .aig__upload__card__step__2 {
      height: 100%;
      margin-top: 50px;
      width: 100%;
      max-width: 665px;
      .aig__upload__button {
        width: 100%;
      }
    }
  }
</style>
