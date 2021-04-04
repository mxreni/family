<template>
  <Cards
    :cards='cards'
    v-if="cards"
  />
</template>

<script>
import Cards from "@/components/App/Cards";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    Cards,
  },
  setup(props, { emit }) {
    const store = useStore();

    const cards = computed(() => store.state.member.members);
    onMounted(async () => {
      await store.dispatch("member/getMembersData");
    });
    return {
      cards,
    };
  },
};
</script>

<style>
</style>