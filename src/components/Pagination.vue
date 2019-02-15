<template>
  <el-pagination :disabled="disabled" class="aig-pagination" background layout="prev, pager, next" :page-count="totalPageCount" size="small" @current-change="handlePageChange"
    :current-page="currentPage">
  </el-pagination>
</template>
<script>
export default {
  props: ['totalPageCount', 'callback', 'currentPage', 'disabled'],
  methods: {
    handlePageChange (page) {
      this.callback(page)
    }
  }
}

</script>
