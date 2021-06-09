<template>
  <div :class="{ 'scroll-container': true }" :id="'depth' + '-' + depth">
    <h6 class="scroll-container-title">Generation-{{ depth }}</h6>
    <div
      class="scroll-container-inner"
      :style="{ marginLeft: size + 'px' }"
      :ref="'depth' + '-' + depth"
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
    </div>
  </div>
  <Generation v-if="userCheck" :parent="user" :depth="depth + 1" />
</template>

<script>
import { computed, onMounted, onUpdated, ref, watch } from "@vue/runtime-core";
import ChildrenView from "../../../components/App/Tree/ChildrenView";
import { useStore } from "vuex";

export default {
  components: {
    ChildrenView,
  },
  props: ["depth", "parent"],
  methods: {
    checkRef: function() {
      console.log(this.$refs["depth-" + this.depth]);
    },
  },
  watch: {
    parent: function(newval, oldval) {
      if (newval.length > 0) {
        if (
          this.selectedVal &&
          this.depth >= 1 &&
          this.selectedVal[this.depth - 1] >= 0
        ) {
          this.sel = this.selectedVal[this.depth - 1];
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
        // console.log(props.parent);
      }
    });

    const selectedVal = computed(() => store.state.tree.parent);

    const showChildren = (args) => {
      selectedVal.value = null;
      store.dispatch("tree/resetParent");
      sel.value = props.parent.indexOf(args.id);
    };

    const moveLeft = () => {
      if (size.value < 0) {
        size.value += 260;
      }
    };
    const moveRight = () => {
      if (size.value > -(10 * 2 - 1) * 260) {
        size.value += -260;
        // console.log(size.value);
      }
    };
    onMounted(() => {
      if (selectedVal.value && selectedVal.value[props.depth - 1]) {
        sel.value = selectedVal.value[props.depth - 1];
      }
      // console.log(arrowCheck.value);
      const numnodes = document.getElementById("depth" + "-" + props.depth)
        .lastElementChild.children.length;
      arrowCheck.value = numnodes;
    });

    const root = computed(() => store.state.tree.tree);

    return {
      user,
      userCheck,
      moveLeft,
      moveRight,
      selectedVal,
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
  height: 195px;
  width: 100%;
  position: relative;
  border-radius: 10px;
  padding: 9px 20px;
  transform: scale(1.1);
  margin-left: 2rem;
  padding-right: 240px;
  box-sizing: border-box;
  margin-bottom: 2.5rem;
  overflow: hidden;
  overflow-x: auto;
  scrollbar-color: #008dbc77 #0006;
  scrollbar-width: thin;
  border: 1px solid #adb6bb88;
}

.scroll-container::-webkit-scrollbar {
  height: 8px;
  border-radius: 5px;
  background-color: #0005;
}
.scroll-container::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #008dbc55;
}

.scroll-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #008dbc;
}
</style>
