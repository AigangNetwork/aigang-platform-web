<template>
  <div>
    <el-row>
      <el-row class="input-section-title">{{$t('data.dataset.model.model')}}</el-row>
    </el-row>
    <transition-group name="slideDown">
      <div v-for="(model, index) in models" :key="index" v-if="model.length > 0">
        <div class="table-container">
          <div class="table-wrapper">
            <table>
              <thead class="table-header">
                <tr>
                  <th v-for="(key, index) in model[0]" :key="index">
                    <input v-model="model[0][index]" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in model" v-if="index !== 0" :key="index">
                  <td v-for="(colData, i) in row" :key="i">
                    <input v-model="row[i]" />
                  </td>
                </tr>
              </tbody>
            </table>
            <img src="/static/add-button.svg" alt="add-row-button" @click="addRow(index)" class="table-action-button">
          </div>
          <div class="buttons-container">
            <img src="/static/delete-button.svg" alt="delete-button" @click="models.splice(index, 1)" class="table-action-button">
            <img src="/static/add-button.svg" alt="add-column-button" @click="addColumn(index)" class="table-action-button">
            <span></span>
          </div>
        </div>
      </div>
    </transition-group>
    <el-row class="table-create-container">
      <p>{{$t('data.dataset.model.newTable')}}</p>

      <input type="number" v-model="colsLength" />
      <p>{{$t('data.dataset.model.on')}}</p>
      <input type="number" v-model="rowsLength" />

      <div class="button-container">
        <el-button @click="createTable" class="profile-button">{{ $t('data.dataset.model.create') }}</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>

export default {
  props: ['dataModel'],
  data () {
    return {
      colsLength: '',
      rowsLength: '',
      colsArray: [],
      models: []
    }
  },
  methods: {
    createTable () {
      const cols = parseInt(this.colsLength)
      const rows = parseInt(this.rowsLength)

      let model = []
      model.push(new Array(cols).fill(this.$t('data.dataset.model.placeholder.title')))

      for (let i = 0; i < rows; i++) {
        model.push(new Array(cols).fill(this.$t('data.dataset.model.placeholder.data')))
      }

      this.models.push(model)

      this.colsLength = ''
      this.rowsLength = ''

      this.$emit('input', this.models)
    },
    addColumn (index) {
      this.models[index][0].push(this.$t('data.dataset.model.placeholder.title'))

      this.models[index].forEach((value, index) => {
        if (index !== 0) {
          value.push(this.$t('data.dataset.model.placeholder.data'))
        }
      })
    },
    addRow (index) {
      const cols = this.models[index][0].length
      this.models[index].push(
        new Array(cols).fill(this.$t('data.dataset.model.placeholder.data'))
      )
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .table-create-container {
    border: solid 1px $gray;
    padding: 12px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 52px;

    p {
      &:first-child {
        margin: 11px 47px 11px 26px;
      }
      font-weight: 500;
      color: $purple;
      display: inline-block;
    }

    input {
      height: 48px;
      width: 56px;
      border-radius: 2px;
      border: 1px solid $button-purple;
      padding: 15px;
      font-family: Roboto;
      font-size: 14px;
      margin: 0 8px 0 8px;
    }

    .button-container {
      flex-grow: 1;
      text-align: right;
      margin-right: 12px;
    }
  }

  .table-container {
    @include aig-table;
    td {
      text-align: center;
      border-left: 1px solid $border-light-purple;
    }
    th {
      padding: 20px !important;
      border-right: 1px solid black;
      &:last-child {
        border-right: $border-light-purple;
      }
      input {
        font-size: 16px;
      }
    }
    input {
      height: 30px;
      font-size: 14px;
      border: none;
      border-bottom: 1px solid $light-grey-border;
      text-align: center;
    }
    thead {
      input {
        background: none;
        border-bottom: 1px solid white;
        color: white;
      }
    }
    table {
      border: none;
      border-left: 1px solid $border-light-purple;
      border-right: 1px solid $border-light-purple;
      margin: 20px auto;
    }
    &:hover {
      .table-action-button {
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  .buttons-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 50%;
    margin-left: 10px;
  }

  .table-action-button {
    height: 24px;
    width: 24px;
    transition: all 200ms;
    opacity: 0;
    pointer-events: none;
    &:hover {
      cursor: pointer;
    }
  }

  .table-wrapper {
    text-align: center;
    .table-action-button {
      margin-top: -10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
