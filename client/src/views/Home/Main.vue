<template>
  <div class="home">
    <Header @openSideMenu="displaySidemenu" />
    <div class="home-container">
      <div
        class="home-sidebar"
        v-if="showMenu"
      >
        <Sidebar @closeSide="displaySidemenu" />
      </div>
      <div class="home-mainbar">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <!-- <div
    v-else
    class="container"
  >loading...</div> -->
</template>

<script>
import { onMounted, onUpdated, ref } from "@vue/runtime-core";
import Header from "../../components/App/Header";
import Sidebar from "../../components/App/Sidebar";

export default {
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const showMenu = ref(false);
    onMounted(() => {
      if (window.innerWidth > 1024) {
        showMenu.value = true;
      }
      window.addEventListener("resize", (ev) => {
        if (window.innerWidth > 1024) {
          showMenu.value = true;
        } else {
          showMenu.value = false;
        }
      });
    });
    const displaySidemenu = () => {
      showMenu.value = !showMenu.value;
    };
    return { showMenu, displaySidemenu };
  },
};
</script>

<style>
@media screen and (min-width: 658px) {
  .home-container {
    width: 100%;
    height: 92vh;
  }
  .home-sidebar {
    display: block;
  }
  .home-mainbar {
    margin: 0 auto;
  }
}
@media screen and (min-width: 1024px) {
  .home-container {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    height: 92vh;
  }
  .home-sidebar {
    height: 90%;
    float: left;
    display: block;
    width: 250px;
  }
  .home-mainbar {
    float: right;
    width: calc(100% - 251px);
    min-height: 97vh;
    border-left: 0.8px solid #008dbc55;
  }
}
</style>