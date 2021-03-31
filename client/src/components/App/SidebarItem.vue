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
.router-link-exact-active {
  background-color: #008dbc22;
}
.sidebar-link {
  padding: 0;
  display: flex;
  padding: 0.7rem 1.2rem;
  box-sizing: border-box;
  align-items: center;
  width: 240px;
  text-decoration: none;
}
.sidebar-icon {
  padding-right: 8px;
  transform: scale(0.8);
}
</style>