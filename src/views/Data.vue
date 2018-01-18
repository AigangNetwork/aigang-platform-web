<template>
  <div>
    <div class="aig__view__head">
      <div class="aig__view__title">Data</div>
    </div>
    <div class="aig__view__body">
      <div class="aig__datas">
        <DataItem/>
        <DataItem/>
        <DataItem/>
      </div>
      <div style="margin-top: 30px;">
        <Button color="purple" @click="modalUpload = true">Upload new data</Button>
        <el-dialog title="Upload new data" :visible.sync="modalUpload" width="30%">
          <span>This is a message</span>
          <span slot="footer" class="dialog-footer">
            <Button @click="modalUpload = false">Cancel</Button>
            <Button color="purple" @click="modalUpload = false">Upload</Button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import DataItem from '@/components/DataItem'
import Button from '@/components/Button'

export default {
  name: 'DataView',
  components: {
    DataItem,
    Button
  },
  data () {
    return {
      modalUpload: false,
      msg: 'Data view'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/mixins';
.aig__datas {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > .aig__data {
    flex-basis: calc(33.333% - 15px);
  }
}
</style>
