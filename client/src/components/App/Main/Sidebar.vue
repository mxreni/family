<template>
  <ul class="sidebar">
    <SidebarItem
      :title="menu"
      v-for="menu in menus"
      :key="menu"
      @click="closeSidebar"
    />
  </ul>
</template>

<script>
import SidebarItem from "./SidebarItem";
export default {
  components: {
    SidebarItem,
  },
  setup(props, { emit }) {
    const menus = ["Home", "Tree", "Location", "Gallery", "Calendar"];
    const closeSidebar = () => {
      if (window.innerWidth < 1024) {
        emit("closeSide");
      }
    };
    return {
      closeSidebar,
      menus,
    };
  },
};
</script>

<style>
ul {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background: #fff;
  height: 100vh;
  list-style-type: none;
  border-right: 2px solid #008dbc;
  border-bottom: 2px solid #008dbc;
}

@media screen and (min-width: 358px) {
  ul {
    display: block;
  }
}

@media screen and (min-width: 1024px) {
  ul {
    position: relative;
    display: block;
    text-align: left;
    border: none;
  }

  .sidebar-link {
    padding: 0;
    display: flex;
    padding: 0.7rem 1.2rem;
    box-sizing: border-box;
    height: auto;
    align-items: center;
    width: 100%;
    text-decoration: none;
  }
}
</style>
