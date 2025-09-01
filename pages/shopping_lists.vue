<script setup lang="ts">
import Header from "~/components/Header.vue";
import { serverApi } from "~/misc/constants";

const shoppingLists = ref({});
shoppingLists.value = await useFetch(serverApi.GET_ALL_SHOPPING_LISTS);
</script>
<template>
  <Header></Header>
  <div>
    <h1>Shopping Lists Page</h1>
    <div>{{ shoppingLists }}</div>
  </div>
</template>
<style scoped>
h1 {
  color: red;
}
</style>
