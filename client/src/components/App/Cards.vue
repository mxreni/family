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
.card-info {
  display: flex;
  font-size: 1rem;
}
.card-body {
  text-align: left;
  padding: 0.5rem 0 0 0.5rem;
  text-transform: capitalize;
}
.card-title {
  color: #008dbc99;
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.4rem;
}

.card-image {
  width: 90px;
  height: 90px;
  border-radius: 10px;
  border: 1px solid #008dbc55;
  margin: 10px;
  aspect-ratio: 1/1;
}
.card-footer {
  text-align: left;
  padding: 0.5rem 1rem 0;
  line-height: 1.5rem;
}

.card {
  border: 1px solid #008dbc22;
  font-size: 1rem;
  padding-bottom: 0.5rem;
  border-radius: 5px;
  position: relative;
  line-height: 1.5rem;
}
.edit {
  position: absolute;
  bottom: -8px;
  right: -30px;
  border-bottom: 40px solid #ffec5c44;
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

/* @media screen and (min-width: 1024px) {
  .card {
    max-width: 300px;
  }
} */
</style>