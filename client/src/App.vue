<template>
  <!-- <Main v-if="userLogged" /> -->
  <Main v-if="$store.state.auth.loggedin" />
  <router-view name="Auth"></router-view>
</template>

<script>
// life cycle hook
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
// components
import Brand from "./components/Brand";
import Sidebar from "./components/Auth/Sidebar";
import Main from "./views/Home/Main";
import AuthLayout from "./Layout/AuthLayout";

import { mapState, mapActions } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "App",
  components: {
    Brand,
    Sidebar,
    AuthLayout,
    Main,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const userLogged = computed(() => store.state.auth.loggedin);

    onMounted(async () => {
      console.log(userLogged)
      await store.dispatch("auth/getCurrentUserData");
      console.log(userLogged.value)
      if (!store.state.auth.loggedin) {
        router.replace({
          name: "Login",
        });
      }
    });

    return {
      userLogged,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Redressed&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Courier New", Courier, monospace;
  color: #0009;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
option {
  height: 1.2rem;
}
</style>
  