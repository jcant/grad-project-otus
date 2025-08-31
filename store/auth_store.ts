import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { User } from "~/misc/types";
import { getUsers } from "~/components/data/api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User>();

  async function login(username: string, password: string): Promise<void> {
    console.log("in login() username=", username, " password=", password);

    if (username != null && password != null) {
      user.value = await getUserFromAPI(username);
      if (user.value != undefined) {
        saveToLocalStorage();
      }
    }
  }

  function saveToLocalStorage(): void {
    if (isAuthorized) {
      localStorage.setItem("auth_user", user.value!.login);
    }
  }

  async function initFromLocalStorage(): Promise<void> {
    let localValue: string | null = localStorage.getItem("auth_user");
    if (typeof localValue != null) {
      user.value = await getUserFromAPI(localValue!);
    }
  }

  function logout(): void {
    user.value = undefined;
    localStorage.removeItem("auth_user");
  }

  function $reset() {
    logout();
  }

  const isAuthorized = computed(
    () => user.value != null || user.value != undefined
  );

  async function getUserFromAPI(username: string): Promise<User | undefined> {
    console.log("in getUserFromAPI() username=", username);
    let users: User[];
    let result: User | undefined = undefined;
    if (username == null && username == "") {
      throw new Error("Wrong parameter, username must have a valid value!");
    }
    try {
      users = await getUsers();
      console.log("in getUserFromAPI() getUsers()=", users);
      result = users.find((u) => u.login == username);
    } catch (error) {
      console.log("Error while getting users from server api: ", error);
    }

    return result;
  }

  return {
    user,
    isAuthorized,
    login,
    logout,
    initFromLocalStorage,
    $reset,
  };
});
