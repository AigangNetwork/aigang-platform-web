<script>
export default {
  methods: {
    submitForm (formName, successCallback) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          successCallback()
        } else {
          return false
        }
      })
    }
  }
}
</script>
