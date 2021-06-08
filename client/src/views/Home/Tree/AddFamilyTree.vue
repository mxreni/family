<template>
  <TreeNavBar />
  <div class="gen-style">
    <Generation v-if="parent" :parent="parent" :depth="0" />
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore, mapGetters } from "vuex";
import TreeNavBar from "../../../components/App/Tree/TreeNavBar";

import Generation from "../../../components/App/Tree/Generation";
export default {
  components: {
    Generation,
    TreeNavBar,
  },

  setup() {
    const store = useStore();
    const parent = computed(() => store.getters["tree/parent"]);

    onMounted(async () => {
      await store.dispatch("tree/getTreeData");
      // console.log(store.state.tree.tree);
      // console.log(parent.value);
    });
    return {
      parent,
    };
  },
};
</script>

<style>
.tree-title {
  margin: 1.5rem 0;
  text-align: left;
  font-size: 1.2rem;
}
.gen-style {
  margin-top: 2rem;
  max-width: 1100px;
}
</style>
