<template>
  <div class="app-container">
    <div class="filter-container"/>
    <custom-table :table-data="tableData" :table-meta="tableMeta" />
  </div>
</template>

<script>
import { listAllFundInvestmentTradeLog } from '@/api/financing'
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
        { prop: 'netValue', label: '净值', widthStyle: '80', formatter: formatterCollections.formatterNumber },
        { prop: 'costRate', label: '费率', widthStyle: '80', formatter: formatterCollections.formatterPercentage },
        { prop: 'costValue', label: '申购费', widthStyle: '80', formatter: formatterCollections.formatterNumber },
        { prop: 'shares', label: '份额', widthStyle: '80' }
      ],
      tableData: [],
      dataForm: {
        id: undefined,
        capital: '',
        interest: '',
        receivedDate: '',
        status: ''
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
    }
  }
}
</script>

<style scoped>

</style>
