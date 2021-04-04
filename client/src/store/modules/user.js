import { devApiURL, get } from "../../api";

const state = () => ({
  members: [],
  member: null,
});

const actions = {
  async getMembersData({ commit }) {
    const { members } = await get("members");
    members.forEach(async (member) => {
      member.imagedata = `${devApiURL}}/members/${member.id}/${member.imageurl}`;
    });
    commit("getMembers", members);
  },
  async addMemberData({ dispatch, commit }, member) {
    const res = await post("/members", member);
    commit("pushMembers", res.member);
  },
  async getMemberDataById({ commit }, memberId) {
    const { member } = await get(`members/${memberId}`);
    commit({ getMemberById }, member);
  },
};

const mutations = {
  getMembers(state, members) {
    state.members = members;
  },
  pushMembers(state, member) {
    state.members = [...state.members, member];
  },
  getMemberById(state, member) {
    state.member = member;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
