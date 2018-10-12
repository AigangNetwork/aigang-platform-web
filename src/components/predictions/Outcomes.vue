<template>
  <div class="outcomes">
    <a v-for="item in items" :key="item.id" @click="changeSelectedOutcome(item.index)">
      <el-card class="box-card outcome" :class="{ 'active': !disabled, 'disabled': disabled, 'selected': isOutcomeSelected(item.index) }">
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="index">{{ item.index }}</div>
        </div>
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

      .content {
        display: flex;
        .name {
          flex-grow: 1;
        }

        .index {
          flex-grow: 0;
          color: $gray;
        }
      }
    }

    .active:hover {
      color: $white;
      background: $yellow;
      cursor: pointer;
    }

    .active.selected {
      color: $white;
      background: $purple;
      cursor: auto;
    }

    .disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
</style>
