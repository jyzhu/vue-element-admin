<template>
  <div>
    <el-dialog :title="textMap[formStatus]" :visible.sync="isVisible">
      <el-form ref="dataForm" :rules="formMeta.rules" :model="dataForm" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item v-for="(item) of formMeta.items" :key="item.prop" :label="item.label" :prop="item.prop">
          <el-input
            v-if="item.type === 'string'"
            v-model="dataForm[item.prop]"/>
          <el-date-picker
            v-if="item.type === 'date'"
            v-model="dataForm[item.prop]"
            type="date"
            placeholder="Please pick a date"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="handleClick">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FormDialog',
  props: {
    formStatus: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    dataForm: {
      type: Object,
      required: true
    },
    formMeta: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      textMap: {
        update: '更新',
        create: '创建'
      }
    }
  },
  mounted() {
    debugger
    console.log('isVisible: ' + this.isVisible)
    console.log(this.dataForm)
    console.log('formStatus: ' + this.formStatus)
    console.log(this.formMeta)
    console.log(this.dataForm['name'])
  },
  methods: {
    handleClick: function() {
      debugger
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$emit(this.formStatus)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
