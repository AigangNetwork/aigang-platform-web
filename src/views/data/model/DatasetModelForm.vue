<template>
  <div class="aig-dataset-info-container" v-loading="loading">
    <h4 class="info-title">{{$t('data.dataset.model.editModel')}}</h4>
    <el-form :model="modelForm" :rules="modelFormRules" ref="modelForm">

      <DatasetTitleEdit v-model="modelForm.title" />

      <DatasetPremiumEdit v-model="modelForm.premium" />

      <DatasetDescriptionEdit v-model="modelForm.description" />

      <DatasetModelEdit v-model="model" :validationCallback="validate" />

      <el-row v-if="!isModelValid">
        <div class="aig-form-error">
          {{$t('data.dataset.validation.emptyModel')}}
        </div>
      </el-row>

      <el-row v-if="!isModelInputsValid">
        <div class="aig-form-error">
          {{$t('data.dataset.validation.emptyModelInput')}}
        </div>
      </el-row>

      <el-row>
        <el-form-item>
          <el-button class="aig-button" type="primary" @click="formAction">
            <template v-if="isUpload">{{ $t('data.dataset.model.submitModel') }}</template>
            <template v-else>{{ $t('general.save') }}</template>
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <div v-if="!isUpload" class="horizontal-line"></div>

    <el-row v-if="!isUpload" class="profile-password-container">
      <el-col>
        <p class="input-section-title">{{ $t('data.dataset.model.deleteModelTitle') }}</p>
      </el-col>
      <el-col>
        <p class="profile-section-decription">{{ $t('data.dataset.model.deleteModelDescription') }}</p>
      </el-col>
      <el-row>
        <el-button @click="dialogVisible = true" class="profile-button">
          {{$t('data.dataset.model.deleteModel')}}
        </el-button>
      </el-row>
    </el-row>

    <Dialog :title="$t('profile.warning')" :body="$t('data.dataset.model.deleteDialogBody')" :on-confirm="deleteModel" :is-visible="dialogVisible"
      :on-cancel="cancel" />
  </div>
</template>
<script>
import DatasetTitleEdit from '@/components/data/DatasetTitleEdit'
import DatasetDescriptionEdit from '@/components/data/DatasetDescriptionEdit'
import DatasetPremiumEdit from '@/components/data/DatasetPremiumEdit'
import FormMixin from '@/components/mixins/FormMixin'
import DatasetModelEdit from '@/components/data/model/DatasetModelEdit'
import Dialog from '@/components/common/Dialog'

export default {
  props: ['isUpload', 'getPath', 'postPath'],
  components: {
    DatasetTitleEdit,
    DatasetDescriptionEdit,
    DatasetPremiumEdit,
    DatasetModelEdit,
    Dialog
  },
  mixins: [FormMixin],
  data () {
    const checkMinPremium = (rule, value, callback) => {
      if (parseFloat(value) < 0.000001) {
        callback(new Error(this.$t('data.dataset.validation.premiumZero')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      model: [],
      isModelValid: true,
      isModelInputsValid: true,
      dialogVisible: false,
      modelForm: {
        title: '',
        description: '',
        premium: '',
        model: '',
        dataId: ''
      },
      modelFormRules: {
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
        premium: [{
          required: true,
          message: this.$t('data.dataset.validation.premiumEmpty'),
          trigger: 'blur'
        }, {
          pattern: /^(?:\d{1,6}\.\d{1,6}|[0-9]\d{0,5})$/,
          message: this.$t('data.dataset.validation.premiumInvalid'),
          trigger: 'blur'
        },
        {
          validator: checkMinPremium,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    formAction () {
      this.removeEmptyRowsAndColumns(this.model)
      this.validate(this.model)
      this.submitForm('modelForm', this.postDataModel)
    },
    postDataModel () {
      if (!this.isModelValid || !this.isModelInputsValid) {
        return
      }

      this.loading = true
      this.modelForm.model = JSON.stringify(this.model)
      this.modelForm.dataId = this.$route.params.id

      this.axios.post(this.postPath, this.modelForm)
        .then(response => {
          this.$notify({
            title: this.$t('data.dataset.model.notification.title.success'),
            type: 'success',
            message: this.isUpload ? this.$t('data.dataset.model.notification.successfullyUploaded')
              : this.$t('data.dataset.model.notification.successfullyUpdated')
          })

          this.$store.dispatch('loadCurrentModel', { datasetId: this.$route.params.id, modelId: this.$route.params.modelId })

          if (this.isUpload) {
            this.$router.push({ name: 'datasetModels' })
          } else {
            this.$router.push({ name: 'modelInfo' })
          }

          this.loading = false
        }).catch(e => {
          this.loading = false
        })
    },
    validate (model) {
      if (model.length > 0) {
        this.isModelValid = true
      } else {
        this.isModelValid = false
      }

      // we need to flatten 3d array
      const tables = [].concat.apply([], model)
      const tableInputs = [].concat.apply([], tables)

      this.isModelInputsValid = true
      tableInputs.forEach(input => {
        if (input.length < 1) {
          this.isModelInputsValid = false
        }
      })
    },
    removeEmptyRowsAndColumns (model) {
      let rowsToRemove = []

      model.forEach(table => {
        let columnsInputSum = new Array(table.length).fill('')

        table.forEach((row, index) => {
          let accumulator = ''

          row.forEach((value, currentIndex) => {
            columnsInputSum[currentIndex] += value
            accumulator += value
          })

          if (accumulator === '') {
            rowsToRemove.push(index)
          }
        })

        rowsToRemove.forEach(index => {
          table.splice(index, 1)
        })

        columnsInputSum.forEach((input, currentIndex) => {
          if (input === '') {
            table.forEach(value => {
              value.splice(currentIndex, 1)
            })
          }
        })
      })
    },
    deleteModel () {
      this.loading = true
      this.axios.delete(`/data/${this.$route.params.id}/models/${this.$route.params.modelId}`)
        .then(response => {
          this.loading = false
          this.$notify.success({
            title: this.$t('data.upload.notifications.titles.success'),
            message: this.$t('data.dataset.model.successDelete')
          })
          this.$router.push(`/data/${this.$route.params.id}/models`)
        }).catch(e => {
          this.loading = false
        })
    },
    cancel () {
      this.dialogVisible = false
    }
  },
  async created () {
    if (!this.isUpload) {
      this.loading = true

      try {
        const response = await this.axios.get(this.getPath)

        if (response.data.data.userId !== this.$store.state.user.profile.id) {
          this.$router.push({ name: 'AccessDenied' })
          return
        }

        this.modelForm = response.data.data
        this.model = JSON.parse(response.data.data.model)
      } catch (error) {
        this.modelForm = {}
        this.loading = false
      }

      this.loading = false
    }
  },
  async mounted () {
    await this.$store.dispatch('loadCurrentDataset', this.$route.params.id)

    if (this.$store.state.currentDataset && this.$store.state.currentDataset.state !== 'active') {
      this.$router.push({ name: 'AccessDenied' })
    }
    this.modelForm.dataId = this.$store.state.currentDataset.id
  }
}

</script>
<style lang="scss" scoped>
  .aig-dataset-info-container form {
    padding-bottom: 20px;
  }

  .aig-dataset-info-container {
    padding-bottom: 53px;
  }
</style>
