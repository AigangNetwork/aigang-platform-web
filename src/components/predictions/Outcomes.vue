<template>
  <div class="outcomes">
    <a v-for="item in items" :key="item.id" @click="changeSelectedOutcome(item.index)">
      <el-card class="box-card" :class="{ 'outcome': !disabled, 'outcome-disabled': disabled, 'selected': isOutcomeSelected(item.index) }">
        <div class="text item">{{ item.name }}</div>
      </el-card>
    </a>
  </div>
</template>

<script>
export default {
  props: ['items', 'selectedOutcomeIndex', 'disabled'],
  methods: {
    isOutcomeSelected (id) {
      return this.selectedOutcomeIndex === id
    },
    changeSelectedOutcome (id) {
      if (!this.disabled) {
        this.$emit('selected', id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .outcomes {
    .outcome {
      margin-bottom: 10px;
    }

    .outcome:hover {
      color: $white;
      background: $yellow;
      cursor: pointer;
    }

    .outcome.selected {
      color: $white;
      background: $purple;
      cursor: auto;
    }

    .outcome-disabled {
      margin-bottom: 10px;
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
</style>
