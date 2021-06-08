<template>
  <div class="root-container" v-if="loaded && current">
    <div class="tree-member-contain">
      <h5 class="tree-member-title">Family Members > {{ current.name }}</h5>
      <div class="tree-member-info">
        <img
          class="tree-change-image"
          src="../../../assets/icons/manage_accounts.svg"
          alt="test-image"
        />
        <div class="tree-member-data">
          <p>Email: abc@gmail.com</p>
          <p>Phone: 0043400044</p>
          <p>Gender:{{ current.gender }}</p>
          <p>DOB: {{ current.DOB }}</p>
          <p>{{ "Relationship: Friend" }}</p>
        </div>
      </div>
      <h4 class="tree-member-subtitle">About</h4>
      <div class="tree-member-about">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore error
          beatae voluptatem culpa quas eos deleniti corporis perspiciatis
          assumenda, praesentium quibusdam, cumque sunt ad mollitia, qui vel
          nulla in aspernatur reiciendis sit aut illum ducimus sint? Inventore,
          illo dolores repellendus expedita, cumque dolorem minima unde eius
          aperiam animi perferendis. Voluptates,
        </p>
      </div>
      <h4 class="tree-member-subtitle">Family Information</h4>
      <div class="tree-member-child-info">
        <div class="tree-member-info" v-if="parent">
          <img
            class="tree-small-change-image"
            src="../../../assets/icons/manage_accounts.svg"
            alt=""
          />
          <div>
            <p class="family-info-name">Name: {{ root[parent].name }}</p>
            <p>Gender: {{ root[parent].gender }}</p>
            <p>DOB: {{ root[parent].DOB }}</p>
            <p>Relation: {{ "Parent" }}</p>
          </div>
        </div>
        <div class="tree-member-info" v-if="partner">
          <img
            class="tree-small-change-image"
            src="../../../assets/icons/manage_accounts.svg"
            alt=""
          />
          <div>
            <p class="family-info-name">Name: {{ root[partner].name }}</p>
            <p>Gender: {{ root[partner].gender }}</p>
            <p>DOB: {{ root[partner].DOB }}</p>
            <p>Relation: {{ "Partner" }}</p>
          </div>
        </div>
        <div v-for="item in current.family.children" :key="item">
          <div class="tree-member-info">
            <img
              class="tree-small-change-image"
              src="../../../assets/icons/manage_accounts.svg"
              alt=""
            />
            <div>
              <p class="family-info-name">Name: {{ root[item].name }}</p>
              <p>Gender: {{ root[item].gender }}</p>
              <p>DOB: {{ root[item].DOB }}</p>
              <p>Relation: {{ "Children" }}</p>
            </div>
          </div>
        </div>
      </div>
      <h4 class="tree-member-subtitle">View family Tree</h4>
    </div>
    <div class="tree-change-map-contain">
      <div class="tree-member-btn">
        <button class="btn tree-member-btn">choose location</button>
      </div>
      <img
        class="tree-change-map"
        src="../../../assets/GoogleMapTA.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  props: ["memberId"],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const loaded = ref(false);
    const current = computed(() => store.state.tree.viewTree);
    const root = computed(() => store.state.tree.tree);
    const partner = computed(() => store.state.tree.viewTree.family.partner);
    const parent = computed(() => store.state.tree.viewTree.family.parent);
    onMounted(async () => {
      await store.dispatch("tree/getTreeData");
      await store.dispatch("tree/getTreeDataById", {
        id: route.params.memberId,
      });
      loaded.value = true;
      console.log(current.value);
    });
    return {
      current,
      loaded,
      root,
      partner,
      parent,
    };
  },
};
</script>

<style>
.tree-member-title {
  font-size: 1.25rem;
  text-align: left;
  text-transform: capitalize;
  padding-top: 1rem;
  color: #008bdc;
}
.family-info-name {
  text-transform: capitalize;
  color: #008bdc99;
  font-weight: 600;
  font-size: 1rem;
}
.tree-member-info {
  display: flex;
  margin: 2rem 0 0;
  /* line-height: 1.6rem; */
  text-align: left;
}
.tree-change-image {
  width: 150px;
  height: 150px;
  margin-right: 25px;
  border: 1px solid #008bdc;
  border-radius: 10px;
}
.tree-small-change-image {
  width: 100px;
  height: 100px;
  border: 1px solid #008bdc;
  border-radius: 10px;
  margin-right: 1rem;
}
.tree-member-data,
.tree-member-about {
  /* padding-top: 10px; */
  font-size: 0.9rem;
  line-height: 1.8rem;
}
.tree-member-contain {
  text-align: left;
  max-width: 720px;
}
.tree-member-about {
  text-align: justify;
  padding-top: 5px;
  line-height: 1.6rem;
  max-width: 650px;
}
.tree-member-child-info {
  margin-top: -20px;
  margin-bottom: 1.2rem;
  line-height: 1.6rem;
  padding: 10px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.tree-member-child-info > * {
  padding: 0px 0 15px;
}

.tree-member-subtitle {
  font-size: 0.95rem;
  color: #0009;
  margin-top: 1.8rem;
  padding-bottom: 10px;
  letter-spacing: 0.03rem;
}

.tree-change-map {
  width: 300px;
  height: 300px;

  border-radius: 10px;
  margin-left: -10px;
}

.root-container {
  display: grid;
  grid-template-columns: 700px 200px;
}

.tree-change-map-contain {
  position: relative;
  margin-top: 5rem;
}
.tree-member-btn {
  display: none;
  position: absolute;
  transform: translate(2.2rem, 165px);
  transition: 1s ease transform;
  z-index: -1;
}

.tree-member-btn:hover {
  transform: translate(2.2rem, 65px);
  z-index: 1;
}
</style>
