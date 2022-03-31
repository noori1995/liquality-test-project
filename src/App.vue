<template>
  <rates-table />
</template>

<script>
import RatesTable from './components/RatesTable.vue'

export default {
  name: 'App',
  components: {
    RatesTable
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
