<template>
  <div class="permissions-group">
    <div class="horizontal-line"></div>
    <div class="title">{{group.title}}</div>
    <div class="items-container" v-for="(item, index) in group.items" v-bind:key="index">
      <div class="item">
        <div class="left">
          <div>{{ item.title }}</div>
          <div class="description">{{ item.description }}</div>
        </div>
        <el-switch v-bind:value="item.value" @change="onChange(item.id, $event)"/>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['group'],
  methods: {
    onChange (id, value) {
      this.$emit('changed', id, value)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .permissions-group {
    margin-bottom: 20px;

    .title {
      margin-top: 20px;
      margin-bottom: 20px;
      font-weight: bold;
    }

    .items-container {
        margin-left: 20px;
      .item {
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;

        .left {
          flex-grow: 1;
          margin-right: 20px;

          .description {
            margin-top: 10px;
            font-size: 12px;
            color: $dark-gray;
          }
        }

        .el-switch {
          flex-grow: 0;
        }
      }
    }
  }

  @media screen and (min-width: 680px) {
    .permissions-group {
      .el-switch {
        margin-right: 20px;
      }
    }
  }
</style>
