<script>
export default {
  computed: {
    voteCount () {
      if (this.count > 1000) {
        return `+${this.count / 1000}K`
      } else if (this.count > 0) {
        return `+${this.count}`
      } else {
        return '0'
      }
    },
    votesTooltipMessage () {
      if (this.count > 1) {
        return this.count + ' ' + this.$t('data.dataset.model.usersVoted')
      } else if (this.count > 0) {
        return this.count + ' ' + this.$t('data.dataset.model.userVoted')
      } else {
        return this.$t('data.dataset.model.noUsersVoted')
      }
    }
  }
}
</script>
