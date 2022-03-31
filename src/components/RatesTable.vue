<template>
  <div class="rates-table">
    <h3>SWAP RATES TABLE</h3>
    <div>
      <button v-for="period in periods" :key="period" :disabled="selectedPeriod === period" :class="selectedPeriod === period ? 'selectedButton':'' " @click="refreshPeriodChange(period)">{{ period }} seconds</button>
    </div>
    <div class="loading-container" v-if="loading">
      <loading />
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tr v-for="rate in rates" :key="`${rate.from}-${rate.to}`">
        <td>{{ rate.from }}</td>
        <td>{{ rate.to }}</td>
        <td>{{ ratesLoading ? 'loading ...' : rate.rate }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Loading from './Loading.vue'

export default {
  name: 'RatesTable',
  components: { Loading },
  data(){
    return {
      periods: [
        5, 10, 15
      ],
      selectedPeriod: 10,
      loading: false,
      ratesLoading: false,
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      rates: 'rates'
    })
  },
    methods: {
    ...mapActions({
      getSwapRates: 'swapRates'
    }),
    async refreshRates() {
      this.loading = true
      await this.getSwapRates()
      this.loading = false
    },
    refreshPeriodChange(period) {
      this.selectedPeriod = period
      clearInterval(this.interval)
      this.interval = setInterval( async () => {
        this.ratesLoading = true
        await this.getSwapRates()
        this.ratesLoading = false
      }, period*1000)
    }
  },
  async mounted() {
    await this.refreshRates()
    this.interval = setInterval( async () => {
        this.ratesLoading = true
        await this.getSwapRates()
        this.ratesLoading = false
      }, this.selectedPeriod*1000)
  }

}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 ;
}
.loading-container{
  margin-top: 2rem;
}
table {
  border: #42b983 3px solid;
  min-width: 400px;
  max-width: 800px;
  margin: auto;
  margin-top: 2rem;
  padding: 1rem;
  td {
    border-bottom: #42b983 1px solid; 
    max-width: 70px;
  }
}
button{
  padding: .5rem;
  font-size: 1rem;
  border: none;
  margin-right: .5rem;
  margin-left: .5rem;
  cursor: pointer;
  &.selectedButton{
    background-color: #42b983;
    font-size: bolder;
    color: aliceblue;
    cursor: unset;
  }
}
a {
  color: #42b983;
}
</style>
