<template>
  <div class="">
    <div class="aig__container" style="max-width: 400px">
        <Card>
          <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">
            <div class="aig__logo">
              <img src="/static/logo-color.png" alt="">
            </div>

            <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
              <el-form-item :label="$t('strings.email')" prop="email" size="small">
                <el-input v-model="loginForm.email" placeholder="example@aigang.network"></el-input>
              </el-form-item>
              <el-form-item :label="$t('strings.password')" prop="password" size="small">
                <el-input v-model="loginForm.password" type="password" placeholder="********"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 0">
                <el-button type="primary" @click="submitForm('loginForm', login)" style="width: 100%">{{ $t('actions.login') }}</el-button>
              </el-form-item>
            </el-form>

          </div>
          <div slot="footer">
            <router-link to="/register">{{ $t('actions.createAccount') }}</router-link>
            <router-link to="/forgotPassword">{{ $t('actions.forgotPassword') }}</router-link>
          </div>
        </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'LoginView',
  components: {
    Card
  },
  data () {
    return {
      loading: false,
      loginForm: {
        email: 'test@test.lt', // todo remove
        password: 'Laikinas123' // todo remove
      },
      loginFormRules: {
        email: [
          { required: true, message: this.$t('validation.emailEmpty'), trigger: 'blur' },
          { type: 'email', message: this.$t('validation.emailNotValid'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('validation.passwordEmpty'), trigger: 'blur' },
          { min: 6, message: this.$t('validation.passwordTooShort'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName, successCallback, errorCallback) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          successCallback()
        } else {
          errorCallback()
          return false
        }
      })
    },
    login () {
      this.loading = true
      this.axios.post('/account/login', this.loginForm).then(response => {
        this.$store.dispatch('logIn', response)
        this.router.push('/')
      }).catch(e => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/mixins';
@import '~helpers/variables';

.aig__logo {
  display: block;
  line-height: 50px;
  font-size: 0;
  margin-right: 40px;
  text-align: center;
  margin-bottom: 15px;
  img {
    display: inline-block;
    vertical-align: middle;
    height: 36px;
    width: auto;
  }
}
</style>
