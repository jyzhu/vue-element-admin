<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button> {{ message }}
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="50" />
      <el-table-column
        prop="tradeDate"
        label="日期"
        width="180" />
      <el-table-column
        prop="name"
        label="姓名"
        width="180" />
      <el-table-column
        prop="address"
        label="地址" />
      <el-table-column
        label="操作" >
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="日期" prop="tradeDate">
          <el-date-picker v-model="temp.tradeDate" type="date" placeholder="Please pick a date"/>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getTradeLog, createTradeLog, updateTradeLog } from '@/api/financing'

export default {
  data() {
    return {
      message: 'Hello Vue.js!',
      // tableData: [{
      //   id: 1,
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   id: 2,
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1517 弄'
      // }, {
      //   id: 3,
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1519 弄'
      // }, {
      //   id: 4,
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1516 弄'
      // }],
      tableData: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      temp: {
        id: undefined,
        tradeDate: '',
        name: '',
        address: ''
      },
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }],
        tradeDate: [{ type: 'date', required: true, message: 'trade date is required', trigger: 'change' }]
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
    resetTemp() {
      this.temp = {
        id: undefined,
        tradeDate: '',
        name: '',
        address: ''
      }
    },
    handleCreate: function() {
      this.resetTemp()
      this.message = this.message.split('').reverse().join('')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },

    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createTradeLog(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    updateData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateTradeLog(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    handleUpdate: function(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.temp = Object.assign({}, row) // copy obj
    }
  }
}
</script>

<style scoped>

</style>
