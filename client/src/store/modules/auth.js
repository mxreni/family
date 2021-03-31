import { getCurrentUser } from "../../api";

const state = () => ({
  loggedin: false,
  currentUser: null,
});

const actions = {
  async getUserData({ commit }) {
    const user = await getCurrentUser();
    commit("getCurrentUserData", user);
  },
};

const mutations = {
  getCurrentUserData(state, { user }) {
    state.loggedin = user.status === "success";
    if (state.loggedin) {
      state.currentUser = user;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
