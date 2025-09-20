<script setup lang="ts">
import { pages } from "~/misc/constants";

function goToAuth() {
  navigateTo(pages.AUTH);
}
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4">
          <v-card-title class="text-h4 text-center">
            Проект: Список покупок (продвинутый)
            <v-btn color="amber" @click="goToAuth">Начать</v-btn>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-4"></v-divider>
            <div class="mb-4 text-center">
              Чтобы начать, используйте логин любого пользователя из списка
              ниже, либо создайте нового.<br />
              Чтобы вернуться сюда, разлогиньтесь.
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="ma-2 text-body-1 text-justify">
              Реализована авторизация/регистрация пользователя (без паролей и
              реальных принципов безопасности), управление списками покупок
              пользователя: создание (пустой список, повтор существующего),
              работа со списком (отметка купленных пунктов, перевод в архив и
              обратно). Все данные хранятся на бэкенде в виде SQLite базы.
              Авторизованный пользователь (информация о нем) и перечень списков
              покупок пользователя, а также текущий список покупок хранятся в
              Pinia. Информация об авторизованном пользователе дублируется в
              локальном хранилище браузера. Работа с бэкендом осуществляется
              через REST API.
            </div>
            <v-row>
              <v-col cols="8">
                <v-list dense>
                  <v-divider class="mb-4"></v-divider>
                  <v-list-item>
                    <v-list-item-title>
                      Frontend: Vue 3, Composition API, Vite, Pinia, Vuetify
                    </v-list-item-title>
                    <v-row class="ma-2 align-sm-start">
                      <v-col cols="2">
                        <v-img src="/public/vuejs.webp" height="50"></v-img>
                      </v-col>
                      <v-col cols="2">
                        <v-img src="/public/vite.webp" height="50"></v-img>
                      </v-col>
                      <v-col cols="2">
                        <v-img src="/public/pinia.webp" height="50"></v-img>
                      </v-col>
                      <v-col cols="2">
                        <v-img src="/public/vuetify.webp" height="50"></v-img>
                      </v-col>
                      <v-col></v-col>
                    </v-row>
                  </v-list-item>
                  <v-divider class="mb-4"></v-divider>
                  <v-list-item>
                    <v-list-item-title>
                      Backend: Nuxt 4, Nitro, SQLite
                    </v-list-item-title>
                    <v-row class="ma-2 align-sm-start">
                      <v-col cols="2">
                        <v-img src="/public/nuxt.webp" height="50"></v-img>
                      </v-col>
                      <v-col cols="2">
                        <v-img src="/public/nitro.webp" height="50"></v-img>
                      </v-col>
                      <v-col cols="2">
                        <v-img src="/public/sqlite.webp" height="50"></v-img>
                      </v-col>
                      <v-col></v-col>
                    </v-row>
                  </v-list-item>
                  <v-divider class="mb-4"></v-divider>
                  <v-list-item>
                    <div>
                      Source code: <v-icon left>mdi-github</v-icon>
                      <a
                        href="https://github.com/jcant/grad-project-otus"
                        target="_blank"
                      >
                        GitHub Repository
                      </a>
                    </div>
                    <div>
                      mailto:
                      <a href="mailto:jcant@yandex.ru">jcant@yandex.ru</a>
                    </div>
                    <div>
                      telegram:
                      <a href="https://t.me/jcantec" target="_blank"
                        >@jcantec</a
                      >
                    </div>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col>
                <user-list />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  margin-top: 40px;
}
</style>
