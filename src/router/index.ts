import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import ShowDetails from "@/pages/ShowDetails.vue";
import NotFound from "@/pages/NotFound.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/shows/:id",
      name: "show",
      component: ShowDetails
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound
    }
  ]
});

export default router;
