import { devApiURL, get, post, put, deleteRequest } from "../../api";
import {
  ADD_MEMBERS,
  DELETE_MEMBER_BY_ID,
  EDIT_MEMBER_BY_ID,
  GET_MEMBERS,
  GET_MEMBER_BY_ID,
} from "../actionTypes";

const imageUrl = (member) =>
  `${devApiURL}/members/${member.id}/${member.imageurl}`;

const state = () => ({
  members: [],
  member: null,
});

const actions = {
  async getMembersData({ commit }) {
    const { members } = await get("members");
    members.forEach(async (member) => {
      member.imagedata = imageUrl(member);
    });
    commit(GET_MEMBERS, members);
  },
  async addMemberData({ commit, rootState }, memberdata) {
    const { member } = await post("/members", memberdata);
    member.imagedata = imageUrl(member);
    member.relationship =
      rootState.relationship.relationships[Number(member.relationship)];
    commit(ADD_MEMBERS, member);
  },
  async getMemberDataById({ commit }, memberId) {
    const { member } = await get(`members/${memberId}`);
    member.imagedata = imageUrl(member);
    commit(GET_MEMBER_BY_ID, member);
  },
  async editMemberDataById({ commit }, memberdata) {
    const { member } = await put(
      `/members/${memberdata.get("id")}`,
      memberdata
    );
    member[0].imagedata = imageUrl(member);
    console.log(member);
    commit(EDIT_MEMBER_BY_ID, member[0]);
  },
  async deleteMemberDataById({ commit }, memberId) {
    console.log("deleting");
    const res = await deleteRequest(`members/${memberId}`);
    commit(DELETE_MEMBER_BY_ID, memberId);
  },
};

const mutations = {
  [GET_MEMBERS](state, members) {
    state.members = members;
  },
  [ADD_MEMBERS](state, member) {
    state.members = [member, ...state.members];
  },
  [GET_MEMBER_BY_ID](state, member) {
    state.member = member;
  },

  [EDIT_MEMBER_BY_ID](state, member) {
    console.log(member);
    let updatedMembers = state.members.map((m) =>
      m.id === member.id ? member : m
    );
    state.members = updatedMembers;
  },
  [DELETE_MEMBER_BY_ID](state, memberId) {
    let updatedMembers = state.members.filter((m) => m.id !== memberId);
    state.members = updatedMembers;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
