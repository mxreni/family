<template>
  <div class="menu-container">
    <div class="menu">
      <li
        class="menu-item"
        v-for="menuitem in menus"
        :key="menuitem"
        :value="menuitem"
        @click="selectMenu"
      >{{menuitem}}</li>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["idp"],
  setup(props, { emit }) {
    const appInstance = getCurrentInstance();
    const store = useStore();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;
    const menuShow = ref(false);
    const menus = ref(
      props.idp === store.getters["tree/parent"].id
        ? ["parent", "children"]
        : ["children"]
    );
    const selectMenu = (ev) => {
      emit("closeMenu");
      eventBus.emit("addMemberItem", {
        type: ev.target.innerHTML,
        id: props.idp,
      });
    };
    return {
      menus,
      menuShow,
      selectMenu,
    };
  },
};
</script>

<style>
.menu {
  border: 1px solid #008dbc55;
  background: white;
}
.menu-item {
  list-style-type: none;
  white-space: nowrap;
  border-bottom: 1px solid #008dbc55;
  text-align: left;
  padding: 10px 5px;
  padding-right: 40px;
  cursor: pointer;
}
.menu-item:active,
.menu-item:hover,
.menu-item:focus {
  background: #008dbc77;
  color: #fff;
}
</style>