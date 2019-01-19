<template>
  <div class="app-container">
    <div class="filter-container">
      <panel-group/>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button> {{ message }}
    </div>
    <el-table
      :data="tableData"
      stripe
      height="500"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="产品名称">
              <span>{{ props.row['productName'] }}</span>
            </el-form-item>
            <el-form-item label="申购日期">
              <span>{{ props.row['boughtDate'] }}</span>
            </el-form-item>
            <el-form-item label="起息日期">
              <span>{{ props.row['effectiveDate'] }}</span>
            </el-form-item>
            <el-form-item label="结束日期">
              <span>{{ props.row['endDate'] }}</span>
            </el-form-item>
            <el-form-item label="期限">
              <span>{{ props.row['term'] }}</span>
            </el-form-item>
            <el-form-item label="待收利息">
              <span>{{ props.row['unreceivedInterest'] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="序号"
        width="50" />
      <el-table-column
        prop="productName"
        label="产品名称"/>
      <el-table-column
        prop="capital"
        label="本金"/>
      <el-table-column
        :formatter="formatterPercentage"
        prop="interestRate"
        label="预期利率" />
      <el-table-column
        prop="receivedCapital"
        label="已收本金"/>
      <el-table-column
        prop="receivedInterest"
        label="已收利息"/>
      <el-table-column
        prop="unreceivedCapital"
        label="待收本金"/>
      <el-table-column
        :formatter="formatterPercentage"
        prop="xirr"
        label="XIRR"/>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-info" circle @click="getDetail(scope.row)"/>
          <el-button type="primary" icon="el-icon-edit" circle @click="handleUpdate(scope.row)"/>
          <el-button type="primary" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="temp.productName" />
        </el-form-item>
        <el-form-item label="本金" prop="capital">
          <el-input-number v-model="temp.capital" :step="500" />
        </el-form-item>
        <el-form-item label="期望利率" prop="interestRate">
          <el-input-number v-model="temp.interestRate" :step="0.0001"/>
        </el-form-item>
        <el-form-item label="期限" prop="term">
          <el-input-number v-model="temp.term" :step="1"/>
          <el-radio-group v-model="temp.dateDimension">
            <el-radio-button label="DAY">日</el-radio-button>
            <el-radio-button label="MONTH">月</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="回款方式" prop="receivePaymentType">
          <el-select v-model="temp.receivePaymentType">
            <el-option
              v-for="item in receivePaymentTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="起息日期" prop="effectiveDate">
          <el-date-picker v-model="temp.effectiveDate" type="date" placeholder="Please pick a date"/>
        </el-form-item>
        <el-form-item label="申购日期" prop="boughtDate">
          <el-date-picker v-model="temp.boughtDate" type="date" placeholder="Please pick a date"/>
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker v-model="temp.endDate" type="date" placeholder="Please pick a date"/>
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
import { listFixedIncomeRecords, createFixedIncomeRecord, updateFixedIncomeRecord, deleteFixedIncomeRecord } from '@/api/financing'
import PanelGroup from './components/PanelGroup'
import ProgressBar from './components/ProgressBar'

const receivePaymentTypeOptions = [
  { key: 'REPAYMENT_PRINCIPAL_INTEREST', display_name: '到期还本付息' },
  { key: 'AVERAGE_CAPITAL', display_name: '等额本金' },
  { key: 'AVERAGE_CAPITAL_PLUS_INTEREST', display_name: '等额本息' },
  { key: 'INTEREST_PAID_ON_MONTHLY_BASIS', display_name: '每月还息，到期还本息' }
]

export default {
  components: {
    PanelGroup, ProgressBar
  },
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
      receivePaymentTypeOptions,
      temp: {
        id: undefined,
        productName: '',
        capital: '',
        interestRate: '',
        term: '',
        dateDimension: 'DAY',
        receivePaymentType: 'AVERAGE_CAPITAL_PLUS_INTEREST',
        effectiveDate: '',
        boughtDate: '',
        endDate: ''
      },
      rules: {
        productName: [{ required: true, message: 'name is required', trigger: 'blur' }],
        capital: [{ required: true, message: 'capital is required', trigger: 'blur' }],
        interestRate: [{ required: true, message: 'interest rate is required', trigger: 'blur' }],
        term: [{ required: true, message: 'term is required', trigger: 'blur' }],
        effectiveDate: [{ type: 'date', required: true, message: 'effective date is required', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData: function() {
      return new Promise((resolve) => {
        listFixedIncomeRecords().then(data => {
          this.tableData = data.data
          resolve()
        })
      })
    },
    resetDataForm() {
      this.temp = {
        id: undefined,
        productName: '',
        capital: '',
        interestRate: '',
        term: '',
        dateDimension: 'DAY',
        receivePaymentType: 'AVERAGE_CAPITAL_PLUS_INTEREST',
        effectiveDate: '',
        boughtDate: '',
        endDate: ''
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
          createFixedIncomeRecord(this.temp).then(() => {
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

    updateData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateFixedIncomeRecord(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.getTableData()
          })
        }
      })
    },

    handleDelete: function(row) {
      this.message = this.message.split('').reverse().join('')
      return new Promise((resolve) => {
        deleteFixedIncomeRecord(row.id).then(data => {
          debugger
          this.getTableData()
          resolve()
        })
      })
    },

    handleUpdate: function(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.temp = Object.assign({}, row) // copy obj
    },

    getDetail(row) {
      this.$router.push({
        path: '/asset/fixedIncome/details/' + row.id
      })
    },

    formatterPercentage(row, column) {
      if (row[column.property]) {
        const realVal = parseFloat(row[column.property] * 100).toFixed(2)
        return realVal + '%'
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
