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
    const menus = [
      "Home",
      "Members",
      "Tree",
      "Location",
      "Gallery",
      "Calendar",
    ];
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
.router-link-exact-active {
  background-color: #008dbc22;
}
.sidebar-link {
  padding: 0;
  display: flex;
  padding: 0.7rem 1.2rem;
  box-sizing: border-box;
  align-items: center;
  width: 240px;
  text-decoration: none;
}
ul {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background: #fff;
  list-style-type: none;
  border-right: 2px solid #008dbc;
  border-bottom: 2px solid #008dbc;
}
.sidebar-icon {
  padding-right: 8px;
  transform: scale(0.8);
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
    align-items: center;
    width: 100%;
    text-decoration: none;
  }
}
</style>