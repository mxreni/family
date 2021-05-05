<template>
  <ChildrenEdit
    v-if="user && user.status !== 'Active'"
    :userid="user.id"
    :user="user"
    :depth="depth"
  />
  <div
    v-else
    :class="{
      'child-item-outer': true,
      'special-view': true,
      active,
      partner: isPartner,
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
        <button v-if="!isPartner" class="btn" @click="showPartner">
          Partner
        </button>
        <button class="btn" v-if="!isPartner" @click="showChildren">
          Children
        </button>
        <button class="btn" v-if="!user.parent" @click="showParent">
          Parent
        </button>
        <button class="btn" v-else @click="showSibling">Sibling</button>
      </div>
    </div>
  </div>

  <!-- <div v-if="user.partner" class="divider"></div> -->
  <ChildrenView
    v-if="user.partner"
    :user="user.partner"
    :userid="user.partner.id"
    :depth="depth"
    :isPartner="true"
  />
  <!-- </div> -->
</template>

<script>
import ChildrenEdit from "./ChildrenEdit";

import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["user", "userid", "active", "depth", "isPartner"],
  components: {
    ChildrenEdit,
  },
  emits: ["showChildren"],
  setup(props, { emit }) {
    const store = useStore();

    const showParent = async () => {
      store.dispatch("tree/removeCurrentTree");
      let depth = props.depth;
      let selected = props.user.id;
      await store.dispatch("tree/addMemberParent", {
        id: props.user.id,
      });
    };
    const checkParent = computed(() =>
      store.getters["tree/checkParent"](props.user.id)
    );

    const showSibling = async () => {
      store.dispatch("tree/removeCurrentTree");

      await store.dispatch("tree/addMemberSibling", { id: props.userid });
    };

    const showPartner = async () => {
      store.dispatch("tree/removeCurrentTree");
      await store.dispatch("tree/addMemberPartner", { id: props.userid });
    };

    const showChildren = async () => {
      store.dispatch("tree/removeCurrentTree");
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
      checkParent,
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

.partner-container {
  position: relative;
}

.divider {
  position: absolute;
  width: 34px;
  left: -17px;
  z-index: 0;
  top: 60px;
  height: 4px;
  border-radius: 4px;
  background: linear-gradient(to bottom right, #f005, #008bdc55);
  /* border-bottom: 3px solid #008bdc55; */
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

.heart {
  width: 36px;
  z-index: 1;
  height: 36px;
  margin-top: -15px;
}

.partner button {
  background: rgba(255, 0, 0, 1);
  color: #fff;
  border: 1px solid red;
}
</style>