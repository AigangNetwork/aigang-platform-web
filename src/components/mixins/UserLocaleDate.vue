<script>
import moment from 'moment'

export default {
  computed: {
    userLocaleDate () {
      if (this.dateUtc) {
        const offset = moment().utcOffset()

        var format = this.format || 'YYYY-MM-DD HH:mm:ss'

        return moment.utc(this.dateUtc).utcOffset(offset).format(format)
      } else {
        return 'N/A'
      }
    }
  }
}
</script>
