<template>
  <div class="form-modal-container">
    <div class="form-header">
      <h1 class="form-header-title">Add member</h1>
      <img
        src="../assets/icons/close.svg"
        class="close"
        alt="close-icon"
        @click="closeForm"
      />
    </div>
    <div class="form-body">
      <h6 class="form-body-title">Basic information</h6>
      <div class="name">
        <Input
          type="text"
          title="Firstname"
          :value="firstname"
        />
        <Input
          type="text"
          title="Lastname"
          :value="lastname"
        />
      </div>
      <Input
        type="email"
        title="Email"
        :value="email"
      />
      <div class="name">
        <div class="input-field">
          <label for="first-name">Gender</label>
          <select
            name="gender"
            id="Gender"
          >
            <option value="">select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Input
          type="date"
          title="Date of Birth"
          :value="dob"
        />
      </div>
      <Input
        type="tel"
        title="Phone"
        :value="phone"
      />
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
        <div
          class="file-button"
          @click="openFileUploader"
        >
          <img
            src="../assets/icons/change_image.png"
            alt="change_image"
            class="change-image"
          >
        </div>
        <input
          type="file"
          hidden
          id="file"
          class="file"
          name="file"
        />
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
import Input from "./Fields/Input";
import { ref } from "@vue/reactivity";
export default {
  components: {
    Input,
  },
  setup(props, { emit }) {
    const firstname = ref("");
    const lastname = ref("");
    const phone = ref("");
    const email = ref("");
    const dob = ref("");
    const loading = ref("");

    const openFileUploader = () => {
      const fileEL = document.getElementById("file");
      fileEL.click();
    };

    const closeForm = () => {
      emit("toggleFormModal");
    };
    return {
      dob,
      closeForm,
      firstname,
      lastname,
      openFileUploader,
      phone,
      loading,
      email,
    };
  },
};
</script>

<style>
.form-body {
  background-attachment: #fff;
  padding: 0 2.7rem;
}
.close-icon {
  padding-left: 10px;
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
.file-button {
  outline: none;
  background: transparent;
  border: none;
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
  cursor: pointer;
  margin-top: 1.2rem;
}
.form-modal-button {
  display: grid;
  place-content: center;
  margin-top: 1rem;
}
</style>