import Vue from 'vue';
import Vuex from 'vuex';
import log from '../utils/log';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      jwt_token: '',
      name: '',
      email: '',
    },
  },
  mutations: {
    SET_JWT_TOKEN(state, token) {
      state.user.jwt_token = token;
      log.info('set jwt_token', token);
    },
    SET_USER(state, name, email) {
      state.user.name = name;
      state.user.email = email;
    },
  },
  getters: {
    userLoggedIn: (state) => {
      return state.user.jwt_token !== '';
    },
  },
  plugins: [createPersistedState()],
});

export default store;
