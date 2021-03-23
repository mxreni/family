<template>
  <div
    :class="{'error':true,'success': success}"
    v-if="message"
  >
    <p
      class="
    close"
      @click="closeMessage"
    >X</p>
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
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0 5px 0 -10px;
  cursor: pointer;
}
</style>