<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Email</th>
        <th>DOB</th>
        <th>Relationship</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="card in cards"
        :key="card.id"
      >
        <td>{{card.firstname}} {{card.lastname}}</td>
        <td>{{card.gender}}</td>
        <td>{{card.email}}</td>
        <td>{{card.dob}}</td>
        <td>{{card.relationship ? card.relationship.name: 'Unknown'}}</td>
        <td>delete</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { get, devApiURL } from "@/api";

export default {
  setup() {
    const cards = ref([]);
    onMounted(async () => {
      const { members } = await get("members");
      members.forEach(async (member) => {
        member.imagedata = `${devApiURL}/members/${member.id}/${member.imageurl}`;
      });
      cards.value = members;
    });
    return {
      cards,
    };
  },
};
</script>

<style>
table,
td,
th {
  border: 1px solid #008dbc55;
}
table {
  width: 110%;
}
td,
th {
  text-align: left;
  text-overflow: ellipsis;
}
</style>