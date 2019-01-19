
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },

  methods: {
    handleCreate: function() {
      this.resetDataForm()
      this.message = this.message.split('').reverse().join('')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },

    handleSuccess: function(message) {
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: message,
        type: 'success',
        duration: 2000
      })
    },

    handleUpdate: function(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.temp = Object.assign({}, row) // copy obj
    }

  }
}
