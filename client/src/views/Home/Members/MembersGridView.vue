e<template>
  <div class="main-body" v-if="cards && cards.length > 0">
    <Cards :cards="cards" />
  </div>
  <div v-else class="no-data">No family members yet . Add some!</div>
</template>

<script>
import Cards from "../../../components/App/FamilyMembers/Cards";
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