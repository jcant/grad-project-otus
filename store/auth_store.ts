import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { User } from "~/misc/types";
import { getUsers, postUser } from "~/components/data/api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User>();

  async function login(login: string, password: string): Promise<void> {
    if (login != null && password != null) {
      user.value = await getUserFromAPI(login);
      if (user.value != undefined) {
        saveToLocalStorage();
      }
    }
  }

  async function register(
    login: string,
    name: string,
    password: string
  ): Promise<void> {
    if (login != null && password != null) {
      let result;
      result = await getUserFromAPI(login);
      if (result != undefined) {
        throw new Error(`User ${login} is already registered!`);
      } else {
        saveUserByAPI(login, name);
        user.value = { login: login, name: name };
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

  async function getUserFromAPI(login: string): Promise<User | undefined> {
    let users: User[];
    let result: User | undefined = undefined;
    if (login == null && login == "") {
      throw new Error("Wrong parameter, username must have a valid value!");
    }
    try {
      users = await getUsers();
      result = users.find((u) => u.login == login);
    } catch (error) {
      console.log("Error while getting users from server api: ", error);
    }

    return result;
  }

  async function saveUserByAPI(login: string, name: string) {
    if (login != null && login != undefined) {
      postUser({ login: login, name: name });
    }
  }

  return {
    user,
    isAuthorized,
    login,
    logout,
    register,
    initFromLocalStorage,
    $reset,
  };
});
