<script setup lang="ts">
import { serverApi } from "~/misc/constants";

const shoppingLists = ref({});
shoppingLists.value = await useFetch(serverApi.GET_ALL_SHOPPING_LISTS);
</script>
<template>
  <div>
    <h1>Users Page</h1>
    <div>{{ shoppingLists }}</div>
  </div>
</template>
<style scoped>
h1 {
  color: red;
}
</style>
