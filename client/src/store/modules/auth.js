import { getCurrentUser, logout, put } from "../../api";
import { GET_CURRENT_USER, REMOVE_USER, UPDATE_USER } from "../actionTypes";

const state = () => ({
  loggedin: false,
  currentUser: null,
});

const actions = {
  async getCurrentUserData({ commit }) {
    const user = await getCurrentUser();
    commit(GET_CURRENT_USER, user);
  },
  async userLogout({ commit }) {
    await logout();
    commit(REMOVE_USER);
  },
  async updateUserData({ commit }, userData) {
    const { user } = await put("users", userData);
    commit(UPDATE_USER, user);
  },
};

const mutations = {
  [GET_CURRENT_USER](state, user) {
    state.loggedin = user.status === "success";
    if (state.loggedin) {
      state.currentUser = user;
    }
    return state;
  },
  [REMOVE_USER](state) {
    state.loggedin = false;
    state.currentUser = null;
    return state;
  },
  [UPDATE_USER](state, user) {
    state.currentUser = user;
    return state;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
