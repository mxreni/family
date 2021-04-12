<template>
  <div class="backdrop">
    <div class="modal-modal">
      <div class="modal-header">
        <h4>{{modalMessage ?  modalMessage.title : 'Error' }}</h4>
      </div>
      <div class="modal-body">
        <p>{{modalMessage ? modalMessage.message : 'Something went wrong' }}</p>
      </div>
      <div class="modal-footer">
        <button
          class="btn modal-button"
          @click="toggleModal"
        >{{modalMessage ? modalMessage.buttonText : 'Close' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["modalMessage"],
  setup(props, { emit }) {
    const store = useStore();
    const toggleModal = async () => {
      if (props.modalMessage.action) {
        console.log("deleting");
        await store.dispatch(props.modalMessage.action, props.modalMessage.id);
      }
      emit("showModal");
    };

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
  display: grid;
  background: #0002;
  place-content: center;
  overflow-x: hidden;
  overflow-y: scroll;
}

.modal-modal {
  background: white;
  overflow: hidden;
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