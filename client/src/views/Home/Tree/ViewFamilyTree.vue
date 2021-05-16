<template>
  <TreeNavBar />
  <div class="tree-container">
    <GenerationTree v-if="parent" :parent="heightArr" :depth="0" />
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";

import TreeNavBar from "../../../components/App/Tree/TreeNavBar";
import GenerationTree from "../../../components/App/Tree/GenerationTree";
import { useStore } from "vuex";
export default {
  components: {
    TreeNavBar,
    GenerationTree,
  },
  setup() {
    const store = useStore();
    const root = computed(() => store.state.tree.tree);
    const parent = computed(() => store.getters["tree/parent"]);
    const heightArr = computed(() =>
      store.getters["tree/heightTree"](parent.value)
    );

    onMounted(async () => {
      await store.dispatch("tree/getTreeData");
    });
    return {
      parent,
      root,
      heightArr,
    };
  },
};
</script>

<style>
@media screen and (min-width: 500px) {
  .tree-container {
    transform: scale(0.6);
    margin-top: -250px;
    margin-left: -100px;
  }
}
@media screen and (min-width: 1024px) {
  .tree-container {
    transform: scale(1);
    margin-left: 50px;
    margin-top: 40px;
  }
}
</style>
