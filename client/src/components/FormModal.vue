<template>
  <form
    class="form-modal-container"
    @submit.prevent="submit"
    enctype="multipart/form-data"
  >
    <div class="form-header">
      <h1 class="form-header-title">{{Number(id) ?`${firstname} ${lastname}` : "Add member"}}</h1>
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
        <div class="input-field">
          <label for="first_name">First name</label>
          <input
            type="text"
            name="firstname"
            v-model="firstname"
            id="firstname"
            placeholder="Enter the first name"
          >
        </div>
        <div class="input-field">
          <label for="last_name">Last name</label>
          <input
            type="text"
            name="lastname"
            v-model="lastname"
            id="lastname"
            placeholder="Enter the last name"
          >
        </div>
      </div>
      <div class="input-field">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          v-model="email"
          id="email"
          placeholder="Enter the email"
        >
      </div>
      <div class="name">
        <div class="input-field">
          <label for="first-name">Gender</label>
          <select
            name="gender"
            v-model="gender"
            id="Gender"
          >
            <option
              value=""
              selected
            >select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="input-field">
          <label for="date">Date of Birth</label>
          <input
            type="date"
            name="date"
            v-model="dob"
            id="date"
          />
        </div>
      </div>
      <div class="input-field">
        <label for="phone">Phone</label>
        <input
          type="tel"
          name="phone"
          v-model="phone"
          id="phone"
          placeholder="Enter the phone number"
        >
      </div>
      <div class="input-field">
        <label for="relationship">Relationship</label>
        <select
          name="relationship"
          id="relationship"
          v-model="relationship"
        >
          <option
            selected
            value=""
          >select</option>
          <option
            v-for="relation in relationships"
            :key="relation.id"
            :value="relation.id"
          >{{relation.name}}</option>
        </select>
      </div>
      <div>
        <div
          class="file-button"
          @click="openFileUploader"
        >
          <img
            :src="image ? image: require('../assets/icons/change_image.png')"
            alt="change_image"
            class="change-image"
          >
        </div>
        <input
          type="file"
          hidden
          id="file"
          accept="image/*"
          class="file"
          name="file"
          @change="updateImage"
        />
      </div>
    </div>
    <div class="input-field btn-container form-modal-button">
      <input
        type="submit"
        value="save"
        :class="{'btn':true,'loading':loading}"
      >
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { devApiURL, put } from "../api/index";
import {
  getCurrentInstance,
  onMounted,
  watch,
  watchEffect,
} from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  components: {},
  props: ["id"],
  setup(props, { emit }) {
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;

    const firstname = ref("");
    const store = useStore();
    const lastname = ref("");
    const phone = ref("");
    const gender = ref(null);
    const email = ref("");
    const dob = ref("");
    const loading = ref("");
    const relationship = ref("");
    const image = ref(null);
    const file = ref(null);
    const relationships = ref([]);

    onMounted(async () => {
      console.log(props.id);
      await store.dispatch("relationship/getRelationshipData");
      relationships.value = store.state.relationship.relationships;
      if (Number(props.id)) {
        await store.dispatch("member/getMemberDataById", props.id);
        const member = store.state.member.member;
        console.log(member);
        firstname.value = member.firstname;
        lastname.value = member.lastname;
        gender.value = member.gender;
        dob.value = member.dob;
        phone.value = member.phone;
        email.value = member.email;
        image.value = `${devApiURL}/members/${member.id}/${member.imageurl}`;
        relationship.value = member.relationship ? member.relationship.id : 1;
      }
    });

    watchEffect(async () => {
      if (Number(props.id)) {
        await store.dispatch("member/getMemberDataById", props.id);
        const member = store.state.member.member;
        console.log(member);
        firstname.value = member.firstname;
        lastname.value = member.lastname;
        gender.value = member.gender;
        dob.value = member.dob;
        phone.value = member.phone;
        email.value = member.email;
        image.value = `${devApiURL}/members/${member.id}/${member.imageurl}`;
        relationship.value = member.relationship ? member.relationship.id : 1;
      }
    });

    const openFileUploader = () => {
      const fileEL = document.getElementById("file");
      fileEL.click();
    };

    const updateImage = (ev) => {
      image.value = URL.createObjectURL(ev.target.files[0]);
      file.value = ev.target.files[0];
    };

    const submit = async (ev) => {
      ev.preventDefault();
      const id = Number(props.id);
      const data = new FormData();
      if (id) {
        data.append("id", id);
      }
      data.append("file", file.value);
      data.append("firstname", firstname.value);
      data.append("lastname", lastname.value);
      data.append("phone", phone.value);
      data.append("email", email.value);
      data.append("dob", dob.value);
      data.append("gender", gender.value);
      data.append("relationship", relationship.value);
      const res = id
        ? await store.dispatch(`member/editMemberDataById`, data)
        : await store.dispatch("member/addMemberData", data);
      file.value = "";
      closeForm();
      if (id) {
        eventBus.emit("showModal", {
          title: "Success",
          message: "Data updated successfully",
          buttonText: "close",
        });
      } else {
        eventBus.emit("showModal", {
          title: "Success",
          message: "Data added successfully",
          buttonText: "close",
        });
      }
    };

    const closeForm = () => {
      emit("closeFormModal");
    };
    return {
      dob,
      closeForm,
      firstname,
      lastname,
      file,
      submit,
      relationship,
      gender,
      relationships,
      updateImage,
      openFileUploader,
      phone,
      image,
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
  text-transform: capitalize;
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
  font-size: 1rem;
}
select {
  background: #fff;
}
.change-image {
  width: 180px;
  height: 180px;
  border-radius: 10px;
  border: 1px solid #008dbc22;
  cursor: pointer;
  margin: 2rem auto 1rem;
}
.form-modal-button {
  display: grid;
  place-content: center;
  margin-top: 1rem;
}
</style>