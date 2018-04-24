<script>
import moment from 'moment'

export default {
  computed: {
    created () {
      let createdUtc = moment.utc(this.createdUtc)
      let result = createdUtc.from(moment().utcNow)
      return result
    }
  }
}
</script>
