import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const state = {
  count: 0,
  style: "light",
  user: null,
};

const getters = {
  getCount: (state) => state.count,
  getStyle: (state) => state.style,
  getUser: (state) => state.user,
};

const mutations = {
  setCount(state, count) {
    state.count = count;
  },
  setStyle(state, style) {
    state.style = style;
  },
  setUser(state, user) {
    state.user = user;
  },
};
export default createStore({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations,
});
