<template>
  <el-row>

    <transition name="slideDown">
      <div v-if="isStructured && structure.length > 0">
        <h4 class="input-section-title">{{$t('data.upload.titles.structure')}}</h4>
        <el-row :gutter="20" type="flex" v-for="(column, index) in structure" :key="index">
          <div class="column-name">
            <h5 class="structure-type-title">{{column.name}}</h5>
          </div>
          <div class="column-description">
            <el-form-item size="medium">
              <el-input type="textarea" :placeholder="$t('data.upload.input.placeholder.column')" v-model="column.description"></el-input>
            </el-form-item>
          </div>
          <div class="column-type">
            <el-select size=" medium " aria-required="true " v-model="column.dataType " :default-first-option="true
            " :placeholder="$t( 'data.upload.input.placeholder.dataType') ">
              <el-option v-for="(item, index) in dataTypeOptions " :key="index " :label="item " :value="item ">
              </el-option>
            </el-select>
          </div>
        </el-row>
        <div v-if="!isStructureValid" class="aig-form-error">
          {{$t('data.dataset.validation.structureFieldEmpty')}}
        </div>
      </div>
    </transition>
    <transition name="slideDown ">
      <div v-if="!isStructured || structure.length===0 ">
        <h4 class="input-section-title ">{{$t('data.upload.titles.structure')}}</h4>
        <el-form-item>
          <el-input :placeholder="$t( 'data.upload.input.placeholder.structure') " type="textarea " :value="value
            " @change="value=> $emit('input',value)"></el-input>

          <div v-if="!isStructureValid" class="aig-form-error">
            {{$t('data.dataset.validation.structureFieldEmpty')}}
          </div>
        </el-form-item>
      </div>
    </transition>
  </el-row>
</template>
<script>
export default {
  props: ['structure', 'value', 'isStructured'],
  data () {
    return {
      dataTypeOptions: ['String', 'Numeric', 'Boolean'],
      isStructureValid: true
    }
  },
  methods: {
    validate () {
      if (this.isStructured && this.structure.length > 0) {
        for (var obj in this.structure) {
          for (var prop in this.structure[obj]) {
            if (this.structure[obj][prop] === undefined || this.structure[obj][prop] === '') {
              this.isStructureValid = false
              return false
            }
          }
        }
      } else {
        if (this.value.length <= 0) {
          this.isStructureValid = false
          return false
        }
      }
      this.isStructureValid = true
      return true
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .structure-type-title {
    margin: 10px 0px 0px 0px;
    color: $purple;
    font-weight: 600;
  }

  .column-name,
  .column-type {
    width: 20%;
    padding: 0 10px;

    h5 {
      word-wrap: break-word;
    }
  }

  .column-description {
    width: 60%;
    padding: 0x 10px;
  }

  @media screen and (min-width: 100px) and (max-width: 480px) {
    .structure-type-title {
      margin: 10px 0px 0px 0px;
      color: $purple;
      font-weight: 600;
    }

    .column-name {
      width: 28%;
      padding: 0 5px;
    }

    .column-type {
      width: 32%;
      padding: 0 5px;
    }

    .column-description {
      width: 40%;
    }
  }

</style>
