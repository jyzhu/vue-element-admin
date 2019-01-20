<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <custom-table :table-data="tableData" :table-meta="tableMeta" @detail="getDetail" />
    <form-dialog :form-status="dialogStatus" :data-form="dataForm" :form-meta="formMeta" @create="createData"/>

  </div>

</template>

<script>
import CustomTableMixin from '@/components/table/mixins/CustomTableMixin'
import CustomTable from '@/components/table/CustomTable'
import FormDialog from '@/components/table/FormDialog'
import { formatterCollections } from '@/utils/formatter'
import { listAllFundInvestmentRecords, createFundInvestmentTradeLog, listAllFunds } from '@/api/financing'

export default {
  components: { CustomTable, FormDialog },
  mixins: [CustomTableMixin],
  data() {
    return {
      tableMeta: [
        { prop: 'id', label: '序号', widthStyle: '50' },
        { prop: 'fundCode', label: '基金编码', widthStyle: '100' },
        { prop: 'capital', label: '本金', widthStyle: '100', formatter: formatterCollections.formatterNumber },
        { prop: 'shares', label: '份额', widthStyle: '80' }
      ],
      formMeta: {
        rules: {
          fundCode: [{ required: true, message: 'name is required', trigger: 'blur' }],
          capital: [{ required: true, message: 'capital is required', trigger: 'blur' }],
          costRate: [{ required: true, message: 'cost rate is required', trigger: 'blur' }],
          confirmedDate: [{ type: 'date', required: true, message: 'confirmed date is required', trigger: 'change' }]
        },
        items: [
          { type: 'select', prop: 'fundCode', label: '基金代码', options: this.fundOptions },
          { type: 'date', prop: 'confirmedDate', label: '确认日期' },
          { type: 'string', prop: 'netValue', label: '申购净值' },
          { type: 'double', prop: 'costRate', label: '申购费率', range: { max: 1.0000, min: 0.0001, precision: 5 }},
          { type: 'double', prop: 'capital', label: '本金', range: { max: 999999.99, min: 0.01, precision: 2 }}
        ]
      },
      tableData: [],
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
  computed: {
    fundOptions() {
      debugger
      return this.getAllFunds()
    }
  },
  mounted() {
    this.getTableData()
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
      debugger
      return new Promise((resolve) => {
        listAllFunds().then(data => {
          return data.data
          // resolve()
        })
      })
    },
    resetDataForm() {
      this.dataForm = {
        id: undefined,
        fundCode: '',
        confirmedDate: '',
        netValue: '',
        costRate: '',
        capital: ''
      }
    },

    createData: function() {
      createFundInvestmentTradeLog(this.dataForm).then(() => {
        this.handleSuccess('创建成功')
        this.getTableData()
      })
    },

    getDetail(row) {
      this.$router.push({
        path: '/asset/fund/details/' + row.id
      })
    }
  }
}
</script>

<style scoped>

</style>
