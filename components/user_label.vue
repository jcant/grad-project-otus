<script setup lang="ts">
import type { User } from "~/misc/types";

interface UserLabelProps {
  user: User;
}

const props = defineProps<UserLabelProps>();
</script>

<template>
  <v-chip class="cursor-pointer">{{ user.name }}</v-chip>
</template>

<style scoped></style>
