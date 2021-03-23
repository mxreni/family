<template>
  <li>
    <router-link
      :to="{name:title}"
      class="sidebar-link"
    >
      <img
        :src="imgUrl(title)"
        :alt="''+title+'-icon'"
        class="sidebar-icon"
      />
      <p>{{title}}</p>
    </router-link>
  </li>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: ["title"],
  setup() {
    const imgUrl = (title) => {
      return require(`../../assets/icons/${title}.svg`);
    };
    return {
      imgUrl,
    };
  },
};
</script>

<style>
</style>