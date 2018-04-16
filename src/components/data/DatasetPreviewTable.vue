<template>
  <div class="table-container">
    <table>
      <thead class="table-header">
        <tr>
          <th v-for="(key, index) in cols" :key="index">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="colData in row" :key="colData">
            {{colData}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    cols: {
      required: true
    },
    rows: {
      required: true
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .table-container {
    @include aig-table;
  }
</style>
