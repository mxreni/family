import { initMember } from "./helper";

const addMemberChild = ({ commit, state }, payload) => {
  const parent = state.tree[payload.id];
  const item = initMember("children", null, parent);
  console.log(item);
  commit("addChildren", item);
};

const addMemberSibling = ({ commit, state }, payload) => {
  let val = state.tree[payload.id].parent;
  const parent = Number(val) ? state.tree[val] : val;
  const item = initMember("sibling", null, parent);
  commit("addChildren", item);
};

const addMemberPartner = ({ commit, state }, payload) => {
  let children = state.tree[payload.id].children;
  const item = initMember("partner", payload.id, null, children);
  commit("addPartner", item);
};

const addMemberParent = ({ commit, state, getters }, payload) => {
  let parent = state.tree[payload.id].parent;
  let check = parent && parent.status === "active";
  if (!check) {
    const item = {
      ...initMember("parent", payload.id, null, [payload.id]),
      depth: 1,
    };
    commit("addParent", item);
  } else {
    commit("readParent", payload);
    state.parent = getters["findPathToParent"](payload.id);
  }
};

const removeMemberData = ({ commit, state }, item) => {
  if (item.type === "parent") {
    commit("removeParent", item);
  } else if (item.type === "children" || item.type === "sibling") {
    commit("removeChildren", item);
  } else if (item.type === "partner") {
    commit("removePartner", item);
  }
};

const resetParent = ({ state }) => {
  state.parent = null;
};

const cleanUpStateTree = ({ state, commit }) => {
  commit(state);
};

// edit

const editCurrentTree = ({ state }, item) => {
  state.tree[item.id].status = "draft";
};

const cancelTreeUpdate = ({ state }, item) => {
  state.tree[item.id].status = "active";
};

export const uiActions = {
  cancelTreeUpdate,
  editCurrentTree,
  addMemberChild,
  addMemberParent,
  addMemberSibling,
  addMemberPartner,
  removeMemberData,
  resetParent,
  cleanUpStateTree,
};
