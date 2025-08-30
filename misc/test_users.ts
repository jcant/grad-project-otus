import type { User } from "~/misc/types";

export function getTestUsers(): User[] {
  return [
    { id: 1, login: "vasya", name: "Вася" },
    { id: 2, login: "petya", name: "Петя" },
    { id: 3, login: "masha", name: "Маша" },
    { id: 4, login: "andrey", name: "Андрей" },
    { id: 5, login: "vika", name: "Вика" },
  ];
}
