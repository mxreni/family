<template>
  <ul class="children-view-cl">
    <li class="tests" :id="parent.name">
      <span class="name-parent">
        <span
          class="name-parent-parent"
          @mouseover="showToolTip($event, parent.id)"
          ><img src="../../../assets/icons/manage_accounts.svg" />{{
            parent.name.slice(0, 10)
          }}
          <span
            class="divider-val"
            :style="
              parent.partner
                ? {
                    width: maxGap - 180 + 'px',
                    right: -maxGap + 180 + 'px',
                  }
                : {
                    width: maxGap - 150 + 'px',
                    right: -maxGap + 180 + 'px',
                    top: '30px',
                  }
            "
            v-if="parent.children.length > 0"
          ></span>
          <span class="parent-after" v-if="parent.partner"></span>
        </span>
        <span
          class="name-parent-partner"
          @mouseover="showToolTip($event, parent.partner.id)"
          @click="changeTree($event, parent.partner.id)"
          v-if="parent.partner"
          ><img src="../../../assets/icons/manage_accounts.svg" />{{
            parent.partner.name.slice(0, 10)
          }}
          <span class="partner-before"></span>
          <span class="partner-after"></span>
        </span>
      </span>
      <div
        class="testing"
        :style="{
          borderLeft:
            parent.children.length > 0 ? '0.2px solid #008bdc' : 'none',
        }"
      >
        <ul
          class="children-view-cl"
          v-for="item in parent.children"
          :key="item.id"
        >
          <GenerationTree :parent="item" :depth="depth + 1" />
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["parent", "depth"],
  setup(props) {
    const maxGap = ref(0);
    const store = useStore();
    const root = computed(() => store.state.tree.tree);

    const showToolTip = async (event, id) => {
      console.log(id);
    };

    const changeTree = async (event, id) => {
      console.log("clicked", id);
      console.log(root.value[id].parent);
      if (root.value[id].parent && root.value[id].parent.status === "active") {
        await store.dispatch("tree/addMemberParent", {
          id,
        });
      }
    };

    onMounted(() => {
      const elem = document.getElementById(props.parent.name);
      maxGap.value =
        elem.querySelector(".testing").offsetLeft -
        elem.querySelector("span").offsetLeft;
      console.log(maxGap.value);
    });
    return {
      maxGap,
      changeTree,
      showToolTip,
      root,
    };
  },
};
</script>

<style>
.children-view-cl {
  list-style-type: none;
  text-align: left;
  display: flex;
  position: relative;
  height: auto;
  flex-direction: column;
  text-align: left;
  padding: 10px 0px 10px 10px;
  box-sizing: border-box;
  border: none;
}
.tests {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 60px;
  text-align: left;
  position: relative;
}
li .name-parent {
  align-self: center;
  width: 150px;
  font-size: 80%;
  font-weight: 800;
  box-sizing: content-box;
  color: #008bdc;
  text-transform: capitalize;
  white-space: nowrap;
  padding: 10px 20px 10px 10px;
  position: relative;
}
.name-parent-parent {
  display: flex;
  align-items: center;
  border: 1px solid #008bdc;
  width: 100px;
  color: #008bdc;
  padding: 7px 20px 7px 10px;
  margin-bottom: 20px;
  margin-left: 10px;
}
.name-parent-partner {
  display: flex;
  align-items: center;
  position: relative;
  width: 100px;
  color: #e28f83;
  margin-left: 10px;
  background: #e28f8322;
  border: 1px solid #e28f83;
  padding: 10px 20px 10px 10px;
}
span img {
  margin-right: 5px;
  border-radius: 50%;
  border: 0.5px solid green;
}
.divider-val {
  position: absolute;
  width: 60px;
  right: -60px;
  top: 60px;
  border-bottom: 0.5px solid #008bdc;
  height: 1px;
}
.name-parent-parent::before {
  content: "";
  position: absolute;
  width: 40px;
  height: 1px;
  left: -22px;
  top: 35px;
  border-bottom: 1px solid gray;
}
.partner-after {
  position: absolute;
  content: "";
  width: 28px;
  height: 1px;
  right: -28px;
  top: 22px;
  border-bottom: 1px solid gray;
}
.name-parent > * {
  cursor: pointer;
}
.partner-before {
  position: absolute;
  content: "";
  height: 70px;
  width: 1px;
  right: -28px;
  top: -45px;
  border-left: 1px solid gray;
}
.parent-after {
  position: absolute;
  content: "";
  width: 28px;
  height: 1px;
  right: 0px;
  top: 30px;
  border-bottom: 1px solid gray;
}
</style>
