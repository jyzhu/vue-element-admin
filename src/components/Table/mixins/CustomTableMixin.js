export default {
  data() {
    return {
      dialogStatus: ''
    }
  },
  methods: {
    handleCreate: function() {
      debugger
      this.resetDataForm()
      this.dialogStatus = 'create'
      this.$store.dispatch('table/setVisible', true)
    },

    handleSuccess: function(message) {
      this.$store.dispatch('table/setVisible', false)
      this.$notify({
        title: '成功',
        message: message,
        type: 'success',
        duration: 2000
      })
    },

    handleUpdate: function(row) {
      debugger
      this.dialogStatus = 'update'
      this.dataForm = Object.assign({}, row) // copy obj
      this.$store.dispatch('table/setVisible', true)
    }

  }
}
