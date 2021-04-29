<template>
  <div class="adder" @click="deleteMember">
    <img
      src="../../assets/icons/arrow_drop_down.svg"
      alt="add-member-icon"
      @click="collapse"
      class="add-member-icon"
    />
    <div
      class="vertical"
      :style="
        children === 0
          ? { heigth: '75px' }
          : { height: (children + 1) * 75 + 'px' }
      "
    ></div>
    <div class="divider"></div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from "@vue/runtime-core";
import Menu from "./Menu";
export default {
  props: ["idp", "depth", "children"],
  components: {
    Menu,
  },

  setup(props) {
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;

    const id = ref(props.idp);

    const collapse = () => {
      eventBus.emit("collapse", {
        id: id.value,
      });
    };
    return {
      id,
      collapse,
    };
  },
};
</script>

<style>
.add-member-icon {
  position: absolute;

  width: 1rem;
  border-radius: 50%;
  height: 1rem;
  z-index: 4;
  left: 19px;
  top: -10px;
  border: 1px solid #008dbc;
}
.vertical {
  height: 75px;
  position: absolute;
  border-left: 1px solid #008dbc;
  top: -40px;
  left: 27.5px;
}
.adder {
  position: relative;
  cursor: pointer;
}
.divider {
  width: 70px;
  position: absolute;
  border-bottom: 1px solid #008dbc;
  top: -20px;
  left: -10px;
}
</style>