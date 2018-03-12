<template>
  <div class="">
    <div class="aig__container">
        <Card style="width: 932px;" >

          <div style="height:530px;" class="flex_wrap" slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">

            <el-row>
              <el-col>
                <div class="aig__logo">
                  <img src="/static/logo-purple.png" alt="">
                </div>
              </el-col>
            </el-row>

            <el-row type="flex" justify="center" style="min-height: 350px;">
              <el-col :span="10" >
                <h2 style="margin-top:40px;margin-bottom:40px;">{{ $t('retrievePassword.title') }}</h2>
                <el-form :model="forgotPasswordForm" :rules="forgotPasswordFormRules" ref="forgotPasswordForm">
                  <el-row>
                    <el-col><span class="label">{{ $t('login.email' )}}</span></el-col>
                  </el-row>

                  <el-row>
                    <el-col>
                      <el-form-item prop="email">
                        <el-input v-model="forgotPasswordForm.email" size="small" placeholder="example@aigang.network"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item style="margin-bottom: 0">
                    <el-button type="primary" @click="submitForm('forgotPasswordForm')" style="width: 100%">{{ $t('actions.retrievePassword') }}</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>

            <el-row type="flex" justify="center" style="height:100px;align-items: flex-end; flex-grow: 1;">
              <el-col :span="10" style="text-align: center;">
                <span>{{ $t('retrievePassword.backTo') }}</span>
                 <router-link class="a--active" to="/login">{{ $t('login.login') }}</router-link>
              </el-col>
            </el-row>

          </div>

          <div slot="footer">
            <router-link to="/register">{{ $t('actions.createAccount') }}</router-link>
            <router-link to="/login">{{ $t('actions.loginToAccount') }}</router-link>
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
            trigger: 'blur, change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.retrievePassword()
        } else {
          return false
        }
      })
    },
    retrievePassword () {
      this.loading = true
      this.axios
        .post('/account/forgotpassword', this.forgotPasswordForm)
        .then(response => {
          this.loading = false
          console.log(response)
        })
        .catch(error => {
          this.loading = false
          console.log(error)
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
  line-height: 80px;
  img {
    display: inline-block;
    vertical-align: middle;
    width: 86px;
    height: 27px;
    width: auto;
  }
}

.aig__container {
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  background-image: url('/static/background/backgroud_pattern.svg');
}

.flex_wrap {
  display: flex;
  flex-direction: column;
}
</style>
