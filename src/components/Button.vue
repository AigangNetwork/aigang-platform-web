<template>
  <button class="aig__button" :class="colorize" @click="$emit('click', $event.target.value)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    colorize () {
      return {
        'aig__button--purple': this.color === 'purple',
        'aig__button--green': this.color === 'green',
        'aig__button--blue': this.color === 'blue'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__button {
  transition: all 100ms ease-in-out;
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
  height: 38px;
  font-size: 14px;
  line-height: 38px;
  padding: 0 35px;
  margin: 0;
  border: 0;
  text-decoration: none;
  color: white;
  font-family: $font-primary;
  background: darken($gray, 25);
  // box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25);
  &:hover {
    background: darken($gray, 30);
  }
  &:active {
    background: darken($gray, 35);
  }
  &:focus {
    outline: 0;
  }
  &[disabled] {
    opacity: 0.45;
    pointer-events: none;
    cursor: default;
  }
}

.aig__button--green {
  background: $green;
  &:hover {
    background: darken($green, 3);
  }
  &:active {
    background: darken($green, 6);
  }
}

.aig__button--purple {
  background: $purple;
  &:hover {
    background: darken($purple, 3);
  }
  &:active {
    background: darken($purple, 6);
  }
}
</style>
