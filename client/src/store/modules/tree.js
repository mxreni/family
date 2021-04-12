import { useStore } from "vuex";
import { get, post, put, deleteRequest } from "../../api";
import {
  ADD_TO_TREE,
  EDIT_TREE_BY_ID,
  GET_TREE,
  GET_TREE_BY_ID,
} from "../actionTypes";

const state = () => ({
  tree: {},
  currentTree: null,
});

const getters = {
  parent(state) {
    if (Object.entries(state.tree).length > 0) {
      let obj = Object.entries(state.tree);
      console.log(obj.filter((a) => a[1].parent === null));
      return obj.filter((a) => a[1].parent === null)[0][1];
    }
  },
};

const actions = {
  addRootData({ commit }, data) {
    commit("addRoot", data);
  },
  async getTreeData({ dispatch, commit }, data) {
    const { tree } = await get("tree");
    if (tree.length === 0) {
      await dispatch("addRootData", data);
    } else {
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
      type: data.type,
      parentId: data.parentId,
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
      type: "children",
      children: [],
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
      type: "parent",
      parentId: payload.id,
    };
    commit("addParent", item);
  },
  // =================================================================
};

const mutations = {
  addRoot(state, data) {
    state.tree[data.id] = data;
  },
  [GET_TREE](state, tree) {
    tree.forEach(function(obj) {
      state.tree[obj.id] = {
        ...obj,
        children: [],
      };
    });
    tree.forEach(function(obj) {
      if (obj.parent !== null) {
        state.tree[obj.parent] = {
          ...state.tree[obj.parent],
          children: [...state.tree[obj.parent].children, obj.id],
        };
      }
    });
    console.log(state.tree);
  },
  // [GET_TREE_BY_ID](state, tree) {
  //   state.currentTree = tree;
  // },
  [ADD_TO_TREE](state, data) {
    if (data.length > 0) {
      data.forEach((d) => {
        console.log(d);
        state.tree[d.id] = {
          ...state.tree[d.id],
          ...d,
        };
      });
    } else {
      state.tree = {
        ...state.tree,
        [data.id]: data,
      };
    }
  },
  addChildren(state, item) {
    state.tree[item.parent] = {
      ...state.tree[item.parent],
      children: [...(state.tree[item.parent].children || []), item.id],
    };
    state.tree = {
      ...state.tree,
      [item.id]: item,
    };
  },
  addParent(state, item) {
    console.log(item);
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
