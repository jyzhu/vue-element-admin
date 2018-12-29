<template>
  <div class="app-container">
    <div style="margin-bottom:15px;">
      本金： {{ capital }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    capital() {
      return this.$store.getters.capital
    }
  }
}
</script>

<style scoped>

</style>
