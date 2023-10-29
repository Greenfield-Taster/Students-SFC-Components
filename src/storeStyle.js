import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const state = {
  style: "dark",
};

const mutations = {
  setStyle(state, style) {
    state.style = style;
  },
};

const getters = {
  getStyle: (state) => state.style,
};

export default createStore({
  state,
  getters,
  mutations,
  plugins: [createPersistedState()],
});
