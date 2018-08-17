<template>
    <div class="scrollable-markup-text-container" @scroll="handleScroll" ref="scrollableMarkupTextContainer">
      <vue-markdown class="markup-content" :html="false" :source="text"></vue-markdown>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: { VueMarkdown },
  props: ['text'],
  mounted () {
    if (this.text) {
      this.handleScroll({ target: this.$refs.scrollableMarkupTextContainer })
    }
  },
  updated () {
    this.handleScroll({ target: this.$refs.scrollableMarkupTextContainer })
  },
  methods: {
    handleScroll ({ target }) {
      const result = this.isElementScrolledToBottom(target)
      if (result) {
        this.triggerScrolledToBottomEvent()
      }
    },
    isElementScrolledToBottom (el) {
      return el && el.scrollTop >= (el.scrollHeight - el.offsetHeight)
    },
    triggerScrolledToBottomEvent () {
      this.$emit('scrolledToBottom')
    }
  }
}
</script>
<style lang="scss">
  @import '~helpers/variables';

  .scrollable-markup-text-container {
    overflow-y: scroll;
    border: 1px solid $dark-gray;
    height: 100px;

    .markup-content{
      padding: 10px;
    }
  }
</style>
