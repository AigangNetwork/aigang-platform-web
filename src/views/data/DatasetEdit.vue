<template>
  <el-container class="aig-container-dataset" v-loading="loading">
    <el-button @click="$router.push(dataRoute)" class="back-button">{{ $t('general.back') }}</el-button>
    <div class="dataset-edit-container">
      <div class="dataset-body-container">
        <el-form :model="datasetForm" :rules="datasetFormRules" ref="datasetForm">

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

        <div class="horizontal-line"></div>

        <el-row class="profile-password-container">
          <el-col>
            <p class="input-section-title">{{ $t('data.dataset.deleteDatasetTitle') }}</p>
          </el-col>
          <el-col>
            <p class="profile-section-decription">{{ $t('data.dataset.deleteDatasetDescription') }}</p>
          </el-col>
          <el-row>
            <el-button @click="dialogVisible = true" class="profile-button">
              {{$t('data.dataset.deleteDataset')}}
            </el-button>
          </el-row>
        </el-row>
      </div>
    </div>
    <Dialog :title="$t('profile.warning')" :body="$t('data.dataset.deleteDialogBody')" :on-confirm="deleteDataset" :is-visible="dialogVisible"
      :on-cancel="cancel" />
  </el-container>
</template>
<script>
import DatasetFileCard from '@/components/data/dataset/DatasetFileCard'
import DatasetTitleEdit from '@/components/data/dataset/DatasetTitleEdit'
import DatasetDescriptionEdit from '@/components/data/dataset/DatasetDescriptionEdit'
import DatasetStructureEdit from '@/components/data/dataset/DatasetStructureEdit'
import Dialog from '@/components/common/Dialog'

export default {
  components: {
    DatasetFileCard,
    DatasetTitleEdit,
    DatasetDescriptionEdit,
    DatasetStructureEdit,
    Dialog
  },
  data () {
    return {
      loading: false,
      datasetStructure: [],
      datasetRemoteStructure: '',
      isStructured: false,
      structureValid: true,
      dialogVisible: false,
      dataRoute: `/data/${this.$route.params.id}`,
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
        ],
        remoteFileAccessPoint: [{
          required: true,
          message: this.$t('data.dataset.validation.remoteFileAccessPointEmpty'),
          trigger: 'blur'
        },
        {
          min: 6,
          message: this.$t('data.dataset.validation.remoteFileAccessPointTooShort'),
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
        this.$store.dispatch('setCurrentDatasetFile', {
          file: null
        })
        this.datasetForm.file = null
        this.datasetForm.structure = this.datasetRemoteStructure
        this.datasetForm.isFileRemote = true
      }

      for (var key in this.datasetForm) {
        form.append(key, this.datasetForm[key])
      }

      this.axios.post('/data/update', form).then(response => {
        this.$store.dispatch('clearCurrentDataset')
        this.$store.dispatch('loadCurrentDataset', this.$route.params.id)

        this.loading = false
        this.$notify({
          title: this.$t('data.upload.notifications.titles.success'),
          type: 'success',
          message: this.$t('data.dataset.edit.edit_success')
        })

        this.$router.push('/data/' + this.$route.params.id)
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
    onFileChange () {
      this.parseFileStructure()
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
                dataType: 'String'
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
    },
    async onMounted (id) {
      this.loading = true

      try {
        await this.$store.dispatch('loadCurrentDataset', this.$route.params.id)
        if (this.$store.state.currentDataset.userId !== this.$store.state.user.profile.id) {
          this.$router.push({
            name: 'AccessDenied'
          })
          return
        }
      } catch (e) {
        this.loading = false
      }

      if (!this.$store.state.currentDataset) {
        this.$router.push('/data/' + id)
        return
      }

      this.initializeDatasetForm(this.$store.getters.dataset)

      if (this.$store.state.currentDataset.remoteFileAccessPoint) {
        this.$store.dispatch('setIsFileRemote', {
          isFileRemote: true
        })
      } else {
        this.$store.dispatch('setIsFileRemote', {
          isFileRemote: false
        })
      }

      this.isStructured = !this.$store.state.currentDataset.isFileRemote

      this.$root.$on('isFileRemote', (value) => {
        this.isStructured = !value
      })

      this.$root.$on('remoteFileAccessPoint', (value) => {
        this.datasetForm.remoteFileAccessPoint = value
      })

      this.loading = false
    },
    deleteDataset () {
      this.loading = true
      this.axios.delete('data/' + this.$route.params.id).then(response => {
        this.loading = false
        this.$notify.success({
          title: this.$t('data.upload.notifications.titles.success'),
          message: this.$t('data.dataset.successDelete')
        })
        this.$router.push('/data')
      }).catch(e => {
        this.loading = false
      })
    },
    cancel () {
      this.dialogVisible = false
    }
  },
  async mounted () {
    await this.onMounted(this.$route.params.id)
  }
}

</script>
<style lang="scss" scoped>
  .aig-container-dataset {
    background: white;
    max-width: 1200px;
  }

  .dataset-edit-container {
    max-width: 655px;
    width: 100%;
    margin: 40px auto;

    form {
      padding-bottom: 20px;
    }
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

  .profile-button {
    margin-top: 20px;
  }

  @media screen and (min-width: 680px) and (max-width: 1024px) {
    .aig-container-dataset {
      display: block;

      .back-button {
        margin: 20px;
      }
    }

    .dataset-edit-container {
      margin-top: 0px;
    }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-container-dataset {
      display: block;

      .back-button {
        margin: 20px 0 0 20px;
      }

      .dataset-edit-container {
        margin-top: 0px;
        padding: 20px
      }
    }
  }

</style>
