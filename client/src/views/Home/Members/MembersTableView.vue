<template>
  <div class="main-body-table">
    <table CELLSPACING="0" v-if="cards && cards.length > 0">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Gender</th>
          <th>DOB</th>
          <th>Relationship</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(card, index) in cards" :key="card.id">
          <td class="center-td">{{ index + 1 }}</td>
          <td class="table-name">
            <img
              :src="card.imagedata"
              :alt="card.firstname"
              class="table-profile-img"
            />
            {{ card.firstname }} {{ card.lastname }}
          </td>
          <td>{{ card.gender }}</td>
          <td>{{ card.dob }}</td>
          <td>{{ card.relationship ? card.relationship.name : "Unknown" }}</td>
          <td class="center-td">
            <img
              class="delete-icon"
              src="../../../assets/icons/delete.svg"
              alt="basic info"
              @click="deleteMember(card.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="no-data">No family members yet . Add some!</div>
  </div>
</template>

<script>
import { onMounted, getCurrentInstance, computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;
    const store = useStore();

    const deleteMember = (id) => {
      eventBus.emit("showModal", {
        title: "Delete ",
        message: "Do you want to delete this member ?",
        buttonText: "Confirm!",
        id: id,
        action: "member/deleteMemberDataById",
      });
    };

    const cards = computed(() => store.state.member.members);
    onMounted(async () => {
      await store.dispatch("member/getMembersData");
      console.log(store.state.member.members);
    });
    return {
      cards,
      deleteMember,
    };
  },
};
</script>

<style>
td,
th {
  border: 1px dotted #008dbc55;
  padding: 10px 20px;
  width: max-content;
  text-align: left;
  text-transform: capitalize;
}
td {
  padding: 7px 20px;
  font-size: 0.9rem;
}
table {
  display: table;
  width: 100%;
}
.center-td {
  text-align: center;
}
.no-data {
  height: 70vh;
  display: grid;
  place-content: center;
}
th {
  background: #ffec5c44;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
}

.delete-icon {
  width: 1.2rem;
  height: 1.2rem;
}

.table-name {
  font-weight: 500;
  color: #008dbc;
  vertical-align: middle;
  cursor: pointer;
  font-size: 0.9rem;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
}
.main-body-table {
  margin-top: 2rem;
}
.table-profile-img {
  width: 20px;
  border-radius: 2px;
  height: 20px;
}
</style>