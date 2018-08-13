<script>
import moment from 'moment'

export default {
  computed: {
    userLocaleDate () {
      if (this.dateUtc) {
        return moment(this.dateUtc).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return 'N/A'
      }
    }
  }
}
</script>
