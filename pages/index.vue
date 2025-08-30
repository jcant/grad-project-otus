<script setup lang="ts">
import { serverApi } from "~/misc/constants";

const message = ref({});
message.value = await useFetch(serverApi.TEST);
</script>
<template>
  <div>
    <h1>Home Page</h1>
    <div>{{ message }}</div>
  </div>
</template>
<style scoped>
h1 {
  color: red;
}
</style>
