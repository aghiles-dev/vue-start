import { createLocalVue, shallowMount } from "@vue/test-utils";
import App from "./App.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe("App", () => {
  let AppComponent;

  beforeEach(() => {
    AppComponent = shallowMount(App, {
      localVue,
      router
    });
  });

  test("is a Vue instance", () => {
    expect(AppComponent.isVueInstance()).toBeTruthy();
  });
});
