import { get } from "../../api";
import { GET_RELATIONSHIPS } from "../actionTypes";

const state = () => ({
  relationships: [],
});

const actions = {
  async getRelationshipData({ commit }) {
    const data = await get("relationship");
    commit(GET_RELATIONSHIPS, data.relationships);
  },
};

const mutations = {
  [GET_RELATIONSHIPS](state, relationships) {
    state.relationships = relationships;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
