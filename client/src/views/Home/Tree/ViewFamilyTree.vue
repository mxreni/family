<template>
  <TreeNavBar />
  <div class="tree-container" v-if="loaded">
    <GenerationTree v-if="parent && heightArr" :parent="heightArr" :depth="0" />
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
    const loaded = ref(false);
    const root = computed(() => store.state.tree.tree);
    const parent = computed(() => store.getters["tree/parent"]);
    const heightArr = computed(() =>
      store.getters["tree/heightTree"](parent.value)
    );

    onMounted(async () => {
      await store.dispatch("tree/getTreeData");
      console.log(heightArr.value);
      loaded.value = true;
    });

    return {
      parent,
      root,
      heightArr,
      loaded,
    };
  },
};
</script>

<style>
@media screen and (min-width: 1024px) {
  .tree-container {
    transform: scale(1);
    margin-left: 10px;
    margin-top: 40px;
    max-width: 1100px;
  }
}
</style>
