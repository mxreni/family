<template>
  <div class="gen-header">
    <h4 class="main-header-title">{{ title || "Family Tree" }}</h4>
    <div class="main-header-menus">
      <router-link
        :to="{ name: 'Tree.Add' }"
        class="members-icon"
        exact-active-class="icon-active"
        ><img src="../../../assets/icons/add_circle.svg" alt="calendar-icon"
      /></router-link>
      <router-link
        :to="{ name: 'Tree.View' }"
        class="members-icon"
        exact-active-class="icon-active"
        ><img src="../../../assets/icons/Tree.svg" alt="calendar-icon"
      /></router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style>
.gen-header {
  display: flex;
  justify-content: space-between;
  width: 110%;
}
</style>