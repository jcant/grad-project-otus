<script setup lang="ts">
import { UserLabel } from "#components";
import { getUsers } from "~/components/data/api";
import type { User } from "~/misc/types";

const users = ref<User[]>();

onBeforeMount(async () => {
  users.value = await getUsers();
});
</script>
<template>
  <div>
    <div>Пользователи:</div>
    <div v-for="user in users">
      <UserLabel :user="user"></UserLabel>
    </div>
  </div>
</template>
<style>
.pointer {
  cursor: pointer;
}
</style>
