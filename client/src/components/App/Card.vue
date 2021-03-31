<template>
  <div
    v-for="card in cards"
    :key="card"
    class="card"
  >
    <div class="card-info">
      <img
        src="../../assets/icons/Members.svg"
        alt="user"
        class="card-image"
      />
      <div class="card-body">
        <p>First last</p>
        <p>Female</p>
        <p>unknown</p>
        <p>unknown</p>
      </div>
    </div>
    <div class="card-footer">
      <p>Phone: 0000000000</p>
      <p>Email: abc@gmail.com</p>
    </div>
    <div class="edit">
      <div class="edit-icon-contain"><img
          src="../../assets/icons/edit.svg"
          alt="view-list"
          class="edit-icon"
        /></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cards"],
};
</script>

<style>
.card-info {
  display: flex;
}
.card-body {
  text-align: left;
  padding-top: 0.5rem;
  line-height: 1.3rem;
}
.card-image {
  widows: 100px;
  height: 100px;
}
.card-footer {
  text-align: left;
  padding: 0 1rem;
  line-height: 1.3rem;
}

.card {
  border: 1px solid #008dbc;
  font-size: 0.9rem;
  padding-bottom: 0.5rem;
  border-radius: 5px;
  position: relative;
}
.edit {
  position: absolute;
  bottom: -8px;
  right: -30px;
  border-bottom: 40px solid #ffec5c;
  transform: rotate(-225deg);
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
}

.edit-icon-contain {
  position: absolute;
  top: 10px;
  right: -15px;
}
.edit-icon {
  transform: scale(0.8) rotate(45deg);
}

@media screen and (min-width: 658px) {
  .card {
    width: 100%;
  }
}

@media screen and (min-width: 900px) {
  .card {
    max-width: 300px;
  }
}
</style>