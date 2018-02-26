<template>
  <div class="">
    <div class="aig__container" style="">

        <Card class="card--center">

          <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">

            <el-row>
              <el-col>
                 <div class="aig__logo">
                    <img src="/static/logo-purple.png" alt="">
                  </div>
              </el-col>
            </el-row>

             <el-row type="flex" justify="center">

              <el-col :span="10" >
                <h2>{{ $t('login.title') }}</h2>

                <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
                  <el-form-item :label="$t('login.email')" prop="email" size="small">
                    <el-input v-model="loginForm.email" placeholder="example@aigang.network"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('login.password')" prop="password" size="small">
                    <router-link to="/forgotPassword">{{ $t('login.forgotPassword') }}</router-link>
                    <el-input v-model="loginForm.password" type="password" placeholder="********"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0">
                    <el-button type="primary" @click="submitForm('loginForm', login)" style="width: 100%">{{ $t('login.login') }}</el-button>
                  </el-form-item>
                </el-form>
              </el-col>

            </el-row>

            <el-row type="flex" justify="center" style="height:100px;align-items: flex-end;">
              <el-col :span="10" style="text-align: center;">
                <span>{{ $t('login.dontHave') }}</span>
                 <router-link to="/register">{{ $t('login.signUp') }}</router-link>
              </el-col>
            </el-row>

          </div>
          <div slot="footer"></div>

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

.aig__container {
  display: flex;              /* establish flex container */
  justify-content: center;    /* center items vertically, in this case */
  align-items: center;        /* center items horizontally, in this case */
  height: 600px;
}

.card--center {
    width: 932px;
}

.aig__logo {
  display: block;
  line-height: 50px;
  img {
    display: inline-block;
    vertical-align: middle;
    width: 86px;
    height: 27px;
    width: auto;
  }
}

</style>
