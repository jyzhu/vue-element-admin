<template>
  <div>
    <el-dialog :title="textMap[formStatus]" :visible.sync="visible" @close="handleClose">
      <el-form ref="dataForm" :rules="formMeta.rules" :model="dataForm" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item v-for="(item) of formMeta.items" :key="item.prop" :label="item.label" :prop="item.prop">
          <el-input
            v-if="item.type === 'string'"
            v-model="dataForm[item.prop]"/>
          <el-input
            v-if="item.type === 'textarea'"
            v-model="dataForm[item.prop]"
            type="textarea"
            autosize/>
          <el-input
            v-if="item.type === 'email'"
            v-model="dataForm[item.prop]"
            type="email"
            autosize/>
          <el-input
            v-if="item.type === 'password'"
            v-model="dataForm[item.prop]"
            type="password"/>
          <el-input-number
            v-if="item.type === 'int'"
            v-model="dataForm[item.prop]"
            :min="item.range.min"
            :max="item.range.max"
            controls-position="right"/>
          <el-input-number
            v-else-if="item.type === 'double'"
            v-model="dataForm[item.prop]"
            :precision="item.range.precision"
            :step="0.01"
            :min="item.range.min"
            :max="item.range.max"
            controls-position="right"/>
          <el-date-picker
            v-if="item.type === 'year' || item.type === 'month' || item.type === 'week' || item.type === 'dates' || item.type === 'date' || item.type === 'datetime' "
            v-model="dataForm[item.prop]"
            :type="item.type"/>
          <el-date-picker
            v-else-if="item.type === 'datetimerange' || item.type === 'daterange'"
            v-model="dataForm[item.prop]"
            :type="item.type"
            :default-time="['00:00:00', '23:59:59']"/>
          <el-radio-group
            v-else-if="item.type === 'enum'"
            v-model="dataForm[item.prop]">
            <el-radio v-for="(radio) of item.range" :key="radio.value" :label="radio.value" > {{ radio.label }}</el-radio>
          </el-radio-group>
          <el-checkbox-group
            v-else-if="item.type === 'multi-select'"
            v-model="dataForm[item.prop]">
            <el-checkbox v-for="(option) of item.range" :key="option.value" :label="option.label" />
          </el-checkbox-group>
          <el-switch
            v-else-if="item.type === 'switch'"
            v-model="dataForm[item.prop]"
            active-value="true"
            inactive-value="false"/>
          <el-select
            v-else-if="item.type === 'select'"
            v-model="dataForm[item.prop]"
            placeholder="请选择">
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="handleClick">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FormDialog',
  props: {
    formStatus: {
      type: String,
      required: true
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
  computed: {
    ...mapState({
      visible: state => state.table.visible
    }),
    visible: {
      get: function() {
        return this.$store.state.table.visible
      },
      set: function(v) {
        this.$store.dispatch('table/setVisible', v)
      }
    }
  },
  methods: {
    handleClick: function() {
      debugger
      if (this._.isEmpty(this.$refs['dataForm'].rules)) {
        this.$emit(this.formStatus)
      } else {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$emit(this.formStatus)
          }
        })
      }
    },
    handleClose: function() {
      this.$store.dispatch('table/setVisible', false)
    },
    handleCancel: function() {
      this.$store.dispatch('table/setVisible', false)
    }
  }
}
</script>

<style scoped>

</style>
