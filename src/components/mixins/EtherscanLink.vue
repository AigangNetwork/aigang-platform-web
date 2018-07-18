<script>
export default {
  computed: {
    etherscanLink () {
      if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'qa') {
        return 'https://ropsten.etherscan.io/tx/'
      } else if (process.env.NODE_ENV === 'production') {
        return 'https://etherscan.io/tx/'
      }
    }
  }
}
</script>
