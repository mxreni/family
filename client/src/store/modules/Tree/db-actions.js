import { get, post, put } from "../../../api";
import {
  ADD_TO_TREE,
  GET_TREE,
  EDIT_TREE_BY_ID,
  GET_TREE_BY_ID,
} from "../../actionTypes";

const getTreeData = async ({ commit }) => {
  const { trees } = await get("tree");
  commit(GET_TREE, trees);
};

const addTreeData = async ({ commit }, data) => {
  console.log(data);
  const { tree } = await post("tree", data);
  console.log(tree);
  commit(ADD_TO_TREE, tree);
};

const updateTreeData = async ({ commit }, data) => {
  const { tree } = await put(`tree/${data.get("id")}`, data);
  commit(EDIT_TREE_BY_ID, tree);
};

const getTreeDataById = async ({ commit }, data) => {
  const { tree } = await get(`tree/${data.id}`);
  console.log(tree);
  commit(GET_TREE_BY_ID, tree);
};

export const dbActions = {
  updateTreeData,
  addTreeData,
  getTreeData,
  getTreeDataById,
};
