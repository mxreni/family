<template>
  <div class="home-main">
    <div
      class="form-modal"
      @openForm="openFormModal"
    >
      <FormModal
        v-if="openFormModal"
        @open="displayForm"
      />
    </div>
    <div class="main-header">
      <div>
        <h4 class="main-header-title">Family Members</h4>
      </div>
      <div class="main-header-menus">
        <img
          src="../../assets/icons/calendar_view_month.svg"
          alt="calendar-icon"
        >
        <img
          src="../../assets/icons/view_list.svg"
          alt="view-list"
          srcset=""
        >
        <button class="spl-btn">OrderBy</button>
        <button @click="openForm">Add Member</button>
      </div>
    </div>
    <div class="main-body">
      <div
        v-for="card in cards"
        :key="card"
        class="card"
      >
        <div class="card-info">
          <img
            src="../../assets/icons/Members.svg"
            alt="user"
            class="card-image"
          />
          <div class="card-body">
            <p>First last</p>
            <p>Female</p>
            <p>unknown</p>
            <p>unknown</p>
          </div>
        </div>
        <div class="card-footer">
          <p>Phone: 0000000000</p>
          <p>Email: abc@gmail.com</p>
        </div>
        <div class="edit">
          <div class="edit-icon-contain"><img
              src="../../assets/icons/edit.svg"
              alt="view-list"
              class="edit-icon"
            /></div>
        </div>
      </div>
    </div>
    <div class="main-footer">
      <button class="spl-btn disabled">prev</button>
      <button class="spl-btn">next</button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import FormModal from "../../components/FormModal";
export default {
  components: {
    FormModal,
  },
  setup(props, { emit }) {
    const cards = ref([
      23,
      243,
      54,
      32,
      2323,
      434,
      223,
      2323,
      32,
      323,
      434,
      323,
    ]);
    const openFormModal = ref(false);
    const displayForm = () => {
      console.log("here");
      openFormModal.value = true;
    };
    const closeForm = () => {
      openFormModal.value = false;
    };
    const openForm = () => {
      console.log("clicked");
      emit("openForm");
    };
    return {
      cards,
      openForm,
      openFormModal,
      displayForm,
      closeForm,
    };
  },
};
</script>

<style>
.home-main {
  width: 90%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  margin: 2.7rem auto;
}
.form-modal {
  position: absolute;
  right: 0;
  width: 530px;
  background: #fff;
  display: none;
  z-index: 1;
  bottom: 0;
  top: 110px;
  min-height: 97vh;
  margin: -2.7rem 0;
  border: 1px solid #008bdc55;
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
  width: 340px;
  display: flex;
  justify-content: flex-end;
}
button {
  width: 120px;
  padding: 6px;
  cursor: pointer;
  border: 1px solid #008dbc;
  background: #fff;
  border-radius: 2px;
}
.main-header-menus > * {
  margin: 0 0.8rem;
}
.spl-btn {
  background: #008dbc;
  color: #fff;
  border: none;
}
.main-body {
  display: grid;
  margin: 2rem 0;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 2rem;
  grid-column-gap: 1.4rem;
}
.card-info {
  display: flex;
}
.card-body {
  text-align: left;
  padding-top: 0.5rem;
  line-height: 1.3rem;
}
.card-image {
  widows: 100px;
  height: 100px;
}
.card-footer {
  text-align: left;
  padding: 0 1rem;
  line-height: 1.3rem;
}

.main-footer {
  display: flex;
  width: 260px;
  justify-content: space-between;
  margin: 1rem 0;
  align-self: center;
}
.card {
  border: 1px solid #008dbc;
  font-size: 0.9rem;
  padding-bottom: 0.5rem;
  border-radius: 5px;
  position: relative;
}
.edit {
  position: absolute;
  bottom: -8px;
  right: -30px;
  border-bottom: 40px solid #008dbc22;
  transform: rotate(-225deg);
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
}
.disabled {
  opacity: 0.4;
}
.edit-icon-contain {
  position: absolute;
  top: 10px;
  right: -15px;
}
.edit-icon {
  transform: scale(0.8) rotate(45deg);
}

@media screen and (min-width: 358px) {
  .main-body {
    grid-template-columns: 1fr;
    grid-row-gap: 1.2rem;
    width: 100%;
    margin: 1.5rem auto;
  }
  /* .main-header-menus button {
    display: none;
  } */
  /* .main-header-menus {
    width: 60px;
  } */
}

@media screen and (min-width: 658px) {
  .main-body {
    grid-template-columns: repeat(2, 1fr);
    margin: 1.5rem 0;
    width: 100%;
  }
  .card {
    width: 100%;
  }
}

@media screen and (min-width: 900px) {
  .main-body {
    grid-template-columns: repeat(3, 1fr);
    margin: 1.5rem 0;
    width: 100%;
  }
  .card {
    width: 100%;
  }
}

@media screen and (min-width: 900px) {
  .main-body {
    grid-template-columns: repeat(3, 1fr);
    margin: 1.5rem 0;
    width: 100%;
  }
  .card {
    width: 100%;
    max-width: 300px;
  }
}
</style>