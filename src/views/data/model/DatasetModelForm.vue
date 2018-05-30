<template>
  <div class="aig-dataset-info-container" v-loading="loading">
    <h3 class="section-title" v-if="!isUpload">{{$t('data.dataset.model.editModel')}}</h3>
    <el-form :model="modelForm" :rules="modelFormRules" ref="modelForm">

      <DatasetTitleEdit v-model="modelForm.title" />

      <DatasetPremiumEdit v-model="modelForm.premium" />

      <DatasetDescriptionEdit v-model="modelForm.description" />

      <DatasetModelEdit v-model="modelForm.model" :validateField="validateField" />

      <el-row v-if="!isModelValid">
        <div class="aig-form-error">
          {{$t('data.dataset.validation.emptyModel')}}
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
    const checkPremiumValue = (rule, value, callback) => {
      if (Number(value) > 100000) {
        callback(new Error(this.$t('data.dataset.validation.premiumMax')))
      } else if (Number(value) < 0.000001) {
        callback(new Error(this.$t('data.dataset.validation.premiumMin')))
      } else if (Number(value) === 0) {
        callback(new Error(this.$t('data.dataset.validation.premiumZero')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      isModelValid: true,
      dialogVisible: false,
      modelForm: {
        title: '',
        description: '',
        premium: '',
        dataId: '',
        model: {
          titles: [],
          data: []
        }
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
        }],
        description: [{
          required: true,
          message: this.$t('data.dataset.validation.descriptionEmpty'),
          trigger: 'blur'
        },
        {
          min: 6,
          message: this.$t('data.dataset.validation.descriptionTooShort'),
          trigger: 'blur'
        }],
        premium: [{
          required: true,
          message: this.$t('data.dataset.validation.premiumEmpty'),
          trigger: 'blur'
        },
        {
          validator: checkPremiumValue,
          trigger: 'blur'
        },
        {
          pattern: /^(?:\d{1,6}\.\d{1,6}|[0-9]\d{0,5})$/,
          message: this.$t('data.dataset.validation.premiumInvalid'),
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    formAction () {
      this.validate(this.modelForm.model.data)
      this.submitForm('modelForm', this.postDataModel)
    },
    postDataModel () {
      if (!this.isModelValid) return

      this.loading = true
      let form = { ...this.modelForm }
      form.model = JSON.stringify(this.modelForm.model)
      form.dataId = this.$route.params.id

      this.axios.post(this.postPath, form)
        .then(response => {
          this.$notify({
            title: this.$t('data.dataset.model.notification.title.success'),
            type: 'success',
            message: this.isUpload ? this.$t('data.dataset.model.notification.successfullyUploaded')
              : this.$t('data.dataset.model.notification.successfullyUpdated')
          })

          this.$store.dispatch('loadCurrentModel', { datasetId: this.$route.params.id, modelId: this.$route.params.modelId })
          this.$store.dispatch('loadCurrentDataset', this.$route.params.id)

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
    },
    validate (model) {
      if (model.length > 0) {
        this.isModelValid = true
      } else {
        this.isModelValid = false
      }
    },
    validateField (prop) {
      this.$refs['modelForm'].validateField(prop)
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
        this.modelForm.model = JSON.parse(this.modelForm.model)
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
