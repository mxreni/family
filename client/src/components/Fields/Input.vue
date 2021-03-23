<template>
  <div class="input-field">
    <label :for="value">{{title}}</label>
    <input
      :type="value"
      :name="value"
      :v-model="value"
      :id="value"
      :placeholder="'Enter the '+title"
    >
  </div>
</template>

<script>
export default {
  props: ["title", value],
};
</script>

<style>
</style>