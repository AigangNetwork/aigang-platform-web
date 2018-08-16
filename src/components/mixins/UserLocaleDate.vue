<script>
import moment from 'moment'

export default {
  computed: {
    userLocaleDate () {
      if (this.dateUtc) {
        const offset = moment().utcOffset()
        return moment.utc(this.dateUtc).utcOffset(offset).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return 'N/A'
      }
    }
  }
}
</script>
