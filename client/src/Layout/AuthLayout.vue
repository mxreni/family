<template>
  <div class="main">
    <Brand />
    <div class="section">
      <Sidebar />
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { getCurrentUser } from "../api";
import Brand from "../components/Brand";
import Sidebar from "../components/Auth/Sidebar";

export default {
  components: {
    Brand,
    Sidebar,
  },
  setup() {
    const userLogged = ref(false);
    onBeforeMount(async () => {
      console.log("fd");
      const result = await getCurrentUser();
      if (result.data && result.data.status === "success") {
        userLogged.value = true;
      } else {
        userLogged.value = false;
      }
    });
    return {
      userLogged,
    };
  },
};
</script>

<style>
.main {
  height: 100vh;
}

@media screen and (min-width: 736) {
  .logo {
    width: 6.5rem;
    height: 6.5rem;
    margin: 1.5rem 0 0.1rem;
  }
}

@media screen and (min-width: 658px) {
  .logo {
    margin: -1rem 0 0.2rem;
    width: 13rem;
    height: 13rem;
  }
  .main {
    max-width: 850px;
    margin: auto;
  }
}

@media screen and (min-width: 1024px) {
  .main {
    width: 920px;
    margin: auto;
    display: grid;
    padding: 0;
    align-items: center;
    max-width: 1024px;
  }

  .section {
    border: 1px solid #0007;
    height: 80vh;
    display: flex;
  }
  .right {
    width: 65%;
    display: grid;
    place-content: center;
  }
  .logo {
    margin: 1rem 0 0.2rem;
    width: 13rem;
    height: 13rem;
  }
}

@media screen and (max-height: 678px) {
  .main {
    height: 628px;
  }

  .section {
    height: 628px;
    padding-bottom: 3rem;
  }
}
</style>