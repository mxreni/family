<template>
  <!-- <Main v-if="userLogged" /> -->
  <Main v-if="userLogged" />
  <router-view name="Auth"></router-view>
</template>

<script>
// life cycle hook
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core";

// components
import Brand from "./components/Brand";
import Sidebar from "./components/Auth/Sidebar";
import Main from "./views/Home/Main";
import AuthLayout from "./Layout/AuthLayout";

import { mapState, mapActions } from "vuex";
import { getCurrentUser } from "./api";
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
    const userLogged = ref(false);
    const router = useRouter();
    const dummy = ref(true);

    onMounted(async () => {
      const result = await getCurrentUser();
      console.log(result);
      if (result.status === "success") {
        userLogged.value = true;
      } else {
        userLogged.value = false;
        router.replace({
          name: "Login",
        });
      }
    });

    return {
      userLogged,
      dummy,
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

@media screen and (min-width: 1024px) {
  body {
    overflow: auto;
  }
}
</style>
  