<template>
  <div class="aig-status" :class="statusClass">
    <div class="aig-status-content" v-if="status === 'active' && date !== ''"></div>
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    status: {
      required: false,
      type: String
    },
    date: {
      default: ''
    }
  },
  computed: {
    statusClass () {
      return {
        'aig-status--green': this.status === 'active',
        'aig-status--red': this.status === 'closed'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .aig-status {
    display: flex;
    align-items: center;
    &.aig-status--green {
      &:before {
        background: linear-gradient(to bottom right, $green 0%, $green 100%);
      }
    }
    &.aig-status--red {
      &:before {
        background: linear-gradient(to bottom right, $red 0%, $red 100%);
      }
    }
    &:before {
      content: '';
      width: 8px;
      height: 8px;
      background: darken($gray, 10);
      border-radius: 50%;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    }
  }

  .aig-status-content {
    margin-left: 6px;
    font-size: 12px;
    color: darken($gray, 50);
  }
</style>
