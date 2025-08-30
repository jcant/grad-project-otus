import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref("");

  function login(username: string, password: string): void {
    if (username != null && password != null) {
      user.value = username;
      saveToLocalStorage();
    }
  }

  function saveToLocalStorage(): void {
    if (isAuthorized) {
      localStorage.setItem("auth_user", user.value);
    }
  }

  function initFromLocalStorage(): void {
    let localValue: string | null = localStorage.getItem("auth_user");
    if (typeof localValue != null) {
      user.value = String(localValue);
    }
  }

  function logout(): void {
    user.value = "";
    localStorage.removeItem("auth_user");
  }

  function $reset() {
    logout();
  }

  const isAuthorized = computed(() => user.value != "" && user.value != null);

  return {
    user,
    isAuthorized,
    login,
    logout,
    initFromLocalStorage,
    $reset,
  };
});
