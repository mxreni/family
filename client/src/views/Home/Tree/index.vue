<template>
  <div class="form-modal-backdrop">
    <div class="home-main">
      <div class="members">
        <div class="main-header main-header-tree">
          <div>
            <h4 class="main-header-title">Family Tree</h4>
          </div>
          <div class="main-header-menus tree-menus">
            <router-link
              :to="{ name: 'Tree.Add' }"
              class="members-icon"
              exact-active-class="icon-active"
              ><img
                src="../../../assets/icons/add_circle.svg"
                alt="calendar-icon"
            /></router-link>
            <router-link
              :to="{ name: 'Tree.View' }"
              class="members-icon"
              exact-active-class="icon-active"
              ><img src="../../../assets/icons/Tree.svg" alt="calendar-icon"
            /></router-link>
            <button class="btnn btn-trns btn-tree">Load CSV</button>
            <button class="btnn btn-trns btn-tree">Load JSON</button>
            <button class="btnn btn-trns btn-tree">Load Excel</button>
          </div>
        </div>
        <div class="members-view">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormModal from "@/components/FormModal";
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";

export default {
  components: {
    FormModal,
  },
  setup(props, { emit }) {
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;

    return {};
  },
};
</script>

<style>
.btn-tree {
  text-transform: uppercase;
  white-space: nowrap;
}
.tree-menus {
  margin-left: 20px;
}
</style>