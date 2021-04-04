<template>
  <div class="card-info">
    <img
      :src="card.imagedata"
      alt="user"
      class="card-image"
    />
    <div class="card-body">
      <p class="card-title">{{card.firstname}} {{card.lastname}}</p>
      <p>Gender: {{card.gender}}</p>
      <p>DOB: {{card.dob}}</p>
      <p>{{card.relationship ? card.relationship.name: 'Unknown'}}</p>
    </div>
  </div>
  <div class="card-footer">
    <p>Phone: {{card.phone}}</p>
    <p>Email: {{card.email.slice(0,15)}}</p>
  </div>
  <div
    class="edit"
    @click="openForm(card.id)"
  >
    <div class="edit-icon-contain"><img
        src="../../assets/icons/edit.svg"
        alt="view-list"
        class="edit-icon"
      /></div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted } from "@vue/runtime-core";
export default {
  props: ["card"],
  setup(props, { emit }) {
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;
    const openForm = (id) => {
      eventBus.emit("toggleFormModal", id);
    };
    return {
      openForm,
    };
  },
};
</script>

<style>
</style>