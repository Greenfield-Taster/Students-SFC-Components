import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const state = {
  count: 0,
};

const mutations = {
  setCount(state, count) {
    state.count = count;
  },
};

const getters = {
  getCount: (state) => state.count,
};

export default createStore({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations,
});
