<template>
  <div class="app-container">
    <div class="filter-container">
      <panel-group/>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>
    <custom-table :table-data="tableData" :table-meta="tableMeta" :expand-form-meta="expandFormMeta" @detail="getDetail" @edit="handleUpdate" @delete="handleDelete"/>
    <form-dialog :form-status="dialogStatus" :data-form="dataForm" :form-meta="formMeta" @create="createData" @update="updateData"/>

  </div>
</template>

<script>
import { listFixedIncomeRecords, createFixedIncomeRecord, updateFixedIncomeRecord, deleteFixedIncomeRecord } from '@/api/financing'
import PanelGroup from './components/PanelGroup'
import ProgressBar from './components/ProgressBar'

import CustomTableMixin from '@/components/table/mixins/CustomTableMixin'
import CustomTable from '@/components/table/CustomTable'
import FormDialog from '@/components/table/FormDialog'
import { dateDimensionMap, receivePaymentTypeMap, formatterCollections } from '@/utils/formatter'

export default {
  components: { PanelGroup, ProgressBar, CustomTable, FormDialog },
  mixins: [CustomTableMixin],
  data() {
    return {
      tableMeta: [
        { prop: 'id', label: '序号', widthStyle: '50' },
        { prop: 'productName', label: '产品名称', widthStyle: '180' },
        { prop: 'capital', label: '本金', widthStyle: '100', formatter: formatterCollections.formatterNumber },
        { prop: 'interestRate', label: '预期利率', widthStyle: '100', formatter: formatterCollections.formatterPercentage },
        { prop: 'receivedCapital', label: '已收本金', widthStyle: '80', formatter: formatterCollections.formatterNumber },
        { prop: 'receivedInterest', label: '已收利息', widthStyle: '80', formatter: formatterCollections.formatterNumber },
        { prop: 'unreceivedCapital', label: '待收本金', widthStyle: '80', formatter: formatterCollections.formatterNumber },
        { prop: 'xirr', label: 'XIRR', widthStyle: '80', formatter: formatterCollections.formatterPercentage }
      ],
      expandFormMeta: [
        { prop: 'productName', label: '产品名称' },
        { prop: 'boughtDate', label: '申购日期' },
        { prop: 'effectiveDate', label: '起息日期' },
        { prop: 'endDate', label: '结束日期' },
        { prop: 'term', label: '期限' },
        { prop: 'unreceivedInterest', label: '待收利息' }
      ],
      tableData: [],
      formMeta: {
        rules: {
          productName: [{ required: true, message: 'name is required', trigger: 'blur' }],
          capital: [{ required: true, message: 'capital is required', trigger: 'blur' }],
          interestRate: [{ required: true, message: 'interest rate is required', trigger: 'blur' }],
          effectiveDate: [{ type: 'date', required: true, message: 'effective date is required', trigger: 'change' }],
          term: [{ required: true, message: 'term is required', trigger: 'blur' }]
        },
        items: [
          { type: 'string', prop: 'productName', label: '产品名称' },
          { type: 'double', prop: 'capital', label: '本金', range: { max: 9999999.99, min: 0.01, precision: 2 }},
          { type: 'double', prop: 'interestRate', label: '期望利率', range: { max: 1.0000, min: 0.0001, precision: 4 }},
          { type: 'int', prop: 'term', label: '期限', range: { max: 800, min: 1 }},
          { type: 'enum', prop: 'dateDimension', label: '日/月',
            range: [
              { value: 'DAY', label: dateDimensionMap['DAY'] },
              { value: 'MONTH', label: dateDimensionMap['MONTH'] }
            ] },
          { type: 'select', prop: 'receivePaymentType', label: '险种',
            options: [
              { value: 'REPAYMENT_PRINCIPAL_INTEREST', label: receivePaymentTypeMap['REPAYMENT_PRINCIPAL_INTEREST'] },
              { value: 'AVERAGE_CAPITAL', label: receivePaymentTypeMap['AVERAGE_CAPITAL'] },
              { value: 'AVERAGE_CAPITAL_PLUS_INTEREST', label: receivePaymentTypeMap['AVERAGE_CAPITAL_PLUS_INTEREST'] },
              { value: 'INTEREST_PAID_ON_MONTHLY_BASIS', label: receivePaymentTypeMap['INTEREST_PAID_ON_MONTHLY_BASIS'] }
            ] },
          { type: 'date', prop: 'effectiveDate', label: '起息日期' },
          { type: 'date', prop: 'boughtDate', label: '申购日期' },
          { type: 'date', prop: 'endDate', label: '结束日期' }
        ]
      },
      dataForm: {
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
      debugger
      this.dataForm = {
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

    createData: function() {
      debugger
      createFixedIncomeRecord(this.dataForm).then(() => {
        this.handleSuccess('创建成功')
        this.getTableData()
      })
    },

    updateData: function() {
      updateFixedIncomeRecord(this.dataForm).then(() => {
        this.handleSuccess('更新成功')
        this.getTableData()
      })
    },

    handleDelete: function(row) {
      return new Promise((resolve) => {
        deleteFixedIncomeRecord(row.id).then(data => {
          this.getTableData()
          resolve()
        })
      })
    },

    getDetail(row) {
      this.$router.push({
        path: '/asset/fixedIncome/details/' + row.id
      })
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
