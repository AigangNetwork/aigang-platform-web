<template>
  <el-container class="aig-container-dataset" v-loading="loading">
    <el-button @click="$router.go(-1)" class="back-button">{{ $t('general.back') }}</el-button>
    <div class="dataset-edit-container">
      <div class="dataset-body-container">
        <el-form @keyup.enter.native="submitForm('datasetForm')" :model="datasetForm" :rules="datasetFormRules" ref="datasetForm">

          <DatasetFileCard v-model="datasetForm.isPublic" :showUploadOption="true" :onFileChange="parseFileStructure" ref="fileCardComponent"
          />

          <DatasetTitleEdit v-model="datasetForm.title" />

          <DatasetDescriptionEdit v-model="datasetForm.description" />

          <el-row v-if="structureValid">
            <DatasetStructureEdit :structure="datasetStructure" v-model="datasetRemoteStructure" :isStructured="isStructured" ref="structureComponent"
            />
          </el-row>

          <el-row v-if="!structureValid">
            <div class="aig-form-error">
              {{$t('data.upload.input.validation.unableAccessFileContent')}}
            </div>
          </el-row>

          <el-row>
            <el-form-item>
              <el-button class="aig-button" type="primary" @click="submitForm('datasetForm')">{{ $t('general.save') }}</el-button>
            </el-form-item>
          </el-row>

        </el-form>
      </div>
    </div>
  </el-container>
</template>
<script>
import DatasetFileCard from '@/components/data/DatasetFileCard'
import DatasetTitleEdit from '@/components/data/DatasetTitleEdit'
import DatasetDescriptionEdit from '@/components/data/DatasetDescriptionEdit'
import DatasetStructureEdit from '@/components/data/DatasetStructureEdit'

