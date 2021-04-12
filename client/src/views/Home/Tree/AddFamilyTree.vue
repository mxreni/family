<template>
  <h3 class="tree-title">Add family Tree</h3>
  <AddMemberItem 
    v-if="parent"
    :id="parent.id"
    :user="parent"
    :depth="parent.depth"
  />
</template>

<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
} from "@vue/runtime-core";
import AddMemberItem from "../../../components/App/AddMemberItem";
import { useStore } from "vuex";
export default {
  components: {
    AddMemberItem,
  },
  setup() {
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;
    const store = useStore();
    const root = computed(() => {
      return store.state.tree.tree;
    });
    const parent = computed(()=>store.getters["tree/parent"])
   
    onMounted(async () => {
      await store.dispatch("tree/getTreeData", {
        id: 0,
        name: store.state.auth.currentUser.firstname,
        depth: 0,
        parent: null,
        children: [],
        type:'children'
      });
      eventBus.on("addMemberItem", async (payload) => {
        if (payload.type === "children") {
          await store.dispatch("tree/addMemberChild", payload);
        } else {
          await store.dispatch("tree/addMemberParent", payload);
        }
      }); 
    });
    return {
      root,
      parent,
    };
  },
};
</script>

<style>
.tree-title {
  margin: 2rem 0;
  text-align: left;
  font-size: 1.2rem;
}
.tree-save-btn {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>