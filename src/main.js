import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import "babel-polyfill";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueRouter);
Vue.use(BootstrapVue);

import App from "./App.vue";
import { router } from "./config/Router";

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
