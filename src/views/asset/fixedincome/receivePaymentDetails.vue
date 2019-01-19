<template>
  <div class="app-container">
    <div class="filter-container"/>
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
        prop="receivedDate"
        label="收款日"
        width="180" />
      <el-table-column
        prop="capital"
        label="本金"
        width="100" />
      <el-table-column
        prop="interest"
        label="利息" />
      <el-table-column
        :formatter="formatterStatus"
        prop="status"
        label="状态" />
      <el-table-column
        label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="handleUpdate(scope.row)"/>
          <el-button type="primary" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="回款日期" prop="receivedDate">
          <el-date-picker v-model="temp.receivedDate" type="date" placeholder="Please pick a date"/>
        </el-form-item>
        <el-form-item label="本金" prop="capital">
          <el-input-number v-model="temp.capital" :step="500" />
        </el-form-item>
        <el-form-item label="利息" prop="interest">
          <el-input-number v-model="temp.interest" :step="0.0001"/>
        </el-form-item>
        <el-form-item label="回款状态" prop="status">
          <el-select v-model="temp.status">
            <el-option
              v-for="item in receivedStatus"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"/>
          </el-select>
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
import { listReceivedPaymentDetails, deleteReceivedPaymentTradeLog } from '@/api/financing'

const receivedStatus = [
  { key: 'NOT_RECEIVED', display_name: '未收' },
  { key: 'RECEIVED', display_name: '已收' }
]

export default {
  name: 'ReceivePaymentDetails',
  filters: {
    numFilter(value) {
      debugger
      const realVal = parseFloat(value).toFixed(2)
      return parseFloat(realVal)
    }
  },
  data() {
    return {
      message: 'Hello Vue.js!',
      totalMoney: 20.112,
      tableData: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      receivedStatus,
      dataForm: {
        id: undefined,
        capital: '',
        interest: '',
        receivedDate: '',
        status: ''
      },
      rules: {
        capital: [{ required: true, message: 'capital is required', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData: function() {
      return new Promise((resolve) => {
        const id = this.$route.params && this.$route.params.id
        listReceivedPaymentDetails(id).then(data => {
          this.tableData = data.data
          resolve()
        })
      })
    },
    resetDataForm() {
      this.temp = {
        id: undefined,
        capital: '',
        interest: '',
        receivedDate: '',
        status: ''
      }
    },
    handleTest: function() {
      this.message = this.message.split('').reverse().join('')
    },
    handleCreate: function() {
      this.resetDataForm()
      this.message = this.message.split('').reverse().join('')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },

    handleUpdate: function(row) {
      this.message = this.message.split('').reverse().join('')
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.temp = Object.assign({}, row) // copy obj
    },

    handleDelete: function(row) {
      this.message = this.message.split('').reverse().join('')
      return new Promise((resolve) => {
        deleteReceivedPaymentTradeLog(row.id).then(data => {
          debugger
          this.getTableData()
          resolve()
        })
      })
    },

    formatterStatus(row, column) {
      if (row[column.property] === 'NOT_RECEIVED') {
        return '未收'
      } else if (row[column.property] === 'RECEIVED') {
        return '已收'
      }
    },

    formatterNumber(row, column) {
      const realVal = parseFloat(row[column.property]).toFixed(2)
      return parseFloat(realVal)
    },

    formatterPercentage(row, column) {
      if (row[column.property]) {
        return row[column.property] * 100 + '%'
      }
    }
  }
}
</script>

<style scoped>

</style>
