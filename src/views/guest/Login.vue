<template>
  <div class="">
    <div class="aig__container">

        <Card style="width: 932px;">

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
                <h2 style="margin-top:40px;margin-bottom:40px;">{{ $t('login.title') }}</h2>

                <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">

                  <el-row>
                    <el-col><span class="label">{{ $t('login.email' )}}</span></el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item prop="email">
                        <el-input v-model="loginForm.email" :placeholder="$t('login.email')"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12"><span class="label">{{ $t('login.password' )}}</span></el-col>
                    <el-col :span="12" style="text-align: right;"><router-link class="a--passive" to="/forgotPassword">{{ $t('login.forgotPassword') }}</router-link></el-col>
                  </el-row>

                  <el-row>
                    <el-col>
                      <el-form-item prop="password">
                         <el-input v-model="loginForm.password" type="password" placeholder="********"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                     <el-col>
                        <el-form-item>
                          <el-button type="primary" @click="submitForm('loginForm', login)" style="width: 100%">{{ $t('login.login') }}</el-button>
                        </el-form-item>
                     </el-col>
                  </el-row>

                </el-form>
              </el-col>

            </el-row>

            <el-row type="flex" justify="center" style="height:100px;align-items: flex-end;">
              <el-col :span="10" style="text-align: center;">
                <span>{{ $t('login.dontHave') }}</span>
                 <router-link class="a--active" to="/register">{{ $t('signUp.signUp') }}</router-link>
              </el-col>
            </el-row>

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

.aig__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  background-image: url("/static/background/backgroud_pattern.svg");
}

.aig__logo {
  display: block;
  line-height: 80px;
  img {
    display: inline-block;
    vertical-align: middle;
    width: 86px;
    height: 27px;
    width: auto;
  }
}

</style>
