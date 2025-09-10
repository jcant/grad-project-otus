<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/store/auth_store";

const login = ref("");
const name = ref("");
const password = ref("");
const showPassword = ref(false);

const rules = {
  required: (value: string) => !!value || "The field id required!",
  min: (value: string) => value.length >= 8 || "Min 8 characters",
};

function register() {
  const authStore = useAuthStore();
  authStore.register(login.value, name.value, password.value);
}
</script>
<template>
  <v-container>
    <v-row justify="center">
      <div class="text-center w-100 text-h5">Enter your registration data</div>
      <v-col cols="6" class="text-center">
        <v-form @submit.prevent>
          <v-text-field
            v-model="login"
            :rules="[rules.required]"
            label="Login"
          ></v-text-field>
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            hint="At least 8 characters"
            label="Password"
            name="input-10-1"
            counter
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-btn class="mt-2" type="submit" block @click="register"
            >Register new user</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
