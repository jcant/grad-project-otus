<script setup>
import { onBeforeMount } from "vue";
import { pages } from "~/misc/constants";
import { useAuthStore } from "~/store/auth_store";

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);
const route = useRoute();

onBeforeMount(async () => {
  await authStore.initFromLocalStorage();
  if (!isAuthorized.value) {
    goHome();
  }
});

function logout() {
  authStore.logout();
  goHome();
}

function goHome() {
  if ("/" + route.name != pages.HOME) {
    setTimeout(() => navigateTo(pages.HOME), 3000);
  }
}
</script>

<template>
  <v-container class="w-100">
    <v-row class="bg-amber w-100">
      <v-col cols="3" class="text-center">route name: {{ route.name }}</v-col>
      <v-col class="text-center">
        <div v-if="!isAuthorized">
          Unauthorized access denied. Redirecting...
          <v-btn loading class="bg-amber" variant="text"></v-btn>
        </div>
      </v-col>
      <v-col cols="3" class="text-center">
        <div v-if="isAuthorized">
          User:
          <v-chip closable @click:close="logout">{{
            authStore.user?.name
          }}</v-chip>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
