<template>
  <div class="nav-bar">
    <div class="nav-brand">
      <img
        src="../../../assets/icons/menu.svg"
        alt="user"
        @click="openSidebar"
        class="nav-brand nav-brand-mobile nav-icon"
      />
      <img
        src="../../../assets/FamLight.svg"
        alt="logo"
        class="nav-brand-logo"
      />
      <h3 class="nav-brand-title">MyFamily</h3>
    </div>
    <div class="nav-brand nav-brand-right">
      <p class="username">Hi, {{ first_name }}</p>
      <img
        src="../../../assets/icons/person-white.svg"
        alt="user"
        class="person nav-icon"
      />
      <img
        src="../../../assets/icons/notifications.svg"
        alt="user"
        class="notification nav-icon"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "Header",

  setup(props, { emit }) {
    const first_name = ref("");
    const store = useStore();

    onMounted(async () => {
      const data = store.state.auth.currentUser;
      console.log(data);
      if (data.status === "success") {
        first_name.value = data.firstname;
      }
    });
    const openSidebar = () => {
      emit("openSideMenu");
    };
    return {
      first_name,
      openSidebar,
    };
  },
};
</script>

<style>
.nav-bar {
  height: 70px;
  background: #008dbc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand-logo {
  width: 3rem;
  height: 3rem;
}
.nav-brand-title {
  color: #fff;
  margin-left: 1rem;
  margin-top: 0.7rem;
  font-size: 1.1rem;
  font-weight: 100;
}
.nav-brand {
  display: flex;
  align-items: center;
}

.nav-brand-mobile {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.username {
  color: #fff;
  margin: 0 10px;
  margin-top: 0.9rem;
}
.nav-icon {
  margin-top: 0.7rem;
  cursor: pointer;
}
.notification {
  margin-left: 10px;
}

@media screen and (min-width: 358px) {
  .person,
  .notification,
  .username {
    display: none;
  }
  .nav-bar {
    padding: 0 1rem;
  }
  .nav-icon {
    padding-right: 5px;
  }
}

@media screen and (min-width: 658px) {
  .person,
  .notification {
    display: block;
  }
  .nav-brand-right > * {
    padding: 0 10px;
  }
  .nav-brand-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

@media screen and (min-width: 1024px) {
  .username {
    display: block;
  }
  .nav-bar {
    max-width: 1400px;
    padding: 0 4rem;
    margin-left: auto;
    margin-right: auto;
  }
  .nav-brand-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-brand-right > * {
    padding: 0 5px;
  }
  .nav-brand-mobile {
    display: none;
  }
}
</style>