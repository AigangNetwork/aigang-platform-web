<template>
  <div class="">
    <div class="aig-card-container">
      <Card class="guest-card">

        <div class="flex_wrap" slot="body" v-loading="loading">

          <el-row>
            <el-col>
              <div class="aig-logo">
                <img src="/static/logo-purple.png" alt="">
              </div>
            </el-col>
          </el-row>
          <div v-if="!isVerificationVisisble">
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <h2>{{ $t('retrievePassword.title') }}</h2>
                <el-form @submit.prevent.native="submitForm('forgotPasswordForm', retrievePassword)" :model="forgotPasswordForm" :rules="forgotPasswordFormRules"
                  ref="forgotPasswordForm">
                  <el-row style="input_label">
                    <el-col>
                      <span class="label">{{ $t('login.email' )}}</span>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col>
                      <el-form-item prop="email">
                        <el-input class="aig-card-input" v-model="forgotPasswordForm.email" placeholder="example@aigang.network"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item style="margin-bottom: 0;">
                    <el-button type="primary" @click="submitForm('forgotPasswordForm', retrievePassword)">{{ $t('actions.retrievePassword') }}</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>

            <el-row class="flex-column-wrap" justify="center" style="height:100px;">
              <el-col style="text-align: center; flex-grow: 1; display: flex; align-items: flex-end;">
                <p style="text-align: center; width: 100%; margin: 0;">
                  <span>{{ $t('retrievePassword.backTo') }}</span>
                  <router-link class="a-active" to="/login">{{ $t('login.login') }}</router-link>
                </p>
              </el-col>

              <el-col style="text-align: center;">
                <span>{{ $t('login.dontHave') }}</span>
                <router-link class="a-active" to="/register">{{ $t('signUp.signUp') }}</router-link>
              </el-col>
            </el-row>
          </div>

          <el-row class="verification-container" v-if="isVerificationVisisble">
            <h2>{{ $t('retrievePassword.waitingVerification') }}</h2>
            <p>{{ $t('retrievePassword.dontReceiveEmail') }}
              <a class="a-active" type="text" @click="retrievePassword()">{{ $t('general.here') }}</a>
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
  name: 'ForgotPasswordView',
  components: {
    Card
  },
  mixins: [FormMixin],
  data () {
    return {
      loading: false,
      forgotPasswordForm: {
        email: ''
      },
      forgotPasswordFormRules: {
        email: [
          {
            required: true,
            message: 'Please enter email address',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Please enter correct email address',
            trigger: 'blur'
          }
        ]
      },
      isVerificationVisisble: false
    }
  },
  methods: {
    retrievePassword () {
      this.loading = true
      this.axios
        .post('/account/forgotpassword', this.forgotPasswordForm)
        .then(response => {
          this.loading = false
          this.isVerificationVisisble = true
        })
        .catch(e => {
          this.isVerificationVisisble = false
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-card.guest-card .el-row.verification-container {
      flex-direction: column;
      align-items: left;
    }
  }
</style>
