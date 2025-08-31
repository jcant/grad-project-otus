<script setup lang="ts">
import { useAuthStore } from "~/store/auth_store";

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);

authStore.initFromLocalStorage();
</script>
<template>
  <v-container>
    <v-row justify="center" v-if="isAuthorized">
      <v-chip color="green">AUTHORIZED!</v-chip>
    </v-row>
    <v-row justify="center" v-if="isAuthorized">
      <router-link to="/shopping_lists">Go to shopping lists page</router-link>
    </v-row>
    <v-row justify="center" v-if="!isAuthorized">
      <div class="text-center w-100 text-h4 mb-3 text-amber">
        Please authenticate
      </div>
      <auth-authenticate></auth-authenticate>
      <div class="text-center w-100 text-h4 mb-3 mt-3">Or</div>
      <div class="text-center w-100 text-h4 mb-3 text-amber">
        Please register
      </div>
      <auth-register></auth-register>
    </v-row>
  </v-container>
</template>
<style scoped></style>
