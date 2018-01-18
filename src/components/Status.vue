<template>
  <div class="aig__status" :class="statusClass">
    <div class="aig__status__content" v-if="status === 'active' && date !== ''"></div>
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    status: {
      required: true,
      type: String
    },
    date: {
      default: ''
    }
  },
  computed: {
    statusClass () {
      return {
        'aig__status--green': this.status === 'active'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__status {
  display: flex;
  align-items: center;
  &.aig__status--green {
    &:before {
      background: $green;
    }
  }
  &:before {
    content: '';
    width: 8px;
    height: 8px;
    background: darken($gray, 10);
    border-radius: 50%;
  }
}
.aig__status__badge {

}
.aig__status__content {
  margin-left: 6px;
  font-size: 12px;
  color: darken($gray, 50);
}
</style>
