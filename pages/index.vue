<script setup lang="ts"></script>
<template>
  <v-container>
    <v-row justify="center">
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
