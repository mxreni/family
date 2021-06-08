import { updateChildren } from "./helper";

// edit mutations
const editTreeById = (state, item) => {
  delete item.parent;
  delete item.partner;
  state.tree[item.id] = {
    ...state.tree[item.id],
    ...item,
  };
  console.log(state.tree[item.id]);
};

// get mutations

const getTree = (state, tree) => {
  console.log(tree);
  tree.forEach(function(obj) {
    state.tree[obj.id] = {
      ...obj,
      children: [],
    };
  });
  tree.forEach(function(obj) {
    if (obj.parent !== null) {
      updateChildren(obj.parent.id, obj, state);
    }
  });
};

// add to tree - db

const pushToTree = (state, data) => {
  if (data.length > 0) {
    data.forEach((d) => {
      delete state.tree[d.id].ref;
      delete state.tree[d.id].type;
      state.tree[d.id] = {
        ...state.tree[d.id],
        ...d,
      };
    });
    state.currentTree = null;
  } else {
    let dataInMem = state.tree[data.id];
    state.tree[data.id] = {
      ...dataInMem,
      children: state.tree[data.id].children || [],
      ...data,
    };
    if (dataInMem.type === "partner") {
      state.tree[dataInMem.ref].partner = {
        ...state.tree[data.id],
        partner: null,
        parent: null,
      };
      state.tree[data.id].partner = {
        ...state.tree[dataInMem.ref],
        partner: null,
        parent: null,
      };
    }
    //
    state.currentTree = null;
  }
};

const getTreeById = (state, tree) => {
  if (tree) {
    console.log(state.tree[tree.id]);
    state.viewTree = {
      ...tree,
      family: {
        parent: state.tree[tree.id].parent.id,
        partner: state.tree[tree.id].partner.id,
        children: state.tree[tree.id].children,
      },
    };
    console.log(state.viewTree);
  }
};

export const dbMutations = {
  pushToTree,
  getTree,
  editTreeById,
  getTreeById,
};
