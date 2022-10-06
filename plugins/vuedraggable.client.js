import Draggable from "vuedraggable";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("draggable", Draggable);
});

// export default defineNuxtPlugin(nuxtApp => {

// Vue.component('draggable', Draggable);
//   })
