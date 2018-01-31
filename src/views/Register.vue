<template>
  <div class="aig__view--centered">
    <div class="aig__view__body aig__container" style="max-width: 400px">
        <Card>
          <div slot="body" v-loading="loading" element-loading-text="Creating new account...">
            <div class="aig__logo">
              <img src="/static/logo-color.png" alt="">
            </div>
            <el-form :model="registerForm" :rules="registerFormRules" ref="registerForm">
              <el-form-item :label="$t('strings.email')" prop="email" size="small">
                <el-input v-model="registerForm.email" size="small" placeholder="example@aigang.network"></el-input>
              </el-form-item>
              <el-form-item :label="$t('strings.firstName')" prop="email" size="small">
                <el-input v-model="registerForm.firstName" size="small" placeholder="John"></el-input>
              </el-form-item>
              <el-form-item :label="$t('strings.lastName')" prop="email" size="small">
                <el-input v-model="registerForm.lastName" placeholder="Doe"></el-input>
              </el-form-item>
              <el-form-item :label="$t('strings.password')" prop="password" size="small">
                <el-input v-model="registerForm.password" size="small" type="password" placeholder="********"></el-input>
              </el-form-item>
              <el-form-item :label="$t('strings.rePassword')" prop="password" size="small">
                <el-input v-model="registerForm.rePassword" size="small" type="password" placeholder="********"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 0">
                <el-button type="primary" @click="submitForm('registerForm')" style="width: 100%">{{ $t('actions.create_new_account') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer">
            <router-link to="/login">Login to account</router-link>
            <router-link to="/forgotten-password">Retrieve password</router-link>
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
      registerForm: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        rePassword: ''
      },
      registerFormRules: {
        email: { required: true, message: 'E-mail address is required', trigger: 'blur' },
        password: { required: true, message: 'Password is required', trigger: 'blur' }
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    login () {
      this.loading = true
      this.axios.post('/account/login', {
        email: this.registerForm.email,
        password: this.registerForm.password
      }).then(response => {
        this.loading = false
        this.$store.dispatch('logIn', response.data.authorization)
      }).catch(error => {
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
