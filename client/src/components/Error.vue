<template>
  <div
    :class="{'error':true,'success': success}"
    v-if="message"
  >
    <img
      src="../assets/icons/close.svg"
      class="close"
      alt="close-icon"
      @click="closeMessage"
    />
    <p>{{message}}</p>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from "@vue/runtime-core";
export default {
  props: ["message", "type"],
  setup(props, { emit }) {
    const success = ref(false);
    onUpdated(() => {
      if (props.type === "success") {
        success.value = true;
      }
    });
    const closeMessage = () => {
      emit("close");
    };
    return {
      closeMessage,
      success,
    };
  },
};
</script>

<style>
.error {
  display: flex;
  background: #fab1a055;
  color: #d63031;
  max-width: 80%;
  box-sizing: border-box;
  margin: 1rem auto -10px;
  padding: 10px 30px;
  border-radius: 10px;
  font-size: 0.8rem;
  line-height: 1.4rem;
}
.success {
  background: #1abc9c33;
  color: #16a085;
}
.close {
  margin: 0 -25px 0;
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
}
</style>