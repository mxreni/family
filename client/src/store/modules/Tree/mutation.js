import { updateChildren } from "./helper";

export const addChildren = (state, item) => {
  const parent = typeof item.parent === "string" ? item.parent : item.parent.id;
  updateChildren(parent, item, state);
  state.tree[item.id] = state.currentTree = item;
};

export const addPartner = (state, item) => {
  console.log("here");
  let initRef = state.tree[item.ref];
  state.tree[item.ref] = {
    ...initRef,
    partner: item,
  };
  state.tree[item.id] = item;
  state.currentTree = item;
};

export const addParent = (state, item) => {
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

export const readParent = (state, payload) => {
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

export const removeParent = (state, item) => {
  state.tree[item.id].children.forEach((obj) => {
    state.tree[obj].parent = null;
    state.tree[obj].depth = 1;
  });
  delete state.tree[item.id];
};

export const removeChildren = (state, item) => {
  let parent = state.tree[item.id].parent.id;
  let children = state.tree[parent].children.filter((a) => a !== item.id);
  state.tree[parent] = {
    ...state.tree[parent],
    children,
  };
  delete state.tree[item.id];
};

export const removePartner = (state, item) => {
  state.tree[item.ref].partner = null;
  delete state.tree[item.id];
  console.log(item);
};
