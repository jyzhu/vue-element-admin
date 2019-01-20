<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>
    <custom-table :table-data="tableData" :table-meta="tableMeta" :expand-form-meta="expandFormMeta" @edit="handleUpdate" @delete="handleDelete"/>
    <form-dialog :form-status="dialogStatus" :data-form="dataForm" :form-meta="formMeta" @create="createData" @update="updateData"/>
  </div>
</template>

<script>
import { listAllGuaranteeSlips, createGuaranteeSlip, updateGuaranteeSlip, deleteGuaranteeSlip } from '@/api/insurance'
import CustomTableMixin from '@/components/table/mixins/CustomTableMixin'
import CustomTable from '@/components/table/CustomTable'
import FormDialog from '@/components/table/FormDialog'
import { insuranceTypeMap, formatterCollections } from '@/utils/formatter'

export default {
  components: { CustomTable, FormDialog },
  mixins: [CustomTableMixin],
  data() {
    return {
      tableMeta: [
        { prop: 'id', label: '序号', widthStyle: '50' },
        { prop: 'member', label: '成员', widthStyle: '100' },
        { prop: 'type', label: '险种', widthStyle: '80', formatter: formatterCollections.formatterInsuranceType },
        { prop: 'productName', label: '保险名称', widthStyle: '180' },
        { prop: 'premium', label: '保险缴费', widthStyle: '80' },
        { prop: 'paymentPeriod', label: '缴费期限', widthStyle: '80' },
        { prop: 'guaranteeYear', label: '保障年限', widthStyle: '80' },
        { prop: 'effective', label: '是否生效', widthStyle: '80' },
        { prop: 'boughtDate', label: '购买时间', widthStyle: '120' }
      ],
      expandFormMeta: [
        { prop: 'guaranteeSlipNo', label: '保单号', widthStyle: '180' },
        { prop: 'guaranteeContent', label: '保额', widthStyle: '180' },
        { prop: 'company', label: '保险公司', widthStyle: '180' },
        { prop: 'boughtChannel', label: '购买渠道', widthStyle: '180' }
      ],
      tableData: [],
      dataForm: {
        id: undefined,
        member: '',
        type: '',
        productName: '',
        premium: '',
        paymentPeriod: '',
        guaranteeYear: '',
        effective: '',
        boughtDate: '',
        guaranteeSlipNo: '',
        guaranteeContent: '',
        company: '',
        boughtChannel: ''
      },
      formMeta: {
        rules: {
          productName: [{ required: true, message: 'name is required', trigger: 'blur' }],
          member: [{ required: true, message: 'member is required', trigger: 'blur' }]
        },
        items: [
          { type: 'string', prop: 'member', label: '成员' },
          { type: 'select', prop: 'type', label: '险种',
            options: [
              { value: 'YIWAI', label: insuranceTypeMap['YIWAI'] },
              { value: 'ZHONGJI', label: insuranceTypeMap['ZHONGJI'] },
              { value: 'YILIAO', label: insuranceTypeMap['YILIAO'] },
              { value: 'SHOUXIAN', label: insuranceTypeMap['SHOUXIAN'] },
              { value: 'CAICHAN', label: insuranceTypeMap['CAICHAN'] },
              { value: 'CHEXIAN', label: insuranceTypeMap['CHEXIAN'] }
            ] },
          { type: 'string', prop: 'productName', label: '保险名称' },
          { type: 'double', prop: 'premium', label: '保险缴费', range: { max: 999999.99, min: 0.01, precision: 2 }},
          { type: 'int', prop: 'paymentPeriod', label: '缴费期限', range: { max: 40, min: 1 }},
          { type: 'string', prop: 'guaranteeYear', label: '保障年限' },
          { type: 'switch', prop: 'effective', label: '是否生效' },
          { type: 'date', prop: 'boughtDate', label: '购买时间' },
          { type: 'string', prop: 'guaranteeSlipNo', label: '保单号' },
          { type: 'textarea', prop: 'guaranteeContent', label: '保额' },
          { type: 'string', prop: 'company', label: '保险公司' },
          { type: 'string', prop: 'boughtChannel', label: '购买渠道' }
        ]
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    resetDataForm() {
      debugger
      this.dataForm = {
        id: undefined,
        member: '',
        type: '',
        productName: '',
        premium: '',
        paymentPeriod: '',
        guaranteeYear: '',
        effective: '',
        boughtDate: '',
        guaranteeSlipNo: '',
        guaranteeContent: '',
        company: '',
        boughtChannel: ''
      }
    },

    getTableData: function() {
      return new Promise((resolve) => {
        listAllGuaranteeSlips().then(data => {
          this.tableData = data.data
          resolve()
        })
      })
    },

    createData: function() {
      createGuaranteeSlip(this.dataForm).then(() => {
        this.handleSuccess('创建成功')
        this.getTableData()
      })
    },

    updateData: function() {
      updateGuaranteeSlip(this.dataForm).then(() => {
        this.handleSuccess('更新成功')
        this.getTableData()
      })
    },

    handleDelete: function(row) {
      return new Promise((resolve) => {
        deleteGuaranteeSlip(row.id).then(data => {
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
