<template>
  <ChildrenEdit
    v-if="user && user.status !== 'Active'"
    :userid="user.id"
    :user="user"
  />
  <div
    v-else
    :class="{
      'child-item-outer': true,
      'special-view': true,
      active: active,
    }"
  >
    <div>
      <div class="child-item" @click="showChildren">
        <img
          src="../../../assets/icons/grid-2.svg"
          alt="user"
          class="card-image"
        />
        <div class="sample-view">
          <p class="card-title">{{ user.name || "raelyn shane" }}</p>
          <p>Gender:{{ user.gender }}</p>
          <p>DOB: {{ user.dob ? user.dob : "3444-23-23" }}</p>
          <p>{{ "Relationship: Friend" }}</p>
        </div>
      </div>
      <div class="button sample-icon">
        <button class="btn">Edit</button>
        <button class="btn" @click="showPartner">Partner</button>
        <button class="btn" @click="showChildren">Children</button>
        <button class="btn" v-if="user.parent === null" @click="showParent">
          Parent
        </button>
        <button class="btn" v-else @click="showSibling">Sibling</button>
      </div>
    </div>
  </div>
</template>

<script>
import ChildrenEdit from "./ChildrenEdit";

import { computed, getCurrentInstance, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["user", "userid", "active"],
  components: {
    ChildrenEdit,
  },
  setup(props, { emit }) {
    const store = useStore();
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;

    const showParent = async () => {
      await store.dispatch("tree/addMemberParent", {
        id: props.user.id,
      });
      eventBus.emit("showParent", {
        res: props.user.id,
      });
    };

    onMounted(() => {
      console.log(props.user.partner);
    });

    const showSibling = async () => {
      await store.dispatch("tree/addMemberSibling", { id: props.userid });
    };

    const showPartner = async () => {
      console.log("partner here");
      await store.dispatch("tree/addMemberPartner", { id: props.userid });
    };

    const showChildren = async () => {
      if (props.user.children.length > 0) {
        emit("showChildren", { id: props.userid });
      } else {
        await store.dispatch("tree/addMemberChild", { id: props.user.id });
        emit("showChildren", {
          id: props.user.id,
        });
      }
    };

    return {
      showParent,
      showSibling,
      showChildren,
      showPartner,
    };
  },
};
</script>

<style>
.sample-view {
  text-align: left;
  margin-left: -5px;
}

.divider {
  width: 10px;
  height: 1px;
  border-bottom: 1px solid red;
}

.child-item-outer {
  border: 1px solid #008bdc;
  width: 100%;
  border-radius: 4px;
  display: flex;
  max-width: 270px;
  flex-direction: column;
  margin: 10px 5px;
  padding: 5px 10px;
  height: 130px;
}

.partner {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid red;
}

.active {
  background: #e0ffff78;
}

.sample-view p {
  font-size: 0.8rem;
  white-space: nowrap;
  margin: 0.4rem;
}

.special-view button {
  margin-bottom: 4px;
}

.partner button {
  background: rgba(255, 0, 0, 1);
  color: #fff;
  border: 1px solid red;
}
</style>