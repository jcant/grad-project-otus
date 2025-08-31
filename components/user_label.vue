<script setup lang="ts">
import type { User } from "~/misc/types";

interface UserLabelProps {
  user: User;
}

const props = defineProps<UserLabelProps>();
</script>

<template>
  <Badge color="green-100" font-size="6" padding="2" margin="2">{{
    user.name
  }}</Badge>
</template>

<style scoped></style>
