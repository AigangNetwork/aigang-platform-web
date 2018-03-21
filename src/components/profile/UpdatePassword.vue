<template>
  <div v-loading="loading" :element-loading-text="$t('general.loading')">
    <el-row class="profile-password-container">
      <el-col>
        <p class="profile-section-title">{{ $t('profile.changePassword') }}</p>
      </el-col>
      <el-col>
        <p class="profile-section-decription">{{ $t('profile.passwordDescription') }}</p>
      </el-col>

      <el-form class="form-container" @keyup.enter.native="submitForm('profileForm')" :model="profileForm" :rules="profileFormRules"
        ref="profileForm">
        <el-row>
          <el-col>
            <span class="label">{{ $t('profile.oldPassword' )}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="oldPassword">
              <el-input class="aig-card-input" v-model="profileForm.oldPassword" type="password" placeholder="********"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <span class="label">{{ $t('profile.newPassword' )}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="newPassword">
              <el-input class="aig-card-input" v-model="profileForm.newPassword" type="password" placeholder="********"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="isSuccessfullyUpdate" class="success-message">
          <el-col>
            {{ $t('profile.passwordUpdated' )}}
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item>
              <el-button class="profile-button change-button" @click="submitForm('profileForm')">{{ $t('profile.changePassword') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      isSuccessfullyUpdate: false,
      profileForm: {
        firstName: '',
        lastName: '',
        userName: '',
        id: '',
        oldPassword: '',
        newPassowrd: '',
        updatePassword: true
      },
      profileFormRules: {
        oldPassword: [
          { required: true, message: this.$t('validation.passwordEmpty'), trigger: 'blur' },
          { min: 6, message: this.$t('validation.passwordTooShort'), trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: this.$t('validation.passwordEmpty'), trigger: 'blur' },
          { min: 6, message: this.$t('validation.passwordTooShort'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    edit () {
      this.loading = true
      this.axios.put('/account/edit', this.profileForm)
        .then(response => {
          this.loading = false
          this.isVerificationVisisble = true
          this.isSuccessfullyUpdate = true
        })
        .catch(e => {
          this.loading = false
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.edit()
        } else {
          return false
        }
      })
    }
  },
  created () {
    this.profileForm.firstName = this.$store.state.user.profile.firstName
    this.profileForm.lastName = this.$store.state.user.profile.lastName
    this.profileForm.userName = this.$store.state.user.profile.email
    this.profileForm.id = this.$store.state.user.profile.id
  }
}
</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .profile-password-container,
  .profile-email-container {
    margin: 40px 0px 0px 0px;
  }

  .profile-password-container .profile-button {
    width: 165px;
  }

  .profile-password-container .el-form-item {
    margin-bottom: 32px
  }

  .form-container {
    max-width: 400px;
  }

  .success-message {
    color: $green;
  }
</style>
