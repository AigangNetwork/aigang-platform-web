<script>
import moment from 'moment'

export default {
  computed: {
    userLocaleDate () {
      return moment(this.dateUtc).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
