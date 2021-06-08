import { uiActions } from "./ui-actions";
import { dbActions } from "./db-actions";
import { uiMutations } from "./mutation";
import { dbMutations } from "./db-mutation";
import { getters } from "./getters";

const state = () => ({
  tree: {},
  currentTree: null,
  parent: null,
  viewTree: null,
});

const actions = {
  ...dbActions,
  ...uiActions,
  removeCurrentTree() {
    if (state.currentTree) {
      state.currentTree = null;
    }
  },
};

const mutations = {
  ...dbMutations,
  ...uiMutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
