<template>
  <div class="scroll-container">
    <h6 class="scroll-container-title">Generation-{{ depth }}</h6>
    <div
      class="scroll-container-inner"
      :style="{ marginLeft: size + 'px' }"
      ref="container"
    >
      <ChildrenView
        v-for="(item, index) in Array.isArray(parent) ? parent : [parent]"
        @showChildren="showChildren"
        :key="index"
        :user="root[item]"
        :userid="root[item].id"
        :active="sel === index"
        :depth="depth"
      />
      <div
        class="arrow left-arrow"
        :style="{ left: -size + 'px' }"
        @click="moveLeft"
        v-if="arrowCheck >= 0"
      >
        <img
          src="../../../assets/icons/arrow_right.svg"
          alt="arrow-left"
          class="arrow-icon left-arrow-icon"
        />
      </div>
      <div class="arrow right-arrow" @click="moveRight" v-if="arrowCheck >= 0">
        <img
          src="../../../assets/icons/arrow_right.svg"
          alt="arrow-right"
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
      if (newval.length > 0) {
        if (this.maya && this.depth >= 1 && this.maya[this.depth - 1] >= 0) {
          this.sel = this.maya[this.depth - 1];
          // this.size = -this.sel * 250;
          this.size = 0;
        } else {
          this.sel = 0;
          this.size = 0;
        }
      }
    },
  },
  setup(props) {
    const store = useStore();
    const sel = ref(0);
    const arrowCheck = ref(0);

    const size = ref(0);

    arrowCheck.value = Array.isArray(props.parent) ? props.parent.length : 0;

    const user = computed(() =>
      Array.isArray(props.parent)
        ? root.value[props.parent[sel.value]].children
        : root.value[props.parent].children
    );

    const userCheck = computed(() => {
      if (props.parent) {
        let res = Array.isArray(props.parent)
          ? root.value[props.parent[sel.value]].children.length > 0
          : root.value[props.parent].children.length > 0;
        if (!res) {
          res = false;
        }
        return res;
      } else {
        console.log(props.parent);
      }
    });

    const maya = computed(() => store.state.tree.parent);

    const showChildren = (args) => {
      maya.value = null;
      store.dispatch("tree/resetParent");
      sel.value = props.parent.indexOf(args.id);
    };

    const moveLeft = () => {
      if (size.value < 0) {
        size.value += 250;
      }
    };
    const moveRight = () => {
      if (size.value > -(10 * 2 - 1) * 260) {
        size.value += -250;
        console.log(size.value);
      }
    };
    onMounted(() => {
      console.log(arrowCheck.value);
      if (maya.value && maya.value[props.depth - 1]) {
        sel.value = maya.value[props.depth - 1];
      }
    });

    const root = computed(() => store.state.tree.tree);

    return {
      user,
      userCheck,
      moveLeft,
      moveRight,
      maya,
      showChildren,
      arrowCheck,
      size,
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
  margin-bottom: 2.5rem;
  overflow: hidden;
  border: 1px solid #adb6bb88;
}
</style>