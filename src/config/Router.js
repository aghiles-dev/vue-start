import VueRouter from "vue-router";
import PageA from "../app/PageA.vue";
import PageB from "../app/PageB.vue";

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/a",
      name: "a",
      component: PageA
    },
    {
      path: "/b",
      name: "b",
      component: PageB
    },
    {
      path: "*",
      redirect: "/a"
    }
  ]
});
