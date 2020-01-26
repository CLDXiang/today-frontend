import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      token: '',
      name: '',
      email: '',
    },
  },
  mutations: {
    SET_JWT(state, token) {
      state.user.token = token;
    },
  },
});

export default store;
