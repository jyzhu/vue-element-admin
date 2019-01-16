<template>
  <el-progress :percentage="progressPercentage" />
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progressPercentage: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // progressPercentage: 32.22
    }
  }
}
</script>

<style scoped>

</style>
