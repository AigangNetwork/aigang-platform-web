<template>
  <div>
    <Header>
      <div class="aig__view__title" slot="title">Data</div>
    </Header>
    <div class="aig__view__body aig__container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">AiGang Network</el-breadcrumb-item>
        <el-breadcrumb-item>Data</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="aig__datas" style="margin-top: 30px">
        <DataItem :creatable="true" @click="modalUpload = true" />
        <DataItem/>
        <DataItem/>
        <DataItem/>
      </div>
      <div style="margin-top: 30px;">
        <el-dialog title="Upload new data" :visible.sync="modalUpload" width="560px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Activity name" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Activity zone" prop="region">
              <el-select v-model="ruleForm.region" placeholder="Activity zone">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Activity time" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker type="fixed-time" placeholder="Pick a time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery" prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="Resources" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="Sponsorship"></el-radio>
                <el-radio label="Venue"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <el-pagination
        style="text-align: center; margin-top: 30px;"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import DataItem from '@/components/DataItem'
import Header from '@/components/Header'

export default {
  name: 'DataView',
  components: {
    DataItem,
    Header
  },
  data () {
    return {
      modalUpload: false,
      msg: 'Data view',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        region: [
          { required: true, message: 'Please select Activity zone', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please input activity form', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/mixins';
.aig__datas {
  width: 100%;
  font-size: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > .aig__data {
    margin: 8px 0;
    width: calc(25% - 8px);
  }
}
</style>
