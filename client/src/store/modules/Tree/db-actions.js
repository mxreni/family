import { get, post } from "../../../api";
import { ADD_TO_TREE, GET_TREE } from "../../actionTypes";

export const getTreeData = async ({ commit }) => {
  const { tree } = await get("tree");
  commit(GET_TREE, tree);
};

export const addTreeData = async ({ commit }, data) => {
  console.log(data);
  const { tree } = await post("tree", {
    id: data.id,
    name: data.name,
    dob: data.dob,
    gender: data.gender,
    parent: data.parent,
    depth: data.depth,
    partner: data.partner,
    type: data.type,
    parentId: data.ref,
  });
  console.log(tree);
  commit(ADD_TO_TREE, tree);
};
