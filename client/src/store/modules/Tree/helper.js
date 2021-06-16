import { v4 } from "uuid";

export const initMember = (type, ref, parent = null, children = []) => ({
  id: v4(),
  parent,
  name: "",
  partner: null,
  type,
  children,
  ref: ref || null,
});

export const updateChildren = (parent, item, state) => {
  state.tree[parent] = {
    ...state.tree[parent],
    children: [item.id, ...(state.tree[parent].children || [])],
  };
  let partner = state.tree[parent].partner;
  if (partner) {
    state.tree[partner.id] = {
      ...state.tree[partner.id],
      children: [...state.tree[parent].children],
    };
  }
};


export const shrinkChildren = (parent, item, state) => {
  let children = state.tree[parent].children.filter((a) => a !== item.id);
  state.tree[parent] = {
    ...state.tree[parent],
    children,
  };
  if (state.tree[parent].partner) {
    let partner = state.tree[parent].partner.id;
    state.tree[partner] = {
      ...state.tree[partner],
      children,
    };
  }
};
