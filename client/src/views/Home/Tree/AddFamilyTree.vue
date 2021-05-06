<template>
  <div class="gen-style">
    <Generation v-if="parent" :parent="parent" :depth="0" />
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore, mapGetters } from "vuex";

import Generation from "../../../components/App/Tree/Generation";
export default {
  components: {
    Generation,
  },

  setup() {
    const store = useStore();
    const parent = computed(() => store.getters["tree/parent"]);

    onMounted(async () => {
      await store.dispatch("tree/getTreeData");
      console.log(store.state.tree.tree);
      console.log(parent.value);
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
.fam-1 {
  display: flex;
  flex-direction: column;
}
.li-fam {
  list-style-type: none;
  padding-right: 10px;
  padding: 10px;
  font-size: 1.2rem;
}
.gen-style {
  margin-top: 2rem;
}
</style>