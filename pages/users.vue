<script setup lang="ts">
import { serverApi } from "~/misc/constants";

const users = ref({});
users.value = await useFetch(serverApi.GET_ALL_USERS);
</script>
<template>
  <div>
    <h1>Users Page</h1>
    <div>{{ users }}</div>
  </div>
</template>
<style scoped>
h1 {
  color: red;
}
</style>
