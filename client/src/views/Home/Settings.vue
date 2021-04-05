<template>
  <div class="home-main settings">
    <div class="main-header">
      <div>
        <h4 class="main-header-title">Settings</h4>
      </div>
    </div>
    <form
      class="form-settings"
      @submit.prevent="submit"
      enctype="multipart/form-data"
    >

      <h3 class="form-settings-title">
        <img
          src="../../assets/icons/manage_accounts.svg"
          alt="basic info"
          class="settings-icon"
        />
        Basic
        information
      </h3>
      <div class="form-basic">
        <div class="form-basic-left">
          <div class="input-field input-field-settings">
            <label for="first_name">First name</label>
            <input
              type="text"
              name="firstname"
              v-model="firstname"
              id="firstname"
              placeholder="Enter the first name"
            >
          </div>
          <div class="input-field input-field-settings">
            <label for="lastname">Last name</label>
            <input
              type="text"
              name="lastname"
              v-model="lastname"
              id="lastname"
              placeholder="Enter the last name"
            >
          </div>
          <div class="input-field input-field-settings">
            <label for="email">Email</label>
            <input
              readonly
              disabled
              type="email"
              name="email"
              v-model="email"
              id="email"
              placeholder="Enter the email"
            >
          </div>
        </div>
        <div class="form-basic-right">
          <div
            class="file-button"
            @click="openFileUploader"
          >
            <img
              :src="image ? image: require('../../assets/icons/change_image.png')"
              alt="change_image"
              class="change-image form-settings-image"
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
      <div class="row-input">
        <div class="input-field input-field-settings">
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
        <div class="input-field input-field-settings">
          <label for="date">Date of Birth</label>
          <input
            type="date"
            name="date"
            v-model="dob"
            id="date"
          />
        </div>
      </div>
      <div class="input-field input-field-settings">
        <label for="username">Phone</label>
        <input
          type="text"
          name="phone"
          v-model="phone"
          id="phone"
          placeholder="Phone"
        >
      </div>
      <div class="input-field input-field-settings">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          v-model="username"
          id="username"
          placeholder="Username"
        >
      </div>
      <div class="input-field input-field-settings">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          v-model="password"
          id="password"
          placeholder="Password"
        >
      </div>
      <div class="input-field btn-container-settings">
        <input
          type="submit"
          value="save"
          :class="{'btn':true,'loading':loading}"
        >
      </div>
      <hr class="divider" />
      <h3 class="form-settings-title">
        <img
          src="../../assets/icons/manage_accounts.svg"
          alt="basic info"
          class="settings-icon"
        />Account Settings
      </h3>
      <div>
        <p class="form-settings-text"><img
            class="settings-icon"
            src="../../assets/icons/delete.svg"
            alt="basic info"
          />Delete account</p>
      </div>
    </form>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from "@vue/runtime-core";
import { devApiURL } from "../../api";
import Modal from "../../components/App/Modal";
import { useStore } from "vuex";
export default {
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    const firstname = ref("");
    const lastname = ref("");
    const gender = ref("");
    const phone = ref("");
    const email = ref("");
    const loading = ref(false);
    const password = ref("");
    const dob = ref("");
    const username = ref("");
    const image = ref("");
    const file = ref("");

    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;

    onMounted(async () => {
      const user = store.state.auth.currentUser;
      console.log(user);
      firstname.value = user.firstname;
      lastname.value = user.lastname;
      email.value = user.email || "";
      phone.value = user.phone || "";
      gender.value = user.gender || "";
      dob.value = user.dob || "";
      username.value = user.username;
      image.value = user.photourl
        ? `${devApiURL}/users/${user.id}/${user.photourl}`
        : null;
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
      loading.value = true;
      const data = new FormData();
      data.append("file", file.value ? file.value : null);
      data.append("firstname", firstname.value);
      data.append("lastname", lastname.value);
      data.append("phone", phone.value);
      data.append("dob", dob.value);
      data.append("gender", gender.value);
      data.append("password", password.value);
      data.append("username", username.value);
      await store.dispatch("auth/updateUserData", data);
      file.value = "";
      eventBus.emit("showModal", {
        title: "Success",
        message: "Successfully updated user!",
        buttonText: "close",
      });
      loading.value = false;
    };

    return {
      firstname,
      updateImage,
      image,
      lastname,
      phone,
      loading,
      email,
      gender,
      password,
      submit,
      dob,
      openFileUploader,
      username,
    };
  },
};
</script>

<style>
.form-settings {
  margin-top: 1.2rem;
  width: 76%;
}

.divider {
  margin: 1.2rem 0;
}

.form-basic-left {
  grid-column: 1/3;
  padding-top: 10px;
  min-width: 70%;
  right: auto;
}
.row-input {
  display: flex;
}

.input-field-settings {
  margin: 0.5rem 0;
}
.input-field-settings input {
  border: 1px solid #008dbc;
  padding: 10px 8px;
}
.form-settings-image {
  height: 200px;
  width: 200px;
}
.form-settings-title {
  text-align: left;
  font-size: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1.4px solid #008bdc;
  padding: 1rem 0;
}
.btn-container-settings {
  margin: 2.2rem 0 0 auto;
  display: flex;
  justify-content: flex-end;
}
.form-settings-text {
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin: 1.2rem 0;
  cursor: pointer;
  color: red;
  opacity: 0.8;
}
select {
  padding: 10px 8px;
}
.settings-icon {
  margin-right: 1rem;
}

@media screen and (min-width: 358px) {
  .form-settings {
    width: 95%;
  }
  .form-basic {
    display: grid;
    grid-template-columns: 1fr;
  }
  .form-basic-left {
    order: 1;
  }

  .form-basic-right {
    text-align: left;
  }
  .row-input {
    flex-direction: column;
  }
}

@media screen and (min-width: 658px) {
  .form-settings {
    width: 95%;
  }
  .form-basic-left {
    order: 0;
  }
  .form-basic-right {
    text-align: center;
    display: grid;
    place-content: center;
  }
  .form-basic {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.5rem;
  }
  .row-input {
    flex-direction: row;
  }
  .row-input > * {
    width: 48%;
    margin-right: 1.2rem;
  }
}
</style>