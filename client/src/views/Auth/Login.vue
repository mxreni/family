<template>
  <div class="formc login">
    <Error
      :type="errorType"
      :message="message"
      v-show="message"
      @close="closeMessage"
    />
    <h5 class="form-title">User login</h5>
    <form>
      <div class="fields">
        <div class="input-field">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            v-model="email"
            id="email"
            placeholder="Enter the email"
          />
        </div>
        <div class="input-field">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            v-model="password"
            id="password"
            placeholder="Enter password"
          />
          <a class="link">Forgot Password?</a>
        </div>
        <div class="input-field btn-container">
          <input
            type="submit"
            value="submit"
            :class="{ btn: true, loading: loading }"
            @click="submit"
          />
        </div>

        <div class="social">
          <a href="http://localhost:3000/auth/google">
            <img
              src="../../assets/google.svg"
              alt="google login"
              class="fa-google icon"
            />
          </a>
          <a href="http://localhost:3000/auth/facebook">
            <img
              src="../../assets/facebook.svg"
              alt="facebook login"
              class="fa-facebook icon"
            />
          </a>
          <a href="http://localhost:3000/auth/twitter">
            <img
              src="../../assets/twitter.svg"
              alt="twitter login"
              class="fa-twitter icon"
            />
          </a>
        </div>
        <p class="account-verify">
          Don't have an account?
          <router-link :to="{ name: 'Signup' }">Signup</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style>
.social {
  display: flex;
  width: 140px;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  margin: 0.7rem 0 2.5rem;
}
.icon {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}
.link {
  text-align: left;
  padding-top: 9px;
  color: #008dbc99;
  text-decoration: underline;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>


<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Error from "../../components/Error";
import { useStore } from "vuex";
export default {
  components: {
    Error,
  },
  setup() {
    const errors = ref([]);
    const loading = ref(false);
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const message = ref("");
    const errorType = ref("error");
    const store = useStore();

    const closeMessage = () => {
      message.value = false;
    };

    const submit = async (e) => {
      e.preventDefault();
      if (email.value === "" || email.value === undefined) {
        errors.value = [...errors.value, "email"];
      }
      if (password.value === "" || password.value === undefined) {
        errors.value = [...errors.value, "password"];
      }
      if (!errors.value.length) {
        loading.value = true;
        try {
          await store.dispatch("auth/loginWithUserData", {
            email: email.value,
            password: password.value,
          });
          await store.dispatch("auth/getCurrentUserData");
          if (store.state.auth.currentUser) {
            loading.value = false;
            router.go("/");
          } else {
            loading.value = false;
          }
        } catch (err) {
          loading.value = false;
          errorType.value = "error";
          message.value = "Something went wrong.Please try again later";
        }
      } else {
        loading.value = false;
        const errorMessage =
          errors.value.length >= 2
            ? `Please enter the following missing fields: ${errors.value.slice(
                0,
                errors.value.length - 1
              )} and ${errors.value[errors.value.length - 1]}`
            : `Please enter the ${errors.value[0]}`;
        errors.value = [];
        message.value = errorMessage;
      }
    };
    return {
      email,
      errors,
      password,
      message,
      closeMessage,
      errorType,
      submit,
      loading,
    };
  },
};
</script>
