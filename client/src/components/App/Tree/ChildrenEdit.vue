<template>
  <div :class="{ 'child-item-outer': true, partner }">
    <div class="child-item" @click="showContainer">
      <img src="../../../assets/icons/grid-2.svg" alt="calendar-icon" />
      <div class="sample">
        <input type="text" name="name" v-model="name" :placeholder="user.id" />

        <select name="gender" v-model="gender" id="gender">
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
import { onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["user", "userid", "depth", "partner"],
  setup(props) {
    const store = useStore();
    const name = ref(props.user.name);
    const dob = ref("");
    const gender = ref("");
    const relationship = ref("");

    const remove = async () => {
      await store.dispatch("tree/removeMemberData", props.user);
    };

    onMounted(() => {
      console.log(props.user);
    });

    const submit = async () => {
      let parent = props.user.parent
        ? typeof props.user.parent === "string"
          ? props.user.parent
          : props.user.parent.id
        : null;
      const data = {
        name: name.value,
        dob: dob.value,
        id: props.user.id,
        type: props.user.type,
        gender: gender.value,
        ref: props.user.ref,
        parent: parent || null,
        depth: props.user.type === "parent" ? 1 : 0,
      };
      console.log(data);
      if (name.value !== "") {
        await store.dispatch("tree/addTreeData", data);
        // eventBus.emit("showModal", {
        //   title: "Success",
        //   message: "Data added successfully",
        //   buttonText: "close",
        // });
      }
    };
    return {
      name,
      submit,
      remove,
      dob,
      relationship,
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

.partner .sample > * {
  border: 1px solid #e28f83;
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
  background: #ffe268;
}
</style>