<template>
  <div
    class="container"
    v-if="userLogged && first_name"
  >
    <p> Logged in successfully <router-link
        @click="logOut"
        class="user-name log-out"
        :to="{name:'Login'}"
      >logout</router-link>
    </p>
    <p>Hi <span class="user-name">{{first_name}}</span></p>
    <p><span class="user-name">User ID: {{user_name}}</span></p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { getCurrentUser, logout } from "../../api";
export default {
  setup() {
    const first_name = ref("");
    const last_name = ref("");
    const user_name = ref("");
    const userLogged = ref(false);
    const router = useRouter();

    const logOut = async () => {
      const res = await logout();
      console.log(res);
      if (res.data.status === "success") {
        userLogged.value = false;
      }
    };

    onMounted(async () => {
      const data = await getCurrentUser();
      console.log("data");
      if (data.status === "success") {
        userLogged.value = true;
        first_name.value = data.firstname;
        last_name.value = data.lastname;
        user_name.value = data.username;
      }
    });

    return {
      logOut,
      user_name,
      userLogged,
      first_name,
      last_name,
    };
  },
};
</script>

<style>
.container {
  line-height: 2rem;
  display: grid;
  height: 85vh;
  place-content: center;
}
.user-name {
  text-transform: capitalize;
  color: #008dbc;
}
.log-out {
  color: crimson;
  cursor: pointer;
}
</style>