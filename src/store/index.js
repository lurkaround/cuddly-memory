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
      let URL = "https://www.virail.com/virail/v7/search/en_us?from=c.3054643&to=c.2950159&lang=en_us&dt=2020-02-17&currency=USD&station_from_id=0&station_to_id=0&loop=3&adult_passengers=1&ref=https%3A%2F%2Fwww.virail.com%2Fbudapest-berlin%2F2020-02-17%3Ftp%3D1"
      let URL2 = "http://www.virail.com/virail/v7/search/en_us?from=c.3173435&to=c.3169070&lang=en_us&dt=2020-02-17&currency=USD&adult_passengers=1"
      axios
        .get(
          URL2
        )
        .then(res => {
          let payload = res.data.transportStatus;
          let payload2 = res.data;
          commit("setApi", payload);
          commit("setApiAll", payload2);

        });
    }
  },
  modules: {
  }
})
