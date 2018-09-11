<template>
  <div class="outcomes">
    <a v-for="item in items" :key="item.id" @click="changeSelectedOutcome(item.id)">
      <el-card class="box-card outcome" :class="{ 'selected': isOutcomeSelected(item.id) }">
        <div class="text item">{{ item.name }}</div>
      </el-card>
    </a>
  </div>
</template>

<script>
export default {
  props: ['items', 'selectedOutcomeId'],
  methods: {
    isOutcomeSelected (id) {
      return this.selectedOutcomeId === id
    },
    changeSelectedOutcome (id) {
      this.$emit('selected', id)
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
  }

</style>
