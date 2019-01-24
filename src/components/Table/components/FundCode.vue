<template>
  <div>
    <el-select
      v-model="dataForm['fundCode']"
      :remote-method="getAllFunds"
      filterable
      remote
      placeholder="请选择">
      <el-option
        v-for="option in options"
        :key="option.fundCode"
        :label="option.fundName"
        :value="option.fundCode" />
    </el-select>
  </div>
</template>

<script>
import { listAllFunds } from '@/api/financing'
export default {
  name: 'FundCode',
  props: {
    dataForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      options: [],
      value2: []
    }
  },
  methods: {
    getAllFunds: function() {
      debugger
      return new Promise((resolve) => {
        listAllFunds().then(data => {
          this.options = data.data
          // resolve()
        })
      })
    }
  }

}
</script>

<style scoped>

</style>
