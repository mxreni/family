<template>
  <div class="scroll-container">
    <h6 class="scroll-container-title">Generation-{{ depth }}</h6>
    <div
      class="scroll-container-inner"
      :style="{ marginLeft: size + 'px' }"
      ref="container"
    >
      <ChildrenView
        @showChildren="showChildren"
        v-for="(item, index) in Array.isArray(parent) ? parent : [parent]"
        :key="index"
        :user="root[item]"
        :userid="root[item].id"
        :active="sel === index && root[item].children.length"
      />
      <div
        class="arrow left-arrow"
        :style="{ left: -size + 'px' }"
        @click="moveLeft"
        v-if="parent.length > 3"
      >
        <img
          src="../../../assets/icons/arrow_right.svg"
          alt=""
          class="arrow-icon left-arrow-icon"
        />
      </div>
      <div
        class="arrow right-arrow"
        @click="moveRight"
        v-if="parent.length > 3"
      >
        <img
          src="../../../assets/icons/arrow_right.svg"
          alt=""
          class="arrow-icon"
        />
      </div>
    </div>
  </div>
  <Generation v-if="userCheck" :parent="user" :depth="depth + 1" />
</template>


<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import ChildrenView from "../../../components/App/Tree/ChildrenView";
import { useStore } from "vuex";
export default {
  components: {
    ChildrenView,
  },
  props: ["depth", "parent", "selected"],
  watch: {
    parent: function (newval, oldval) {
      console.log(oldval, newval);
      if (newval.length > 0) {
        this.sel = 0;
        this.size = 0;
      }
    },
  },
  setup(props) {
    const store = useStore();
    const sel = ref(0);
    const size = ref(0);

    const user = computed(() =>
      Array.isArray(props.parent)
        ? root.value[props.parent[sel.value]].children
        : root.value[props.parent].children
    );

    const userCheck = computed(() =>
      Array.isArray(props.parent)
        ? root.value[props.parent[sel.value]].children.length > 0
        : root.value[props.parent].children.length > 0
    );

    const showChildren = (args) => {
      // in that generation the selected value is 2
      // in the next generation the selevetd value is not changed it remains the same as the previous selected in that generation
      sel.value = props.parent.indexOf(args.id);
      // console.log(currentGen.value);

      // console.log(sel.value);
      console.log("depth" + props.depth);
    };

    const changeSomething = (ev) => {
      console.log(ev.target.innerText);
      sel.value = Number(ev.target.innerText);
      sel.value = props.parent.indexOf(sel.value);
      // console.log(user.value);
      console.log("depth" + props.depth);
      // console.log(userCheck.value);
    };

    const moveLeft = () => {
      if (size.value < 0) {
        size.value += 250;
      }
    };
    const moveRight = () => {
      if (size.value > -(props.parent.length - 2) * 250) {
        size.value += -250;
      }
    };

    onMounted(() => {
      console.log(props.parent + "---->" + props.depth);
    });

    const root = computed(() => store.state.tree.tree);

    return {
      user,
      userCheck,
      moveLeft,
      moveRight,
      showChildren,
      size,
      changeSomething,
      root,
      sel,
    };
  },
};
</script>



<style>
.arrow {
  position: absolute;
  z-index: 2;
}

.scroll-container-title {
  text-align: left;
  font-size: 0.8rem;
}

.right-arrow {
  right: -10px;
}
.scroll-container-inner {
  display: flex;
  position: relative;
  align-items: center;
}
.arrow-icon {
  background: white;
  border: 1px solid #008dbc;
  background: #008dbc;
  cursor: pointer;
  border-radius: 50%;
  width: 16px;
  height: 16px;
}
.left-arrow-icon {
  transform: rotate(180deg);
}
.scroll-container {
  height: 180px;
  width: 100%;
  position: relative;
  border-radius: 10px;
  padding: 5px 10px;
  transform: scale(1.1);
  margin-left: 2rem;
  margin-bottom: 2rem;
  overflow: hidden;
  border: 1px solid #adb6bb88;
}
</style>