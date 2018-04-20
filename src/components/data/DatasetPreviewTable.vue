<template>
  <div class="table-container">
    <table>
      <thead class="table-header">
        <tr>
          <th v-for="key in cols" :key="key">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="(colData, index) in row" :key="index">
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
  .table-container {
    display: flex;
  }

  table {
    margin-bottom: 40px;
    max-width: 823px;
    border: 1px solid $border-light-purple;
    border-radius: 4px;
    display: block;
    overflow-x: auto;
    border-collapse: collapse;
    .table-header {
      color: white;
      background-color: $button-purple;
      height: 50px;
    }
    tr {
      td {
        align: center;
        padding: 19px 17px 19px 17px;
        max-width: 250px;
        word-wrap: break-word;
        border-bottom: 1px solid $border-light-purple;
        border-right: 1px solid $border-light-purple;
      }
      th {
        font-weight: 400;
        word-wrap: break-word;
        padding: 0 10px 0 10px;
      }
    }
  }

</style>
