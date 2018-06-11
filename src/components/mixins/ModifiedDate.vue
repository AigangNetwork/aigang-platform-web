<script>
import moment from 'moment'

export default {
  computed: {
    modified () {
      if (this.createdUtc !== this.modifiedUtc) {
        let modifiedUtc = moment.utc(this.modifiedUtc)
        let result = modifiedUtc.from(moment().utcNow)
        return result
      } else {
        return null
      }
    }
  }
}
</script>
