<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button> {{ message }}
    </div>
    <custom-table :table-data="tableData" :table-meta="tableMeta" :expand-form-meta="expandFormMeta" @edit="handleUpdate" @delete="handleDelete"/>
    <form-dialog :form-status="dialogStatus" :is-visible="dialogFormVisible" :data-form="temp" :form-meta="formMeta" @create="createData" @update="updateData"/>
  </div>
</template>

<script>
import { getTradeLog, createTradeLog, updateTradeLog } from '@/api/financing'
import CustomTable from '@/components/table/CustomTable'
import FormDialog from './components/FormDialog'

export default {
  components: { CustomTable, FormDialog },
  data() {
    return {
      message: 'Hello Vue.js!',
      tableMeta: [
        { prop: 'id', label: '序号', widthStyle: '50' },
        { prop: 'tradeDate', label: '日期', widthStyle: '180' },
        { prop: 'name', label: '姓名', widthStyle: '180' },
        { prop: 'address', label: '地址', widthStyle: '250' }
      ],
      expandFormMeta: [
        { prop: 'tradeDate', label: '日期', widthStyle: '180' },
        { prop: 'name', label: '姓名', widthStyle: '180' },
        { prop: 'address', label: '地址', widthStyle: '250' }
      ],
      tableData: [],
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        id: undefined,
        tradeDate: '',
        name: '',
        address: ''
      },
      formMeta: {
        rules: {
          name: [{ required: true, message: 'name is required', trigger: 'blur' }],
          tradeDate: [{ required: true, type: 'date', message: 'tradeDate is required', trigger: 'blur' }]
        },
        items: [
          { type: 'string', label: '姓名', prop: 'name' },
          { type: 'date', label: '日期', prop: 'tradeDate' },
          { type: 'string', label: '地址', prop: 'address' }
        ]
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData: function() {
      return new Promise((resolve) => {
        getTradeLog().then(data => {
          console.log(data)
          this.tableData = data.data
          resolve()
        })
      })
    },
    resetDataForm() {
      this.temp = {
        id: undefined,
        tradeDate: '',
        name: '',
        address: ''
      }
    },
    handleCreate: function() {
      this.resetDataForm()
      this.message = this.message.split('').reverse().join('')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },

    createData: function() {
      createTradeLog(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },

    updateData: function() {
      updateTradeLog(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },

    handleUpdate: function(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.temp = Object.assign({}, row) // copy obj
    },

    getDetail: function(row) {
      console.log('getDetail')
    },

    handleDelete: function(row) {
      console.log('handleDelete')
    }
  }
}
</script>

<style scoped>

</style>
