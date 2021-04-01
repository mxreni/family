<template>
  <div class="formc signup">
    <Error
      :type="errorType"
      :message="message"
      v-show="message"
      @close="closeMessage"
    />
    <h5 class="form-title">Create an account</h5>
    <form @submit.prevent="submit">
      <div class="fields">
        <div class="name">
          <div class="input-field">
            <label for="first_name">First name</label>
            <input
              type="text"
              name="first_name"
              v-model="first_name"
              id="first_name"
              placeholder="Enter the first name"
            >
          </div>
          <div class="input-field">
            <label for="last_name">Last name</label>
            <input
              type="text"
              name="last_name"
              v-model="last_name"
              id="last_name"
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
        <div class="input-field">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            v-model="password"
            id="password"
            placeholder="Enter password"
          >
        </div>
        <div class="input-field">
          <label for="confirm-password">Confirm password</label>
          <input
            type="password"
            name="confirm_password"
            v-model="confirm_password"
            id="confirm_password"
            placeholder="Enter the confirm password"
          >
        </div>
        <div class="input-field btn-container">
          <input
            type="submit"
            value="submit"
            :class="{'btn':true,'loading':loading}"
          >
        </div>
      </div>
      <p class="account-verify">
        Already have an account?
        <router-link :to="{'name':'Login'}">Login</router-link>
      </p>
    </form>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { signup } from "@/api";
// @ is an alias to /src
import Error from "@/components/Error";

export default {
  name: "Home",
  components: {
    Error,
  },
  setup() {
    const errors = ref([]);
    const loading = ref(false);
    const first_name = ref("");
    const last_name = ref("");
    const email = ref("");
    const password = ref("");
    const confirm_password = ref("");
    const message = ref("");
    const errorType = ref("error");
    const confirmPassword = (password, confirm_password) => {
      return password === confirm_password;
    };

    const closeMessage = () => {
      message.value = false;
    };

    const submit = async (e) => {
      e.preventDefault();

      if (first_name.value === "" || first_name.value === undefined) {
        errors.value = [...errors.value, "first name"];
      }
      if (last_name.value === "" || last_name.value === undefined) {
        errors.value = [...errors.value, "last name"];
      }
      if (email.value === "" || email.value === undefined) {
        errors.value = [...errors.value, "email"];
      }
      if (password.value === "" || password.value === undefined) {
        errors.value = [...errors.value, "password"];
      }
      if (
        confirm_password.value === "" ||
        confirm_password.value === undefined
      ) {
        errors.value = [...errors.value, "confirm_password"];
      }

      console.log(errors.value);
      if (!errors.value.length) {
        loading.value = true;
        if (!confirmPassword(password.value, confirm_password.value)) {
          message.value = "Password and confirm password do not match ";
        } else {
          try {
            const data = {
              firstname: first_name.value,
              lastname: last_name.value,
              email: email.value,
              password: password.value,
            };
            console.log(data);
            const user = await signup(data);
            first_name.value = "";
            last_name.value = "";
            email.value = "";
            password.value = "";
            confirm_password.value = "";
            console.log(user);
            if (user.status === "success") {
              errorType.value = "success";
              message.value =
                "Account is successfully created. You can login now!";
            }
            loading.value = false;
          } catch (err) {
            console.log(err);
            loading.value = false;
            errorType.value = "error";
            message.value = "Something went wrong.Please try again later";
          }
        }
      } else {
        const errorMessage =
          errors.value.length >= 2
            ? `Please enter the following missing fields: ${errors.value.slice(
                0,
                errors.value.length - 1
              )} and ${errors.value[errors.value.length - 1]}`
            : `Please enter the ${errors.value[0]}`;
        message.value = errorMessage;
        errorType.value = "error";
        errors.value = [];
      }
    };

    return {
      first_name,
      last_name,
      email,
      closeMessage,
      loading,
      errorType,
      password,
      message,
      confirm_password,
      submit,
      errors,
    };
  },
};
</script>

<style>
.formc {
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-title {
  font-size: 1.2rem;
  color: #008dbc;
  padding: 2rem 0;
}

.loading {
  opacity: 0.5;
}

.input-field > * {
  display: block;
  width: 100%;
}
.input-field {
  padding: 7px;
}
label {
  text-align: left;
  padding-bottom: 4px;
  font-size: 0.9rem;
}
.name {
  display: flex;
  justify-content: space-between;
}
.name > * {
  width: 45%;
}
.btn-container {
  max-width: 120px;
  margin: 2rem auto;
}
input[type="submit"] {
  background: #008dbc;
  color: white;
  width: 100px;
  padding: 7px;
  border-radius: 8px;
}

input[type="submit"]:active {
  border: 0;
}

input,
select {
  padding: 5px;
  border-radius: 2px;
  border: 1px solid #008dbc;
}
.account-verify {
  font-size: 0.8rem;
  padding-bottom: 2rem;
}

@media screen and (max-width: 320px) {
  .fields {
    width: 280px;
    margin-left: -0.8rem;
    display: flex;
    flex-direction: column;
  }
  .formc {
    margin: 0.5rem 1rem;
  }
  .form-title {
    font-size: 1rem;
    color: #008dbc;
    padding: 1.5rem 0;
  }
  .btn-container {
    margin: 1rem auto;
  }
}

@media screen and (min-width: 360px) {
  .fields {
    width: 320px;
    margin-left: -0.8rem;
    display: flex;
    flex-direction: column;
  }
  .formc {
    margin: 0.8rem 1rem;
  }
  .form-title {
    font-size: 1rem;
  }
}

@media screen and (min-width: 414px) {
  .fields {
    width: 350px;
    margin-left: -0.8rem;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (min-height: 730px) {
  .fields {
    width: 320px;
    margin-left: -0.8rem;
    display: flex;
    flex-direction: column;
  }

  input,
  select {
    padding: 8px 5px;
    margin-bottom: 5px;
  }

  .formc {
    margin: 2rem 1rem;
  }
}

@media screen and (min-width: 450px) {
  .fields {
    width: 420px;
  }
}

@media screen and (min-width: 658px) {
  .fields {
    width: 500px;
  }
  .formc {
    margin: 1.4rem 1rem;
  }
  .input-field {
    padding: 15px auto;
  }
}
@media screen and (min-width: 1024px) {
  label {
    font-size: 0.9rem;
  }
}
</style>