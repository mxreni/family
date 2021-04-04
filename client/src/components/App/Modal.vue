<template>
  <div class="backdrop">
    <div class="modal-modal">
      <div class="modal-header">
        <h4>{{modalMessage ?  modalMessage.title : null }}</h4>
      </div>
      <div class="modal-body">
        <p>{{modalMessage ? modalMessage.message : null }}</p>
      </div>
      <div class="modal-footer">
        <button
          class="btn modal-button"
          @click="toggleModal"
        >Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
export default {
  props: ["modalMessage"],
  setup(props, { emit }) {
    const toggleModal = () => {
      emit("showModal");
    };
    onMounted(() => {
      console.log(props.modalMessage);
    });
    return {
      toggleModal,
    };
  },
};
</script>
   
<style>
.backdrop {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  background: #0002;
  place-content: center;
  overflow: hidden;
}

.modal-modal {
  background: white;
  border: 1px solid #008dbc88;
  border-radius: 10px;
}
.modal-header {
  text-align: left;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #008dbc;
  color: #fff;
}
.modal-header h4 {
  color: #fff;
}
.modal-body {
  padding: 1.5rem 4rem;
}

.modal-button {
  margin-bottom: 1rem;
  padding: 5px;
  width: 100px;
  align-self: flex-end;
}
</style>