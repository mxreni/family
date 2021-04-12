import { useStore } from "vuex";
import { get, post, put, deleteRequest } from "../../api";
import {
  ADD_TO_TREE,
  EDIT_TREE_BY_ID,
  GET_TREE,
  GET_TREE_BY_ID,
} from "../actionTypes";

const state = () => ({
  tree: {
    0: {
      id: 0,
      name: "",
      children: [],
      left: 1,
      depth: 0,
    },
  },
});

const getters = {
  parent(state) {
    if (Object.entries(state.tree).length > 0) {
      let obj = Object.entries(state.tree);
      console.log(obj.filter((a) => a[1].parent === null));
      return obj.filter((a) => a[1].parent === null)[0][1];
    }
  },
  orderedTree(state) {
    return state.tree.sort((a, b) => b.parent - b.parent);
  },
};

const actions = {
  addRootData({ commit }, data) {
    commit("addRoot", data);
  },
  async getTreeData({ dispatch, commit }, data) {
    const { tree } = await get("tree");
    console.log(tree);
    if (tree.length === 0) {
      await dispatch("addRootData", data);
    } else {
      console.log(tree);
      commit(GET_TREE, tree);
    }
  },

  // async getTreeDateById({ commit }, treeId) {
  //   const { tree } = await get(`tree/${treeId}`);
  //   console.log(tree);
  //   commit(GET_TREE_BY_ID, tree);
  // },

  async addTreeData({ commit }, data) {
    console.log(data);
    const { tree } = await post("tree", {
      id: data.id,
      name: data.name,
      parent: data.parent,
      partner: data.partner,
      depth: data.depth,
    });
    console.log(tree);
    commit(ADD_TO_TREE, tree);
  },

  // async updateTreeData({ commit }, data) {
  //   console.log(data);
  //   const { tree } = await put(`tree/${data.id}`, data);
  //   console.log(tree);
  //   commit(EDIT_TREE_BY_ID, tree);
  // },

  // ============================================================================
  addMemberChild({ commit, state }, payload) {
    const item = {
      id: Object.entries(state.tree).length,
      parent: payload.id,
      name: "",
      partner: "",
      depth: state.tree[payload.id].depth + 1,
    };
    commit("addChildren", item);
  },
  addMemberParent({ commit, state }, payload) {
    const item = {
      id: Object.entries(state.tree).length,
      name: "",
      parent: null,
      partner: "",
      depth: 0,
      children: [payload.id],
    };
    commit("addParent", item);
  },
  // =================================================================
};

const mutations = {
  addChildren(state, item) {
    state.tree[item.parent] = {
      ...state.tree[item.parent],
      children: [...state.tree[item.parent].children, item.id],
    };
    state.tree = {
      ...state.tree,
      [item.id]: item,
    };
  },
  addParent(state, item) {
    state.tree[item.children[0]].parent = item.id;
    Object.entries(state.tree).forEach((a) => {
      state.tree[a[1].id].depth = state.tree[a[1].id].depth + 1;
    });
    state.tree = {
      ...state.tree,
      [item.id]: item,
    };
    console.log(state.tree);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