export default {
  components: {
    DatasetFileCard,
    DatasetTitleEdit,
    DatasetDescriptionEdit,
    DatasetStructureEdit
  },
  data () {
    return {
      loading: false,
      datasetStructure: [],
      datasetRemoteStructure: '',
      isStructured: false,
      structureValid: true,
      datasetForm: {
        id: '',
        title: '',
        description: '',
        isPublic: true,
        structure: '',
        createdUtc: '',
        hasFileChanged: false,
        file: null,
        remoteFileAccessPoint: '',
        isFileRemote: false
      },
      datasetFormRules: {
        title: [{
          required: true,
          message: this.$t('data.dataset.validation.TitleEmpty'),
          trigger: 'blur'
        },
        {
          min: 6,
          message: this.$t('data.dataset.validation.TitleTooShort'),
          trigger: 'blur'
        }
        ],
        description: [{
          required: true,
          message: this.$t('data.dataset.validation.DescriptionEmpty'),
          trigger: 'blur'
        },
        {
          min: 6,
          message: this.$t('data.dataset.validation.DescriptionTooShort'),
          trigger: 'blur'
        }
        ],
        remoteFileAccessPoint: [{
          required: true,
          message: this.$t('data.dataset.validation.DescriptionEmpty'),
          trigger: 'blur'
        },
        {
          min: 6,
          message: this.$t('data.dataset.validation.DescriptionTooShort'),
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.loading = true
      let isValid = true

      if (!this.$refs.structureComponent.validate()) {
        isValid = false
      }

      if (!this.$refs.fileCardComponent.validate()) {
        isValid = false
      }

      this.$refs[formName].validate(isFormValid => {
        if (isFormValid && isValid && this.structureValid) {
          this.updateDataset()
        } else {
          this.loading = false
          return false
        }
      })
    },
    updateDataset () {
      let form = new FormData()
      this.datasetForm.hasFileChanged = this.$store.state.currentDataset.hasFileChanged
      this.datasetForm.isFileRemote = this.$store.state.currentDataset.isFileRemote

      if (!this.$store.state.currentDataset.isFileRemote &&
          this.$store.state.currentDataset.hasFileChanged) {
        this.datasetForm.file = this.$store.state.currentDataset.file.raw
        this.datasetForm.structure = JSON.stringify(this.datasetStructure)
      } else if (!this.$store.state.currentDataset.isFileRemote) {
        this.datasetForm.structure = JSON.stringify(this.datasetStructure)
        this.datasetForm.file = null
      } else {
        this.$store.dispatch('setCurrentDatasetFile', { file: null })
        this.datasetForm.file = null
        this.datasetForm.structure = this.datasetRemoteStructure
        this.datasetForm.isFileRemote = true
      }

      for (var key in this.datasetForm) {
        form.append(key, this.datasetForm[key])
      }

      this.axios.post('/data/update', form)
        .then(response => {
          this.loading = false
          this.$notify({
            title: this.$t('data.upload.notifications.titles.success'),
            type: 'success',
            message: this.$t('data.dataset.edit.edit_success')
          })
        }, e => {
          this.loading = false
        })
    },
    initializeDatasetForm (dataset) {
      this.datasetForm.title = dataset.title
      this.datasetForm.description = dataset.description
      this.datasetForm.createdUtc = dataset.createdUtc
      this.datasetForm.id = dataset.id
      this.datasetForm.isPublic = dataset.isPublic
      this.datasetForm.remoteFileAccessPoint = dataset.remoteFileAccessPoint
      this.datasetForm.hasFileChanged = dataset.hasFileChanged
      this.datasetForm.isFileRemote = dataset.isFileRemote

      try {
        this.datasetStructure = JSON.parse(dataset.structure)
      } catch (e) {
        this.datasetRemoteStructure = dataset.structure
      }
    },
    parseFileStructure () {
      if (!this.$store.state.currentDataset.file) {
        try {
          this.datasetStructure = JSON.parse(this.$store.state.currentDataset.structure)
        } catch (e) {
          this.datasetRemoteStructure = this.$store.state.currentDataset.structure
        }
        return
      }

      let dynamicFileFields = []
      let fileReader = new FileReader()

      try {
        fileReader.onload = (event) => {
          let fileContent = event.target.result
          if (fileContent.length > 0) {
            let fileColumns = fileContent.split('\n').shift().split(',')
            fileColumns.forEach(col => {
              dynamicFileFields.push({
                name: col,
                description: '',
                dataType: ''
              })
            })
          } else {
            this.structureValid = false
          }
        }
      } catch (error) {
        this.structureValid = false
      }
      fileReader.readAsText(this.$store.state.currentDataset.file.raw)
      this.datasetStructure = dynamicFileFields
    }
  },
  created () {
    this.initializeDatasetForm(this.$store.getters.dataset)

    if (this.$store.state.currentDataset.remoteFileAccessPoint) {
      this.$store.dispatch('setIsFileRemote', { isFileRemote: true })
    } else {
      this.$store.dispatch('setIsFileRemote', { isFileRemote: false })
    }

    this.isStructured = !this.$store.state.currentDataset.isFileRemote

    this.$root.$on('isFileRemote', (value) => {
      this.isStructured = !value
    })

    this.$root.$on('remoteFileAccessPoint', (value) => {
      this.datasetForm.remoteFileAccessPoint = value
    })
  }
}

</script>
<style lang="scss" scoped>
  .aig-container-dataset {
    background: white;
  }

  .dataset-edit-container {
    max-width: 655px;
    width: 100%;
    margin: 40px auto;
  }

  .dataset-body-container {
    .input-section-title {
      margin-top: 40px;
      margin-bottom: 4px;
      height: 19px;
      font-size: 14px;
      width: 100%;
      display: flex;
      .markdown-label {
        font-family: Roboto;
        flex-grow: 1;
        text-align: right;
        color: black;
        font-weight: 500;
        font-size: 12px;
        line-height: 19px;
        text-transform: none;
      }
    }

    .profile-info-input {
      input {
        font-size: 24px;
      }
    }
  }

  .save-updated-dataset-btn button {
    width: 100%;
  }

  .back-button {
    margin-top: 40px;
  }

  @media screen and (min-width: 680px) and (max-width: 1024px) {
    .aig-container-dataset {
      display: block;
      .back-button {
        margin: 20px;
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-container-dataset {
      display: block;
      .back-button {
        margin: 20px;
      }

      .dataset-edit-container {
        margin-top: 20px;
        padding: 20px
      }
    }
  }
</style>
