import { get } from "../../api";
import { GET_RELATIONSHIPS, GET_RELATIONSHIP_BY_ID } from "../actionTypes";

const state = () => ({
  relationships: [],
  relationship: null,
});

const actions = {
  async getRelationshipData({ commit }) {
    const data = await get("relationship");
    commit(GET_RELATIONSHIPS, data.relationships);
  },
  async getRelationshipDataById({ commit }, id) {
    const { relationship } = await get("relationship", id);
    console.log(relationship);
    commit(GET_RELATIONSHIP_BY_ID, relationship);
  },
};

const mutations = {
  [GET_RELATIONSHIPS](state, relationships) {
    state.relationships = relationships;
  },
  [GET_RELATIONSHIP_BY_ID](state, relationship) {
    state.relationship = relationship;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
