const parent = (state) => {
  if (Object.values(state.tree).length > 0) {
    let obj = Object.values(state.tree);
    let res = obj
      .filter((a) => a.parent === null && a.depth === 1)
      .map((a) => a.id)[0];
    console.log(res);
    return res;
  }
};

const checkParent = (state) => {
  return (id) => {
    if (state.tree[id].parent) {
      return true;
    }
    return false;
  };
};

const findPathToParent = (state) => {
  return (id) => {
    let res = state.tree[id];
    let parent = state.tree[id].parent;
    let newIndex = [];
    while (parent !== null) {
      newIndex.unshift(state.tree[parent.id].children.indexOf(res.id));
      res = parent;
      parent = state.tree[parent.id].parent;
    }
    return newIndex || null;
  };
};

// to generate tree structure
const heightTree = (state) => {
  let data = state.tree;
  let heightOf = (item) => {
    return {
      name: data[item].name,
      id: data[item].id,
      partner: data[item].partner,
      children: data[item].children.map((obj) => heightOf(obj)) || [],
      status: data[item].status,
      parent: data[item].parent,
    };
  };
  return heightOf;
};

export const getters = {
  parent,
  checkParent,
  findPathToParent,
  heightTree,
};
