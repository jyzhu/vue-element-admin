<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        v-for="meta in tableMeta"
        :key="meta.prop"
        :prop="meta.prop"
        :label="meta.label"
        :width="meta.widthStyle"/>
      <el-table-column
        label="操作" >
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableMeta: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
