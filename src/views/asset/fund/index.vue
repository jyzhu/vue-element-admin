<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button> {{ message }}
    </div>
    <el-table
      :data="tableData"
      stripe
      height="500"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="50" />
      <el-table-column
        prop="fundCode"
        label="基金编码"
        width="180" />
      <el-table-column
        prop="capital"
        label="本金"
        width="100" />
      <el-table-column
        prop="shares"
        label="份数" />
      <el-table-column
        label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-info" circle @click="getDetail(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="基金代码" prop="fundCode">
          <el-select v-model="temp.fundCode" filterable placeholder="请选择">
            <el-option
              v-for="item in fundOptions"
              :key="item.fundCode"
              :label="item.fundName"
              :value="item.fundCode"/>
          </el-select>
        </el-form-item>
        <el-form-item label="确认日期" prop="confirmedDate">
          <el-date-picker v-model="temp.confirmedDate" type="date" placeholder="Please pick a date"/>
        </el-form-item>
        <el-form-item label="申购净值" prop="netValue">
          <el-input v-model="temp.netValue" />
        </el-form-item>
        <el-form-item label="申购费率" prop="costRate">
          <el-input-number v-model="temp.costRate" :step="0.0000" />
        </el-form-item>
        <el-form-item label="本金" prop="capital">
          <el-input-number v-model="temp.capital" :step="10" />
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
import { listAllFundInvestmentRecords, createFundInvestmentTradeLog, listAllFunds } from '@/api/financing'

export default {
  data() {
    return {
      message: 'Hello Vue.js!',
      tableData: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      temp: {
        id: undefined,
        fundCode: '',
        confirmedDate: '',
        netValue: '',
        costRate: '',
        capital: ''
      },
      fundOptions: [],
      rules: {
        fundCode: [{ required: true, message: 'name is required', trigger: 'blur' }],
        capital: [{ required: true, message: 'capital is required', trigger: 'blur' }],
        costRate: [{ required: true, message: 'cost rate is required', trigger: 'blur' }],
        confirmedDate: [{ type: 'date', required: true, message: 'confirmed date is required', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.getTableData().then(this.getAllFunds)
  },
  methods: {
    getTableData: function() {
      return new Promise((resolve) => {
        listAllFundInvestmentRecords().then(data => {
          this.tableData = data.data
          resolve()
        })
      })
    },
    getAllFunds: function() {
      return new Promise((resolve) => {
        listAllFunds().then(data => {
          this.fundOptions = data.data
          resolve()
        })
      })
    },
    resetDataForm() {
      this.temp = {
        id: undefined,
        fundCode: '',
        confirmedDate: '',
        netValue: '',
        costRate: '',
        capital: ''
      }
    },
    handleCreate: function() {
      this.resetDataForm()
      this.message = this.message.split('').reverse().join('')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },

    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          debugger
          createFundInvestmentTradeLog(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.getTableData()
          })
        }
      })
    },

    handleUpdate: function(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.temp = Object.assign({}, row) // copy obj
    },

    getDetail(row) {
      debugger
      console.log(row.id)
      this.$router.push({
        path: '/asset/fund/details/' + row.id
      })
    },

    formatterPercentage(row, column) {
      if (row.interestRate) {
        return row.interestRate * 100 + '%'
      }
    }
  }
}
</script>

<style scoped>

</style>
