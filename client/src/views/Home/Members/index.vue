<template>
  <div class="form-modal-backdrop">
    <div class="home-main" @toggleFormModal="toggleFormModal">
      <div class="members">
        <div class="main-header">
          <div>
            <h4 class="main-header-title">Family Members</h4>
          </div>
          <div class="main-header-menus">
            <router-link
              :to="{ name: 'Members.grid' }"
              class="members-icon"
              exact-active-class="icon-active"
              ><img
                src="../../../assets/icons/calendar_view_month.svg"
                alt="calendar-icon"
            /></router-link>
            <router-link
              :to="{ name: 'Members.table' }"
              class="members-icon"
              exact-active-class="icon-active"
              ><img src="../../../assets/icons/view_list.svg" alt="view-list"
            /></router-link>
            <button class="btnn spl-btn">
              <img
                src="../../../assets/icons/order_by_light.svg"
                alt="view-list"
                class="btn-icon"
              />OrderBy
            </button>
            <button @click="toggleFormModal" class="btnn btn-trns">
              <img
                src="../../../assets/icons/add_circle.svg"
                alt="view-list"
                class="btn-icon"
              />Add Member
            </button>
          </div>
        </div>
        <div class="members-view">
          <router-view></router-view>
        </div>
        <div
          class="main-footer"
          v-if="!toggleForm && $store.state.member.members.length > 0"
        >
          <button class="btnn btn-mv disabled">prev</button>
          <button class="btnn btn-mv">next</button>
        </div>
      </div>
    </div>
    <div class="form-modal" v-if="toggleForm">
      <FormModal @closeFormModal="closeFormModal" :id="ids" />
    </div>
  </div>
</template>

<script>
import FormModal from "@/components/FormModal";
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";

export default {
  components: {
    FormModal,
  },
  setup(props, { emit }) {
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;

    const ids = ref("");
    const toggleForm = ref(false);
    const toggleFormModal = (id) => {
      ids.value = id;
      toggleForm.value = true;
    };
    const closeFormModal = () => {
      toggleForm.value = false;
    };
    onMounted(() => {
      eventBus.on("toggleFormModal", (id) => {
        toggleFormModal(id);
      });
    });

    return {
      ids,
      closeFormModal,
      toggleForm,
      toggleFormModal,
    };
  },
};
</script>

<style>
.home-main {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 2.7rem auto;
  min-height: calc(100vh - 70px);
  /* border: 1px solid red; */
}
.form-modal-backdrop {
  position: relative;
  width: 100%;
  /* border: 1px solid red; */
}
.members-icon {
  padding: 5px;
  display: grid;
  background: none;
  place-content: center;
}
.icon-active {
  border: 1px solid #008dbc;
  background: #008dbc11;
  border-radius: 2px;
}
.form-modal {
  position: absolute;
  right: 0;
  width: 540px;
  overflow: auto;
  background: #fff;
  display: block;
  z-index: 1;
  height: 800px;
  overflow: hidden;
  bottom: -2.7rem;
  top: -2.7rem;
  border: 1px solid #008bdc;
}
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main-header-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #008dbc;
}

.main-header-menus {
  width: 450px;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
}
button {
  width: 130px;
  padding: 0px 10px;
  cursor: pointer;
  border: 1px solid #008dbc;
  background: #fff;
  border-radius: 2px;
}
.main-header-menus > * {
  margin: 0 0.6rem;
}

.btnn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 10px;
  background: #008dbc;
  color: #fff;
  border: none;
}
.btn-icon {
  transform: scale(0.8);
}
.btn-mv {
  margin: 0 10px;
  padding: 7px;
  justify-content: center;
}

.btn-trns {
  background: white;
  border: 1px solid #008dbc;
  color: #008dbc;
  margin-right: 0;
}

.spl-btn {
  padding: 0 15px;
}

.main-body {
  display: grid;
  margin: 2rem 0;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 2rem;
  grid-column-gap: 1.4rem;
}
.main-footer {
  display: flex;
  width: 260px;
  justify-content: space-between;
  margin: 2rem auto 1rem;
  align-self: center;
}
.disabled {
  opacity: 0.4;
}

@media screen and (min-width: 358px) {
  .main-body {
    grid-template-columns: 1fr;
    grid-row-gap: 1.2rem;
    width: 100%;
    margin: 1.5rem auto;
  }

  .main-header-menus button {
    display: none;
  }
}

@media screen and (min-width: 658px) {
  .main-body {
    grid-template-columns: repeat(2, 1fr);
    margin: 1.5rem 0;
    width: 100%;
  }
}

@media screen and (min-width: 1294px) {
  .main-body {
    grid-template-columns: repeat(3, 1fr);
    margin: 1.5rem 0;
    width: 100%;
  }
  .main-header-menus button {
    display: flex;
  }
  .members-view {
    min-height: 90vh;
  }
}
</style>