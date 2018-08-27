<template>
  <div>
    <h3 class="section-title">{{$t('data.dataset.navigation.coefficients')}}</h3>
    <transition-group name="slideDown">
      <div v-for="(model, tableIndex) in value.data" :key="tableIndex" v-if="value.data.length > 0">
        <el-row>
          <el-row class="input-section-title">{{$t('data.dataset.model.tableTitle')}}</el-row>
          <el-form-item
            :prop="'model.titles.' + tableIndex"
            :rules="{
              required: true,
              message: $t('data.dataset.validation.modelTitleEmpty'),
              trigger: 'blur'
            }">
            <el-input :placeholder=" $t( 'data.dataset.model.placeholder.modelTitle') " v-model="models.titles[tableIndex]"></el-input>
          </el-form-item>
        </el-row>
        <div class="table-container ">
          <div class="table-wrapper ">
            <table>
              <thead class="table-header ">
                <tr>
                  <th v-for="(key, index) in model[0] " :key="index ">
                    <el-form-item :prop="'model.data.' + tableIndex + '.0.' + index" :rules="{
                        required: true, message: $t('data.dataset.validation.tableCellEmpty'), trigger: 'blur'
                      }">
                      <el-input type="textarea" v-model="model[0][index] " :placeholder="$t('data.dataset.model.placeholder.title')" maxlength="100 "></el-input>
                    </el-form-item>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in model " v-if="index !==0 " :key="index ">
                  <td v-for="(colData, i) in row " :key="i ">
                    <el-form-item :prop="'model.data.' + tableIndex + '.' + index + '.' + i" :rules="{
                      required: true, message: $t('data.dataset.validation.tableCellEmpty'), trigger: 'blur'
                    }">
                      <el-input type="textarea" v-model="row[i]" :placeholder="$t('data.dataset.model.placeholder.data')" maxlength="150 "></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </tbody>
            </table>
            <img src="/static/add-button.svg " alt="add-row-button " @click="addRow(tableIndex) " class="table-action-button ">
            <img src="/static/remove-button.svg " alt="add-row-button " @click="removeRow(tableIndex) " class="table-action-button ">
          </div>
          <div class="buttons-container ">
            <img src="/static/delete-button.svg " alt="delete-button " @click="deleteTable(tableIndex) " class="table-action-button ">
            <span class="inner-buttons-container ">
              <img src="/static/add-button.svg " alt="add-column-button " @click="addColumn(tableIndex) " class="table-action-button ">
              <img src="/static/remove-button.svg " alt="add-row-button " @click="removeColumn(tableIndex) " class="table-action-button ">
            </span>
            <span></span>
          </div>
        </div>
      </div>
    </transition-group>
    <el-row class="table-create-container">
      <p>{{$t('data.dataset.model.newTable')}}</p>
      <div>
        <el-tooltip :content="$t('data.dataset.model.tableColumns')">
          <input v-model="colsLength" type="number" />
        </el-tooltip>
        <p>{{$t('data.dataset.model.on')}}</p>
        <el-tooltip :content="$t('data.dataset.model.tableRows')">
          <input v-model="rowsLength" type="number" />
        </el-tooltip>
      </div>
      <span class="aig-error" v-if="sizeTooBigError">{{$t('data.dataset.validation.tableTooBig')}}</span>
      <span class="aig-error" v-else-if="sizeTooSmallError">{{$t('data.dataset.validation.tableTooSmall')}}</span>
      <div v-if="colsLength && rowsLength" class="create-button-container">
        <el-button @click="createTable" class="profile-button">{{ $t('data.dataset.model.create') }}</el-button>
      </div>
      <div v-else class="create-button-container">
        <el-button disabled class="profile-button">{{ $t('data.dataset.model.create') }}</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>

export default {
  props: ['value', 'validateField'],
  data () {
    return {
      sizeTooBigError: false,
      sizeTooSmallError: false,
      colsLength: '',
      rowsLength: '',
      colsArray: [],
      models: []
    }
  },
  watch: {
    value () {
      this.models = this.value
    }
  },
  methods: {
    createTable () {
      this.models = this.value

      const cols = parseInt(this.colsLength)
      const rows = parseInt(this.rowsLength)

      if (!this.isTableSizeValid(cols, rows)) return

      let model = []
      model.push(new Array(cols).fill(''))

      for (let i = 0; i < rows; i++) {
        model.push(new Array(cols).fill(''))
      }

      this.models.titles.push('')
      this.models.data.push(model)

      this.colsLength = ''
      this.rowsLength = ''
      this.$emit('input', this.models)
    },
    addColumn (index) {
      this.models = this.value
      this.models.data[index][0].push('')

      this.models.data[index].forEach((value, index) => {
        if (index !== 0) {
          value.push('')
        }
      })
    },
    removeColumn (index) {
      this.models = this.value
      this.models.data[index].forEach(value => value.pop())
    },
    addRow (index) {
      this.models = this.value
      const cols = this.models.data[index][0].length
      this.models.data[index].push(
        new Array(cols).fill('')
      )
    },
    removeRow (index) {
      this.models = this.value
      this.models.data[index].pop()
    },
    isTableSizeValid (cols, rows) {
      if (cols > 10 || rows > 50) {
        this.sizeTooBigError = true
        return false
      } else if (cols < 1 || rows < 1) {
        this.sizeTooSmallError = true
        return false
      } else {
        this.sizeTooBigError = false
        this.sizeTooSmallError = false
        return true
      }
    },
    deleteTable (index) {
      this.models = this.value
      this.models.data.splice(index, 1)
      this.models.titles.splice(index, 1)

      for (let tableIndex in this.models.data) {
        this.validateField('model.titles.' + tableIndex)

        for (let index in this.models.data[tableIndex]) {
          for (let i in this.models.data[tableIndex][index]) {
            this.validateField('model.data.' + tableIndex + '.' + index + '.' + i)
          }
        }
      }
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
    margin-bottom: 30px;

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

    .create-button-container {
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
    }
    table {
      border: none;
      border-left: 1px solid $border-light-purple;
      border-right: 1px solid $border-light-purple;
      margin: 20px auto;

      .el-form-item {
        margin-bottom: 0px;
      }

      tr td,
      tr th {
        max-width: min-content;
        max-width: -moz-available;
      }
    }

    .inner-buttons-container {
      display: flex;
      flex-direction: column;

      .table-action-button {
        margin-bottom: 3px;
      }
    }

    .table-action-button {
      opacity: 0;
      pointer-events: none;
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
    &:hover {
      cursor: pointer;
    }
  }

  .table-wrapper {
    text-align: center;
    max-width: 100%;

    .table-action-button {
      margin-top: -10px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 1024px) {
    .table-container .table-action-button {
      opacity: 1;
      pointer-events: all;
    }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {

    .table-create-container {
      flex-wrap: wrap;
      flex-flow: row wrap;

      .create-button-container {
        text-align: center;
        margin: 20px 0;
      }

      >p:first-child {
        margin-right: 26px;
        width: 100%;
        text-align: center
      }

      >div {
        width: 100%;
        text-align: center
      }
    }

    .table-container {

      .table-wrapper {
        max-width: calc(100% - 14px);
      }

      table {
        td,
        th {
          padding: 15px 12px !important;
        }
      }
    }
  }
</style>
