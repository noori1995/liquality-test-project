import { createStore } from 'vuex'
import axios from 'axios'

const BASE_URL = 'https://liquality.io/swap/agent/api'

export default createStore({
  state: {
    swapRates: []
  },
  getters: {
    rates (state) {
      return state.swapRates
    },
  },
  mutations: {
    SET_SWAP_RATES (state, payload) {
      state.swapRates = payload.data
    },
  },
  actions: {
    async swapRates ({ commit }) {
      const result = await axios
        .get(`${BASE_URL}/swap/marketinfo`)
        .then(({ data }) => {
            commit('SET_SWAP_RATES', { data: data })
          return data
        })
        .catch((error) => {
          if (error.response) {
            console.log('error', error.response)
            return error.response.data
          }
        })
      return result
    },
  },
  modules: {
  }
})
