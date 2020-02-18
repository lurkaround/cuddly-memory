import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios';

export default new Vuex.Store({
  state: {
    apiresult: null,
    apiAll: null,
  },
  mutations: {
    setApi(state,payload){
      state.apiresult = payload;
    },
    setApiAll(state,payload){
      state.apiAll = payload;
    },
  },
  actions: {
    loadAPI({commit}){
      axios
        .get(
          "http://www.virail.com/virail/v7/search/en_us?from=c.3173435&to=c.3169070&lang=en_us&dt=2020-02-23&currency=USD&adult_passengers=1"
        )
        .then(res => {
          let cheapest = res.data.transportStatus;
          let payload2 = res.data;
          console.log(payload2)
          commit("setApi", cheapest);
          commit("setApiAll", payload2);

        });
    }
  },
  modules: {
  }
})
