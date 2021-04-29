<template>
  <div v-for="card in cards" :key="card.id" class="card">
    <Card :card="card" />
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Card from "../FamilyMembers/Card";
export default {
  props: ["cards"],
  components: {
    Card,
  },
};
</script>

<style>
</style>