import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/connectWithWagmi", component: "connectWithWagmi" },
    { path: "transfer", component: "transfer" }
  ],
  npmClient: 'yarn',
});
