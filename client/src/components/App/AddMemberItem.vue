<template>
  <div
    class="add-container"
    :style="parent!==null ? {marginLeft: (depth)*40 + 'px'} : {marginLeft:0}"
  >
    <Adder :idp="user.id" />
    <div class="member-item">
      <div class="member-item-divider"></div>
      <div class="member-item-menu">
        <Menu
          :idp="user.id"
          v-if="menuShow"
          @closeMenu="showMenu"
        />
      </div>
      <img
        src="../../assets/icons/add_circle_light.svg"
        alt="add-member-icon"
        class="add-member-icon member-item-add"
        @click="showMenu"
      >
      <div class="input-field add-member-input">
        <input
          type="text"
          name="name"
          v-model="name"
          placeholder="Enter the name"
        >
      </div>
      <div class="input-field add-member-input">
        <select
          name="gender"
          v-model="gender"
        >
          <option
            value=""
            :selected="gender===''"
          >Gender</option>
          <option
            value="male"
            :selected="gender==='male'"
          >Male</option>
          <option
            value="female"
            :selected="gender ==='female'"
          >Female</option>
          <option
            value="other"
            :selected="gender==='other'"
          >Other</option>
        </select>
      </div>
      <div class="input-field add-member-input">
        <input
          type="date"
          name="date"
          v-model="dob"
        />
      </div>
      <div class="input-field add-member-input">
        <input
          type="text"
          name="partner"
          v-model="partner"
          placeholder="Partner name"
        />
      </div>
      <div class="input-field member-add-save">
        <input
          type="submit"
          :value="user.status==='Active' ? 'Delete' : 'Add' "
          @click="addMember"
          :class="{'btn':true}"
        >
      </div>
    </div>
  </div>
  <AddMemberItem v-for="item in user.children" :key="item"
    :parent="root[item].parent"
    :id="item"
    :user="root[item]"
    :depth="root[item].depth"
  />
</template>

<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  ref,
} from "@vue/runtime-core";
import Adder from "./Adder";
import Menu from "./Menu";

import { useStore } from "vuex";
export default {
  components: {
    Adder,
    Menu,
  },

  props: ["parent", "user", "id", "depth"],

  setup(props) {
    const store = useStore();
    const menuShow = ref(false);
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;

    const name = ref(props.user.name);
    const dob = ref("");
    const partner = ref(props.user.partner);
    const gender = ref("");

    const showMenu = () => {
      menuShow.value = !menuShow.value;
    };
    const root = computed(()=>store.state.tree.tree)
  
    const addMember = async () => {
      const data = {
        name: name.value,
        dob: dob.value,
        partner: partner.value,
        id: props.user.id,
        type: props.user.type,
        parentId: props.user.parentId,
        gender: gender.value,
        parent: props.parent,
        depth: props.depth ? props.depth : 0,
      };
      if (name.value !== "") {
        await store.dispatch("tree/addTreeData", data);
        eventBus.emit("showModal", {
          title: "Success",
          message: "Data added successfully",
          buttonText: "close",
        });
      }
    };

    return {
      name,
      dob,
      addMember,
      root,
      partner,
      gender,
      showMenu,
      menuShow,
    };
  },
};
</script>

<style>
input,
style {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.member-item {
  min-width: 820px;
  display: grid;
  position: relative;
  grid-template-columns: repeat(5, 1fr);
  margin-left: 50px;
  padding: 10px 0;
}
.member-add-save {
  width: 50px;
}

.member-item-divider {
  position: absolute;
  width: 840px;
  top: 34.5px;
  left: 10px;
  z-index: -5;
  border-bottom: 1px solid #008dbc;
}
.member-item input,
select {
  height: 2.3rem;
  border: 1.7px solid #008bdc;
}

.member-item-add {
  top: 27px;
  width: 1rem;
  height: 1rem;
  position: absolute;
  border: 0px;
  left: 850px;
}
.add-container {
  display: flex;
  box-sizing: border-box;
  align-items: center;
}
.member-item-menu {
  position: absolute;
  right: -18%;
  z-index: 4;
  top: 25px;
}
</style>
