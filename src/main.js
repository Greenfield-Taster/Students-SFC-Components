import "./assets/main.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./components/App.vue";
import Students from "./components/Students.vue";
import StudentInfo from "./components/StudentInfo.vue";
import store from "./storeOption.js";

const routes = [
  { path: "/", component: Students },
  { path: "/student-info/:id", component: StudentInfo, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(store).mount("#app");
