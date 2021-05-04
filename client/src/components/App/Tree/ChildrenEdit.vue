<template>
  <div :class="{ 'child-item-outer': true }">
    <div class="child-item" @click="showContainer">
      <img src="../../../assets/icons/grid-2.svg" alt="calendar-icon" />
      <div class="sample">
        <input type="text" name="name" v-model="name" :placeholder="user.id" />

        <select name="gender" v-model="gender" id="Gender">
          <option value="" selected>select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="date" name="date" v-model="dob" />
      </div>
    </div>
    <div class="button sample-icon">
      <button class="btn" @click="submit">Add</button>
      <button class="btn" @click="remove">Remove</button>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["user", "userid", "depth"],
  setup(props) {
    const store = useStore();
    const name = ref(props.user.name);
    const dob = ref("");
    const gender = ref("");
    const appInstance = getCurrentInstance();
    const eventBus =
      appInstance.appContext.app.config.globalProperties.eventBus;

    const remove = async () => {
      await store.dispatch("tree/removeMemberData", props.user);
    };

    onMounted(() => {
      console.log(props.user);
    });

    const submit = async () => {
      const data = {
        name: name.value,
        dob: dob.value,
        id: props.user.id,
        type: props.user.type,
        gender: "female",
        parentId: props.user.parentId,
        parent: props.user.parent ? props.user.parent.id : null,
        depth: props.user.type === "parent" ? 1 : 0,
      };
      console.log(data);
      if (name.value !== "") {
        await store.dispatch("tree/addTreeData", data);
        eventBus.emit("showModal", {
          title: "Success",
          message: "Data added successfully",
          buttonText: "close",
        });
      }
    };
    return {
      name,
      submit,
      remove,
      dob,
      gender,
    };
  },
};
</script>

<style>
.child-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.child-item img {
  width: 80px;
  border-radius: 10px;
  height: 80px;
}

.sample > * {
  box-sizing: border-box;
  margin: 5px;
  width: calc(250px - 75px);
  height: 1.4rem;
  font-size: 0.8rem;
  padding: 5px;
}
input[type="date"] {
  padding: 0 5px;
}

.sample {
  margin-left: 10px;
}

.active {
  height: 185px;
  z-index: 2;
  margin-top: 60px;
  background: #fff;
  border: 3px solid #008bdc;
  border-bottom: 2px solid #fff;
}

.sample-icon {
  margin: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.sample-icon button {
  font-size: 0.6rem;
  width: max-content;
  padding: 4px 10px;
  background: #008bdc;
  color: #fff;
  border-radius: 5px;
}

.sample-icon img {
  border-radius: 50%;
  width: 15px;
  margin-top: 10px;
  height: 15px;
}
.partner {
  background: lightcoral;
}
</style>