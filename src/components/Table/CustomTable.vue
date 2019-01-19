<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      height="500"
      style="width: 100%">
      <el-table-column v-if="expandable === true" type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="meta in expandFormMeta" :key="meta.prop" :label="meta.label">
              <span>{{ props.row[meta.prop] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-for="meta in tableMeta"
        :formatter="meta.formatter"
        :key="meta.prop"
        :prop="meta.prop"
        :label="meta.label"
        :width="meta.widthStyle"/>
      <el-table-column
        label="操作" >
        <template slot-scope="scope">
          <el-button v-if="detailable === true" type="primary" icon="el-icon-info" circle @click="handleClick('detail', scope.row)"/>
          <el-button v-if="editable === true" type="primary" icon="el-icon-edit" circle @click="handleClick('edit', scope.row)"/>
          <el-button v-if="deletable === true" type="primary" icon="el-icon-delete" circle @click="handleClick('delete', scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export const insuranceTypeMap = {
  YIWAI: '意外险',
  ZHONGJI: '重疾险',
  YILIAO: '医疗险',
  SHOUXIAN: '寿险',
  CAICHAN: '财产险',
  CHEXIAN: '车险'
}

export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableMeta: {
      type: Array,
      required: true
    },
    expandFormMeta: {
      type: Array,
      default: function _default() {
        return []
      }
    }
  },
  data() {
    return {
      editable: false,
      detailable: false,
      deletable: false,
      expandable: false
    }
  },
  mounted() {
    debugger
    this.editable = !this._.isEmpty(this._events.edit)
    this.detailable = !this._.isEmpty(this._events.detail)
    this.deletable = !this._.isEmpty(this._events.delete)
    this.expandable = !this._.isEmpty(this.expandFormMeta)
  },
  methods: {
    handleClick: function(event, row) {
      debugger
      this.$emit(event, row)
    },

    formatterInsuranceType: function(row, column) {
      if (row[column.property]) {
        return insuranceTypeMap[row[column.property]]
      }
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>
