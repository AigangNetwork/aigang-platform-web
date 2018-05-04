<template>
  <el-row>

    <transition name="slideDown">
      <div v-if="isStructured && structure.length > 0">
        <h4 class="input-section-title">{{$t('data.upload.titles.structure')}}</h4>
        <el-row :gutter="20" type="flex" v-for="(column, index) in structure" :key="index">
          <el-col :span="24">
            <h5 class="structure-type-title">{{column.name}}</h5>
          </el-col>
          <el-col>
            <el-form-item size="medium">
              <el-input :placeholder="$t('data.upload.input.placeholder.column')" v-model="column.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-select size="medium" aria-required="true" v-model="column.dataType" :default-first-option="true" :placeholder="$t('data.upload.input.placeholder.dataType')">
              <el-option v-for="(item, index) in dataTypeOptions" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </transition>
    <transition name="slideDown">
      <div v-if="!isStructured || structure.length === 0">
        <h4 class="input-section-title">{{$t('data.upload.titles.structure')}}</h4>
        <el-form-item>
          <el-input :placeholder="$t('data.upload.input.placeholder.structure')" type="textarea" :value="value" @change="value => $emit('input',value)"></el-input>
        </el-form-item>
      </div>
    </transition>

    <el-row v-if="!isStructureValid">
      <div class="aig-form-error">
        {{$t('data.dataset.validation.structureFieldEmpty')}}
      </div>
    </el-row>
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

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .el-col.el-col-24 {
      width: 33%;
    }
  }

</style>
