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
import { getCurrentInstance } from "@vue/runtime-core";
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
.card-info {
  display: flex;
  font-size: 1rem;
}
.card-body {
  text-align: left;
  padding: 0.5rem 0 0 0.5rem;
  text-transform: capitalize;
}
.card-title {
  color: #008dbc99;
  white-space: nowrap;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.4rem;
}

.card-image {
  width: 90px;
  height: 90px;
  border-radius: 10px;
  border: 1px solid #008dbc55;
  margin: 10px;
  aspect-ratio: 1/1;
}
.card-footer {
  text-align: left;
  padding: 0.5rem 1rem 0;
  line-height: 1.5rem;
}

.card {
  border: 1px solid #008dbc22;
  font-size: 1rem;
  padding-bottom: 0.5rem;
  border-radius: 5px;
  position: relative;
  line-height: 1.5rem;
}
.edit {
  position: absolute;
  bottom: -8px;
  right: -30px;
  border-bottom: 40px solid #ffec5c44;
  transform: rotate(-225deg);
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
}

.edit-icon-contain {
  position: absolute;
  top: 10px;
  right: -15px;
}
.edit-icon {
  transform: scale(0.8) rotate(45deg);
}

@media screen and (min-width: 658px) {
  .card {
    width: 100%;
  }
}
</style>