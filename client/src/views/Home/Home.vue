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
    <p>Hi <span class="user-name">{{first_name}} {{last_name}}</span></p>
    <p><span class="user-name">User ID: {{user_name}}</span></p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const userLogged = ref(false);
    const store = useStore();

    const logOut = async () => {
      await store.dispatch("auth/userLogout");
      if (store.state.auth.loggedin === false) {
        userLogged.value = false;
      }
    };

    const first_name = computed(() => store.state.auth.currentUser.firstname);
    const last_name = computed(() => store.state.auth.currentUser.lastname);
    const user_name = computed(() => store.state.auth.currentUser.username);
    onMounted(async () => {
      if (store.state.auth.loggedin) {
        userLogged.value = true;
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
  margin-top: -3rem;
  line-height: 2rem;
  display: grid;
  height: 100vh;
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