<template>
  <div>
    <div class="aig__view__body aig__container">
        <div class="aig__login" v-loading="loading" element-loading-text="Logging in...">
          <div class="aig__logo">
            <img src="/static/logo-color.png" alt="">
          </div>
          <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
            <el-form-item label="Username" prop="email">
              <el-input v-model="loginForm.email" placeholder="example@aigang.network"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input v-model="loginForm.password" type="password" placeholder="********"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 0">
              <el-button type="primary" @click="submitForm('loginForm')" style="width: 100%">Login</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data () {
    return {
      loading: false,
      loginForm: {
        email: 'test@test.lt',
        password: 'Laikinas123'
      },
      loginFormRules: {
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
      // this.$store.commit('LOGIN')
      this.loading = true
      this.axios.post('/account/login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      }, response => {
        this.loading = false
        console.log(response)
      }, error => {
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
  img {
    display: inline-block;
    vertical-align: middle;
    height: 36px;
    width: auto;
  }
}

.aig__login {
  margin: 0 auto;
  max-width: 360px;
  width: 100%;
  padding: 25px;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid darken($gray, 2);
}
</style>
