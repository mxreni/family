<template>
  <div
    class="form-modal-container"
    v-if="openFormModal"
    @open="displayForm"
  >
    <div class="form-header">
      <h1 class="form-header-title">Add member</h1>
      <p @click="closeForm">x</p>
    </div>
    <div class="form-body">
      <h6 class="form-body-title">Basic information</h6>
      <div class="name">
        <div class="input-field">
          <label for="first-name">Firstname</label>
          <input
            type="text"
            name="firstname"
            v-model="first_name"
            id="firstname"
            placeholder="Enter firstname"
          >
        </div>
        <div class="input-field">
          <label for="last-name">Lastname</label>
          <input
            type="text"
            name="Lastname"
            v-model="last_name"
            id="lastname"
            placeholder="Enter lastname"
          >
        </div>
      </div>
      <div class="input-field">
        <label for="email">Email</label>
        <input
          type="text"
          name="Email"
          v-model="email"
          id="Email"
          placeholder="Enter your email"
        >
      </div>
      <div class="name">
        <div class="input-field">
          <label for="first-name">Gender</label>
          <select
            name="gender"
            id="Gender"
          >
            <option value="">select</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
        </div>
        <div class="input-field">
          <label for="last-name">Date of birth</label>
          <input
            type="text"
            name="Lastname"
            v-model="last_name"
            id="lastname"
            placeholder="Enter lastname"
          >
        </div>
      </div>
      <div class="input-field">
        <label for="phone">Phone</label>
        <input
          type="text"
          name="Phone"
          v-model="phone"
          id="Phone"
          placeholder="Enter phone"
        >
      </div>
      <div class="input-field">
        <label for="first-name">Relationship</label>
        <select
          name="gender"
          id="Gender"
        >
          <option value="">select</option>
        </select>
      </div>
      <div>
        <img
          src="../assets/icons/change_image.png"
          alt="change_image"
          class="change-image"
        >
      </div>
      <div class="input-field btn-container form-modal-button">
        <input
          type="submit"
          value="save"
          :class="{'btn':true,'loading':loading}"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const openFormModal = ref(false);
    const displayForm = () => {
      console.log("here");
      openFormModal.value = true;
    };
    const closeForm = () => {
      openFormModal.value = false;
    };
    return {
      openFormModal,
      displayForm,
      closeForm,
    };
  },
};
</script>

<style>
.form-body {
  background-attachment: #fff;
  padding: 0 2.7rem;
}
.form-header {
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 2.7rem;
  border-bottom: 0.7px solid #0008;
}
.form-header-title {
  font-size: 1rem;
  color: #008bdc;
}
.form-body-title {
  text-align: left;
  padding: 1.5rem 0.4rem 1.2rem;
  font-size: 0.9rem;
}
select {
  background: #fff;
}
.change-image {
  width: 130px;
  height: 130px;
  margin-top: 1.2rem;
}
.form-modal-button {
  display: grid;
  place-content: center;
  margin-top: 1rem;
}
</style>