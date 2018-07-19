<template>
  <el-dialog :title="$t('insurance.product.termsAndConditions')" :visible.sync="show">
    <vue-markdown class="markup-content" :html="false" :source="termsAndConditions"></vue-markdown>
  </el-dialog>

</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: { VueMarkdown },
  props: ['isVisible', 'displayDialog', 'termsAndConditions'],
  computed: {
    show: {
      get () {
        return this.isVisible
      },
      set (value) {
        this.displayDialog(value)
      }
    }
  }
}
</script>
