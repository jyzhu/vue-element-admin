<template>
  <div class="app-container">
    <div class="filter-container"/>

    <custom-table :table-data="tableData" :table-meta="tableMeta" @edit="handleUpdate" @delete="handleDelete" />
    <form-dialog :form-status="dialogStatus" :data-form="dataForm" :form-meta="formMeta" @update="updateData"/>

  </div>
</template>

<script>
import { listReceivedPaymentDetails, updateReceivedPaymentTradeLog, deleteReceivedPaymentTradeLog } from '@/api/financing'

import CustomTableMixin from '@/components/table/mixins/CustomTableMixin'
import CustomTable from '@/components/table/CustomTable'
import FormDialog from '@/components/table/FormDialog'
import { receivedStatusMap, formatterCollections } from '@/utils/formatter'

export default {
  name: 'ReceivePaymentDetails',
  components: { CustomTable, FormDialog },
  mixins: [CustomTableMixin],
  data() {
    return {
      tableMeta: [
        { prop: 'id', label: '序号', widthStyle: '50' },
        { prop: 'receivedDate', label: '收款日', widthStyle: '180' },
        { prop: 'capital', label: '本金', widthStyle: '100', formatter: formatterCollections.formatterNumber },
        { prop: 'interest', label: '利息', widthStyle: '100', formatter: formatterCollections.formatterNumber },
        { prop: 'status', label: '状态', widthStyle: '80', formatter: formatterCollections.formatterStatus }
      ],
      formMeta: {
        rules: {
          capital: [{ required: true, message: 'capital is required', trigger: 'blur' }]
        },
        items: [
          { type: 'date', prop: 'receivedDate', label: '回款日期' },
          { type: 'double', prop: 'capital', label: '本金', range: { max: 999999.99, min: 0.01, precision: 2 }},
          { type: 'double', prop: 'interest', label: '利息', range: { max: 999999.99, min: 0.01, precision: 2 }},
          { type: 'select', prop: 'status', label: '回款状态',
            options: [
              { value: 'NOT_RECEIVED', label: receivedStatusMap['NOT_RECEIVED'] },
              { value: 'RECEIVED', label: receivedStatusMap['RECEIVED'] }
            ] }
        ]
      },
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
        listReceivedPaymentDetails(id).then(data => {
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

    updateData: function() {
      updateReceivedPaymentTradeLog(this.dataForm).then(() => {
        this.handleSuccess('更新成功')
        this.getTableData()
      })
    },

    handleDelete: function(row) {
      return new Promise((resolve) => {
        deleteReceivedPaymentTradeLog(row.id).then(data => {
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
