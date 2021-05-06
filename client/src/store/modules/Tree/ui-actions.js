import { initMember } from "./helper";

export const addMemberChild = ({ commit, state }, payload) => {
  const parent = state.tree[payload.id];
  const item = initMember("children", null, parent);
  console.log(item);
  commit("addChildren", item);
};

export const addMemberSibling = ({ commit, state }, payload) => {
  let val = state.tree[payload.id].parent;
  const parent = Number(val) ? state.tree[val] : val;
  const item = initMember("sibling", null, parent);
  commit("addChildren", item);
};

export const addMemberPartner = ({ commit, state }, payload) => {
  let children = state.tree[payload.id].children;
  const item = initMember("partner", payload.id, null, children);
  commit("addPartner", item);
};

export const addMemberParent = ({ commit, state, getters }, payload) => {
  let parent = state.tree[payload.id].parent;
  let check = parent && parent.status === "Active";
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

export const removeMemberData = ({ commit, state }, item) => {
  if (item.type === "parent") {
    commit("removeParent", item);
  } else if (item.type === "children" || item.type === "sibling") {
    commit("removeChildren", item);
  } else if (item.type === "partner") {
    commit("removePartner", item);
  }
};

export const resetParent = ({ state }) => {
  state.parent = null;
};
