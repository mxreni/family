<template>
  <div class="home-main">
    <div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import FormModal from "@/components/FormModal";

export default {
  components: {
    FormModal,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style>
.btn-tree {
  text-transform: uppercase;
  white-space: nowrap;
}
.tree-menus {
  margin-left: 20px;
}
</style>
