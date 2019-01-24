<template>
  <div class="app-container">
    <div class="filter-container" />
    <custom-table :table-data="tableData" :table-meta="tableMeta" @edit="handleUpdate" @delete="handleDelete"/>
    <form-dialog :form-status="dialogStatus" :data-form="dataForm" :form-meta="formMeta" @create="createData" @update="updateData"/>
  </div>
</template>

<script>
import { listAllFundInvestmentTradeLog, createFundInvestmentTradeLog, updateFundInvestmentTradeLog, deleteFundInvestmentTradeLog } from '@/api/financing'
import CustomTableMixin from '@/components/table/mixins/CustomTableMixin'
import CustomTable from '@/components/table/CustomTable'
import FormDialog from '@/components/table/FormDialog'
import { formatterCollections } from '@/utils/formatter'

export default {

  name: 'FundInvestmentDetails',
  components: { CustomTable, FormDialog },
  mixins: [CustomTableMixin],
  data() {
    return {
      tableMeta: [
        { prop: 'id', label: '序号', widthStyle: '50' },
        { prop: 'investmentRecord.fundCode', label: '基金编码', widthStyle: '100' },
        { prop: 'confirmedDate', label: '确认日期', widthStyle: '100' },
        { prop: 'capital', label: '本金', widthStyle: '100', formatter: formatterCollections.formatterNumber },
        { prop: 'netValue', label: '基金净值', widthStyle: '80', formatter: formatterCollections.formatterNumber },
        { prop: 'costRate', label: '费率', widthStyle: '80', formatter: formatterCollections.formatterPercentage },
        { prop: 'costValue', label: '申购费', widthStyle: '80', formatter: formatterCollections.formatterNumber },
        { prop: 'shares', label: '份额', widthStyle: '80' }
      ],
      tableData: [],
      formMeta: {
        rules: {
          fundCode: [{ required: true, message: 'name is required', trigger: 'blur' }],
          capital: [{ required: true, message: 'capital is required', trigger: 'blur' }],
          confirmedDate: [{ type: 'date', required: true, message: 'confirmed date is required', trigger: 'change' }],
          costRate: [{ required: true, message: 'cost rate is required', trigger: 'blur' }]
        },
        items: [
          { type: 'label', prop: 'fundCode', label: '基金代码' },
          { type: 'date', prop: 'confirmedDate', label: '确认日期', formatter: 'yyyy-MM-dd' },
          { type: 'double', prop: 'capital', label: '本金', range: { max: 999999.99, min: 0.01, precision: 2 }},
          { type: 'string', prop: 'netValue', label: '基金净值' },
          { type: 'double', prop: 'costRate', label: '申购费率', range: { max: 1.0000, min: 0.0001, precision: 5 }}
        ]
      },
      dataForm: {
        id: undefined,
        fundCode: '',
        confirmedDate: '',
        netValue: '',
        costRate: '',
        capital: ''
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData: function() {
      return new Promise((resolve) => {
        debugger
        const id = this.$route.params && this.$route.params.id
        listAllFundInvestmentTradeLog(id).then(data => {
          this.tableData = data.data
          resolve()
        })
      })
    },
    resetDataForm() {
      this.dataForm = {
        id: undefined,
        capital: '',
        interest: '',
        receivedDate: '',
        status: ''
      }
    },

    createData: function() {
      createFundInvestmentTradeLog(this.dataForm).then(() => {
        this.handleSuccess('创建成功')
        this.getTableData()
      })
    },

    updateData: function() {
      debugger
      updateFundInvestmentTradeLog(this.dataForm).then(() => {
        this.handleSuccess('更新成功')
        this.getTableData()
      })
    },

    handleDelete: function(row) {
      return new Promise((resolve) => {
        deleteFundInvestmentTradeLog(row.id).then(data => {
          debugger
          this.getTableData()
          resolve()
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
