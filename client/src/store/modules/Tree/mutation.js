import { updateChildren, shrinkChildren } from "./helper";

// add ui mutations
const addChildren = (state, item) => {
  const parent = typeof item.parent === "string" ? item.parent : item.parent.id;
  updateChildren(parent, item, state);
  state.tree[item.id] = state.currentTree = item;
};

const addPartner = (state, item) => {
  console.log("here");
  let initRef = state.tree[item.ref];
  state.tree[item.ref] = {
    ...initRef,
    partner: item,
  };
  state.tree[item.id] = item;
  state.currentTree = item;
};

const addParent = (state, item) => {
  state.tree[item.id] = item;
  state.tree[item.children[0]].parent = item.id;
  Object.values(state.tree).map((a) => {
    if (a.id !== item.id) {
      state.tree[a.id].depth = 0;
    }
  });
  state.currentTree = item;
  state.parent = null;
};

const readParent = (state, payload) => {
  let parent = state.tree[payload.id].parent;
  let res;
  while (parent !== null) {
    res = state.tree[parent.id || parent];
    parent = state.tree[parent.id || parent].parent;
  }
  state.tree[res.id].depth = 1;
  Object.values(state.tree).map((a) => {
    if (a.id !== res.id) {
      state.tree[a.id].depth = 0;
    }
  });
};

// remove mutations
const removeParent = (state, item) => {
  state.tree[item.id].children.forEach((obj) => {
    state.tree[obj].parent = null;
    state.tree[obj].depth = 1;
  });
  delete state.tree[item.id];
  state.currentTree = null;
};

const removeChildren = (state, item) => {
  let parent = state.tree[item.id].parent.id;
  shrinkChildren(parent, item, state);
  delete state.tree[item.id];
  state.currentTree = null;
};

const removePartner = (state, item) => {
  state.tree[item.ref].partner = null;
  delete state.tree[item.id];
  state.currentTree = null;
};


export const uiMutations = {
  removeChildren,
  removeParent,
  removePartner,
  readParent,
  addChildren,
  addParent,
  addPartner,
};
