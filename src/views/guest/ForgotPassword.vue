<template>
  <div class="aig__view--centered">
    <div class="aig__view__body aig__container" style="max-width: 400px">
        <Card>
          <div slot="body" v-loading="loading" element-loading-text="Retrieving password...">
            <div class="aig__logo">
              <img src="/static/logo-color.png" alt="">
            </div>
            <el-form :model="forgotPasswordForm" :rules="forgotPasswordFormRules" ref="forgotPasswordForm">
              <el-form-item :label="$t('strings.email')" prop="email" size="small">
                <el-input v-model="forgotPasswordForm.email" size="small" placeholder="example@aigang.network"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 0">
                <el-button type="primary" @click="submitForm('registerForm')" style="width: 100%">{{ $t('actions.retrievePassword') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer">
            <router-link to="/register">{{ $t('actions.createAccount') }}</router-link>
            <router-link to="/login">{{ $t('actions.loginToAccount') }}</router-link>
          </div>
        </Card>
        <!-- </div> -->
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
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: 'blur, change' }
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
      this.axios.post('/account/forgotpassword', this.forgotPasswordForm).then(response => {
        this.loading = false
        console.log(response)
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    }
  },
  mounted () {
    this.$i18n.locale = 'ru'
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
