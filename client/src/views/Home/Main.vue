<template>
  <div class="alert-service" v-if="showModal">
    <Modal @showModal="showModal = !showModal" :modalMessage="modalMessage" />
  </div>
  <div
    class="home"
    :style="
      showModal
        ? { height: 'calc(100vh)', overflow: 'hidden' }
        : { height: 'auto' }
    "
  >
    <Header @openSideMenu="toggleSidemenu" />
    <div class="home-container">
      <div class="home-sidebar" v-if="showMenu">
        <Sidebar @closeSide="toggleSidemenu" />
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
import {
  getCurrentInstance,
  onMounted,
  onUpdated,
  ref,
} from "@vue/runtime-core";
import Header from "../../components/App/Main/Header";
import Sidebar from "../../components/App/Main/Sidebar";
import Modal from "../../components/App/Main/Modal";

export default {
  components: {
    Header,
    Sidebar,
    Modal,
  },
  setup() {
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;
    const showMenu = ref(false);
    const showModal = ref(false);
    const modalMessage = ref(null);
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
      eventBus.on("showModal", (args) => {
        showModal.value = true;
        modalMessage.value = args;
      });
    });
    const toggleSidemenu = () => {
      showMenu.value = !showMenu.value;
    };
    return { showMenu, toggleSidemenu, showModal, modalMessage };
  },
};
</script>

<style>
.alert-service {
  position: absolute;
  z-index: 2;
}
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
  body {
    overflow: auto;
    /* overflow-x: hidden; */
  }
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
    min-height: calc(100vh - 70px);
    border-left: 0.8px solid #008dbc55;
  }
}
</style>