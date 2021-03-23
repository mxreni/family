<template>
  <div class="brand">
    <img
      src="../assets/myfamily.svg"
      class="logo"
      alt="myfamily logo"
    />
    <h4 class="brandname">myfamily</h4>
  </div>
</template>

<style>
.brand {
  margin-top: 2rem;
}
.logo {
  width: 5rem;
  height: 5rem;
}

@media screen and (min-width: 736) {
  .brand {
    margin-top: 0;
  }
  .logo {
    width: 6.5rem;
    height: 6.5rem;
  }
  .brandname {
    font-family: "Redressed", cursive;
    font-size: 1.2rem;
    padding-bottom: 1rem;
  }
}

@media screen and (min-width: 1024px) {
  .brand {
    display: none;
  }
}
</style>


<script>
</script>


