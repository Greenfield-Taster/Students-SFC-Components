import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const state = {
  count: 0,
  style: "light",
};

const getters = {
  getCount: (state) => state.count,
  getStyle: (state) => state.style,
};

const mutations = {
  setCount(state, count) {
    state.count = count;
  },
  setStyle(state, style) {
    state.style = style;
  },
};
export default createStore({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations,
});
