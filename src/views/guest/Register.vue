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
                <h2>{{ $t('signUp.signUp') }}</h2>
                <p style="padding-right:40px;"> {{ $t('signUp.description') }}</p>
              </el-row>

              <el-row type="flex" justify="center" style="height:100px;align-items: flex-end;">
                <el-col>
                  <span>{{ $t('signUp.haveAccount') }}</span>
                  <router-link class="a-active" to="/login">{{ $t('login.login') }}</router-link>
                </el-col>
              </el-row>

            </el-col>

            <el-col :span="12">
              <el-form @keyup.enter.native="submitForm('registerForm')" :model="registerForm" :rules="registerFormRules" ref="registerForm">

                <el-row>
                  <el-col>
                    <span class="label">{{ $t('login.email' )}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item prop="email">
                      <el-input v-model="registerForm.email" :placeholder="$t('login.email')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <span class="label">{{ $t('login.password' )}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item prop="password">
                      <el-input class="aig-card-input" v-model="registerForm.password" type="password" placeholder="********"></el-input>
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
                      <el-input class="aig-card-input" v-model="registerForm.rePassword" type="password" placeholder="********"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('registerForm')">{{ $t('signUp.signUp') }}</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>

            </el-col>
          </el-row>

          <el-row v-show="isVerificationVisisble">
            <h2>{{ $t('signUp.waitingVerification') }}</h2>
            <p>{{ $t('signUp.emailSent', [registerForm.email]) }}</p>
            <p>{{ $t('signUp.dontReceiveEmail') }}
              <a class="a-active" type="text" @click="resendEmail()">{{ $t('general.here') }}</a>
            </p>
          </el-row>

        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'RegisterView',
  components: {
    Card
  },
  data () {
    return {
      loading: false,
      isVerificationVisisble: false,
      registerForm: {
        email: '',
        password: '',
        rePassword: ''
      },
      registerFormRules: {
        email: [
          { required: true, message: this.$t('validation.emailEmpty'), trigger: 'blur' },
          { type: 'email', message: this.$t('validation.emailNotValid'), trigger: 'blur' }
        ],
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
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register()
        } else {
          return false
        }
      })
    },
    register () {
      this.loading = true
      this.axios.post('/account/register', this.registerForm).then(response => {
        this.loading = false
        this.isVerificationVisisble = true
      })
        .catch(e => {
          console.log('opa')
          this.loading = false
        })
    },
    resendEmail () {
      this.loading = true
      this.axios.post(`/account/sendverifyemail?Email=${this.registerForm.email}`).then(response => {
        this.loading = false
      })
        .catch(e => {
          this.loading = false
        })
    }
  }
}
</script>
