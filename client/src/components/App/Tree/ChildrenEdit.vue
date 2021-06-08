<template>
  <div :class="{ 'child-item-outer': true, partner }">
    <div class="child-item" @click="showContainer">
      <img
        :src="image ? image : require('../../../assets/icons/grid-2.svg')"
        alt="calendar-icon"
        @click="openFileUploader"
        class="card-image card-image-edit"
      />
      <input
        type="file"
        hidden
        id="file"
        accept="image/*"
        class="file"
        name="file"
        @change="updateImage"
      />
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
      <button class="btn" @click="submit">
        {{ user.status === "draft" ? "Update" : "Add" }}
      </button>
      <button class="btn" @click="remove">
        {{ user.status === "draft" ? "Cancel" : "Remove" }}
      </button>
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
    const dob = ref(props.user.DOB || "");
    const gender = ref(props.user.gender || "");
    const relationship = ref("");
    const image = ref(props.user.photourl || null);
    const file = ref(null);

    const remove = async () => {
      if (props.user.status === "draft") {
        await store.dispatch("tree/cancelTreeUpdate", { id: props.user.id });
      } else {
        await store.dispatch("tree/removeMemberData", props.user);
      }
    };

    const updateImage = (ev) => {
      image.value = URL.createObjectURL(ev.target.files[0]);
      file.value = ev.target.files[0];
    };

    onMounted(() => {
      console.log(props.user);
    });

    const openFileUploader = () => {
      const fileEL = document.getElementById("file");
      fileEL.click();
    };

    const submit = async () => {
      let parent = props.user.parent
        ? typeof props.user.parent === "string"
          ? props.user.parent
          : props.user.parent.id
        : null;
      const fData = new FormData();
      fData.append("name", name.value);
      fData.append("dob", dob.value);
      fData.append("id", props.user.id);
      fData.append("gender", gender.value);
      fData.append("file", file.value ? file.value : null);
      if (props.user.status !== "draft") {
        fData.append("type", props.user.type);
        fData.append("ref", props.user.ref);
        fData.append("parent", parent);
        fData.append("depth", props.user.type === "parent" ? 1 : 0);
        if (name.value !== "") {
          await store.dispatch("tree/addTreeData", fData);
        }
      } else {
        await store.dispatch("tree/updateTreeData", fData);
      }
    };
    return {
      name,
      submit,
      remove,
      dob,
      relationship,
      updateImage,
      openFileUploader,
      gender,
      image,
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
.card-image-edit {
  margin: 10px -5px;
  margin-left: 1px;
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
