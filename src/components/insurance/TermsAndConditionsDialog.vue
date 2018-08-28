<template>
  <el-dialog :title="$t('insurance.policy.termsAndConditions.title')" :visible.sync="show">
    <div class="terms-and-conditions-container">
      <ScrollableMarkupText class="scrollable-text" :text="termsAndConditions" @scrolledToBottom="onScrolledToBottom" />
      <div class="buttons">
        <el-button class="button" type="primary" @click="disagree">{{ $t('insurance.policy.termsAndConditions.buttons.disagree')
          }}
        </el-button>
        <el-button class="button" type="primary" :disabled="agreeButtonDisabled" @click="agree">{{ $t('insurance.policy.termsAndConditions.buttons.agree')
          }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import ScrollableMarkupText from './ScrollableMarkupText'

export default {
  components: { VueMarkdown, ScrollableMarkupText },
  props: ['isVisible', 'displayDialog', 'termsAndConditions'],
  data () {
    return {
      agreeButtonDisabled: true
    }
  },
  computed: {
    show: {
      get () {
        return this.isVisible
      },
      set (value) {
        this.displayDialog(value)
      }
    }
  },
  methods: {
    onScrolledToBottom () {
      this.agreeButtonDisabled = false
    },
    agree () {
      this.$emit('agreed')
    },
    disagree () {
      this.show = false
    }
  }
}
</script>
<style lang="scss">
  .terms-and-conditions-container {
    .scrollable-text {
      height: 330px;
    }
    .buttons {
      margin-top: 30px;
      text-align: center;
      .button {
        min-width: 200px;

        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 533px) {
    .terms-and-conditions-container .buttons .button {
      display: block;
      margin-right: auto;
      margin-left: auto;
    }

  }
</style>
