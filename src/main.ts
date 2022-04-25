import { createApp } from "vue";
import App from "./App.vue";
import "./tailwind.css";
import { createPinia } from "pinia";
import { InstallMigrations } from "@app/db";

InstallMigrations().then(() => createApp(App).use(createPinia()).mount("#app"));
