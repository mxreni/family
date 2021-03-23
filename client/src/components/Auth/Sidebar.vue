<template>
  <div class="left">
    <p class="heading">myFamily</p>
    <div class="paras">
      <p class="para">{{paras[currentPara]}}</p>
    </div>
    <img
      src="../../assets/FamLight.svg"
      class="logo_light"
      alt="myfamily logo"
    />
    <div class="circles">
      <span
        :class="{'circle':true, 'highlight':para === paras[currentPara]}"
        v-for="para in paras"
        :key="para.slice(0,10)"
      >
      </span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";

export default {
  setup() {
    const para1 =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga optio cum officiis neque magnam, explicabo illo maiores est, aspernatur incidunt consequatur.";
    const para2 =
      "Voluptatum corrupti ratione? Deserunt,voluptate. Odio, laboriosam eius.quibusdam magnam voluptate sint a porro id consectetur quia harum tota explicabo";
    const para3 =
      "Modi debitis iste soluta labore,doloremque beatae excepturi aperiam minima explicabo fugiat? Quas ab vel commodi animi facere quod maxime eaque sunt maxime explicabo";

    const currentPara = ref(0);
    const paras = ref([para1, para2, para3]);
    onMounted(() => {
      currentPara.value = 0;
      setInterval(function () {
        currentPara.value = (currentPara.value + 1) % paras.value.length;
      }, 2000);
    });
    return {
      currentPara,
      paras,
    };
  },
};
</script>

<style>
.left {
  display: none;
}

@media screen and (min-width: 736) {
  .left {
    display: block;
  }
  .circle {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: #008dbc;
  }
  .highlight {
    background: gray;
  }
  .heading {
    font-family: "Redressed", cursive;
  }
  .circles {
    display: flex;
  }
  .para {
    color: #0009;
  }
  .paras {
    display: block;
  }
}

@media screen and (min-width: 658px) {
  .left {
    display: block;
  }

  .heading,
  .logo_light {
    display: none;
  }
  .paras {
    position: relative;
    height: 100px;
    margin-top: 0.5rem;
    box-sizing: border-box;
  }
  .circles {
    display: flex;
    margin-top: 0.7rem;
    justify-content: center;
    align-items: center;
  }
  .circle {
    width: 0.7rem;
    height: 0.7rem;
    margin: 0 0.5rem;
    border-radius: 50%;
    background: gray;
  }
  .highlight {
    background: #008dbc;
  }

  .para {
    color: gray;
    position: relative;
    margin: 1rem auto;
    font-size: 0.86rem;
    max-width: 70%;
    line-height: 1.7rem;
  }
}

@media screen and (min-width: 1024px) {
  .paras {
    font-size: 1.3ch;
  }
  .para {
    color: white;
  }
  .circle {
    background: white;
  }
  .paras {
    height: 210px;
    margin-top: 0;
  }
  .highlight {
    background: #0004;
  }
  .heading,
  .logo_light {
    font-family: "Redressed", cursive;
    color: white;
    display: block;
  }
  .heading {
    font-size: 1.6rem;
    letter-spacing: 0.06em;
    font-weight: bold;
    margin-bottom: 1.4rem;
  }
  .logo_light {
    margin: 0 auto;
    width: 20ch;
    height: 20ch;
  }
  .left {
    width: 35%;
    background: #008dbc;
    display: grid;
    place-content: center;
    align-content: center;
  }
}
</style>