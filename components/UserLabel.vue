<script setup lang="ts">
import type { User } from "~/misc/types";

interface UserLabelProps {
  user: User;
}

const props = defineProps<UserLabelProps>();
</script>

<template>
  <v-chip class="pa-4 ma-2"
    >Login: <b>{{ user.login }}</b> &nbsp;| Name: {{ user.name }}</v-chip
  >
</template>

<style scoped></style>
