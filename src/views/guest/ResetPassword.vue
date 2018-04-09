<template>
  <div>
    <div class="aig-card-container">
      <Card class="guest-card">

        <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">

          <el-row>
            <el-col>
              <div class="aig-logo">
                <img src="/static/logo-purple.png" alt="">
              </div>
            </el-col>
          </el-row>

          <el-row v-show="!isVerificationVisisble">
            <el-col :span="12">

              <el-row>
                <h2>{{ $t('retrievePassword.title') }}</h2>
                <p v-if="msg === ''" style="padding-right:40px;"> {{ $t('retrievePassword.description') }}</p>
                <p v-else style="padding-right:40px;"> {{ msg }}</p>
              </el-row>

            </el-col>

            <el-col :span="12">
              <el-form class="retrieve-pass" @keyup.enter.native="submitForm('resetPasswordForm', resetPassword)" :model="resetPasswordForm"
                :rules="resetPasswordFormRules" ref="resetPasswordForm">

                <el-row>
                  <el-col>
                    <span class="label">{{ $t('login.password' )}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item prop="password">
                      <el-input class="aig-card-input" v-model="resetPasswordForm.password" type="password" placeholder="********"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <span class="label">{{ $t('signUp.rePassword' )}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item prop="rePassword">
                      <el-input class="aig-card-input" v-model="resetPasswordForm.rePassword" type="password" placeholder="********"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('resetPasswordForm', resetPassword)">{{ $t('retrievePassword.retrievePassword') }}</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>

            </el-col>
          </el-row>

          <el-row v-if="isVerificationVisisble">
            <h2>{{ $t('retrievePassword.changeSuccessTitle') }}</h2>
            <p style="width: 100%; margin: 0;">
              <span>{{ $t('retrievePassword.backTo') }}</span>
              <router-link class="a-active" to="/login">{{ $t('login.login') }}</router-link>
            </p>
          </el-row>

        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import FormMixin from '@/components/mixins/FormMixin'

export default {
  name: 'ResetPasswordView',
  components: {
    Card
  },
  mixins: [FormMixin],
  data () {
    return {
      loading: true,
      isVerificationVisisble: false,
      resetPasswordForm: {
        userId: '',
        token: '',
        password: '',
        rePassword: ''
      },
      resetPasswordFormRules: {
        password: [
          { required: true, message: this.$t('validation.passwordEmpty'), trigger: 'blur' },
          { min: 6, message: this.$t('validation.passwordTooShort'), trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: this.$t('validation.passwordEmpty'), trigger: 'blur' },
          { min: 6, message: this.$t('validation.passwordTooShort'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetPassword () {
      this.loading = true
      this.axios.post('/account/resetpassword', this.resetPasswordForm)
        .then(response => {
          this.loading = false
          this.isVerificationVisisble = true
        })
        .catch(e => {
          this.loading = false
        })
    }
  },
  created: function () {
    let userId = this.$route.query.id
    let token = this.$route.query.token

    if (userId && token) {
      this.resetPasswordForm.userId = userId
      this.resetPasswordForm.token = token
      this.loading = false
      this.msg = ''
    } else {
      this.msg = this.$t('errors.400')
      this.loading = false
    }
  }
}
</script>
