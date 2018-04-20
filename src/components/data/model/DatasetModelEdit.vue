<template>
  <div>
    <el-row>
      <el-row class="input-section-title">{{$t('data.dataset.model.model')}}</el-row>
    </el-row>
    <transition-group name="slideDown">
      <div v-for="(model, index) in value" :key="index" v-if="value.length > 0">
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
            <img src="/static/delete-button.svg" alt="delete-button" @click="deleteTable(index)" class="table-action-button">
            <img src="/static/add-button.svg" alt="add-column-button" @click="addColumn(index)" class="table-action-button">
            <span></span>
          </div>
        </div>
      </div>
    </transition-group>
    <el-row class="table-create-container">
      <p>{{$t('data.dataset.model.newTable')}}</p>
      <div>
        <input v-model="colsLength" @input="event => validateInput(event)" />
        <p>{{$t('data.dataset.model.on')}}</p>
        <input v-model="rowsLength" @input="event => validateInput(event)" />
      </div>
      <span class="aig-error" v-if="lengthError">{{$t('data.dataset.validation.OnlyIntegersAllowed')}}</span>
      <span class="aig-error" v-if="sizeError">{{$t('data.dataset.validation.TableTooBig')}}</span>
      <div class="create-button-container">
        <el-button @click="createTable" class="profile-button">{{ $t('data.dataset.model.create') }}</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>

export default {
  props: ['value', 'validationCallback'],
  data () {
    return {
      lengthError: false,
      sizeError: false,
      colsLength: '',
      rowsLength: '',
      colsArray: [],
      models: []
    }
  },
  watch: {
    models () {
      this.models = this.value
    }
  },
  methods: {
    createTable () {
      if (this.lengthError) {
        return
      }

      this.models = this.value

      const cols = parseInt(this.colsLength)
      const rows = parseInt(this.rowsLength)

      if (cols > 10 || rows > 10) {
        this.sizeError = true
        return
      } else {
        this.sizeError = false
      }

      let model = []
      model.push(new Array(cols).fill(this.$t('data.dataset.model.placeholder.title')))

      for (let i = 0; i < rows; i++) {
        model.push(new Array(cols).fill(this.$t('data.dataset.model.placeholder.data')))
      }

      this.models.push(model)

      this.colsLength = ''
      this.rowsLength = ''

      this.$emit('input', this.models)
      this.validationCallback(this.models)
    },
    addColumn (index) {
      this.models = this.value
      this.models[index][0].push(this.$t('data.dataset.model.placeholder.title'))

      this.models[index].forEach((value, index) => {
        if (index !== 0) {
          value.push(this.$t('data.dataset.model.placeholder.data'))
        }
      })
    },
    addRow (index) {
      this.models = this.value
      const cols = this.models[index][0].length
      this.models[index].push(
        new Array(cols).fill(this.$t('data.dataset.model.placeholder.data'))
      )
    },
    validateInput (event) {
      this.sizeError = false

      if (event.target.value === '') {
        return
      }

      const number = parseInt(event.target.value)

      if (!number) {
        this.lengthError = true
      } else {
        this.lengthError = false
      }
    },
    deleteTable (index) {
      this.models = this.value
      this.models.splice(index, 1)
      this.validationCallback(this.models)
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
        max-width: 100%;
      }

      input {
        width: 120px;
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
