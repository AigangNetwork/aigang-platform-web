<template>
  <el-dropdown size="small" type="primary" split-button :trigger="trigger || 'hover'" @command="onItemSelected">
    <span>{{ selectedItemName }}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item, index) in items" :command="item.value" :key="index">{{ item.name }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: ['items', 'trigger'],
  data () {
    return {
      selectedValue: ''
    }
  },
  computed: {
    selectedItemName () {
      const selectedValue = this.selectedValue

      if (this.selectedValue) {
        for (let i in this.items) {
          const item = this.items[i]
          if (item.value === selectedValue) {
            return item.name
          }
        }
      } else {
        return this.items[0].name
      }
    }
  },
  methods: {
    onItemSelected (value) {
      this.selectedValue = value
      this.$emit('itemSelected', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

</style>
