<script>
import moment from 'moment'

export default {
  computed: {
    endDate () {
      let endDateUtc = moment.utc(this.product.endDateUtc)
      let result = endDateUtc.from(moment().utcNow)
      return result
    }
  }
}
</script>
