<template>
  <div class="input-field">
    <label :for="title">{{title}}</label>
    <input
      :type="type"
      :name="title"
      v-model="value"
      :id="title"
      @change.enter="test"
      :placeholder="'Enter the '+title"
    >
  </div>
</template>

<script>
export default {
  props: ["title", "value", "type"],
  setup() {
    const test = function (ev) {
      console.log(ev.target.value);
    };
    return {
      test,
    };
  },
};
</script>

<style>
</style>