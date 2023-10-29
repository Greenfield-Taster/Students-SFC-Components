import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const state = {
  count: 0,
};

const getters = {
  getCount: (state) => state.count,
};

const mutations = {
  setCount(state, count) {
    state.count = count;
  },
};
export default createStore({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations,
});
