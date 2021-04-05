<template>
  <div
    v-for="card in cards"
    :key="card.id"
    class="card"
  >
    <Card :card="card" />
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Card from "../App/Card";
export default {
  props: ["cards"],
  components: {
    Card,
  },
  setup(props, { emit }) {
    onMounted(() => {
      console.log(props.cards);
    });
  },
};
</script>

<style>
</style>