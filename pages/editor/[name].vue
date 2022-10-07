<script setup>
const { isDarkMode, routeName, data } = useEditor();
const message = ref('Hi there')
provide(/* key */ 'data', /* value */ data)
// const data = useLocalStorage(`${routeName}`, {});
// import {
//   useRefHistory,
//   useDebouncedRefHistory,
//   useLocalStorage,
//   useStorage,
// } from "@vueuse/core";

// const { history, undo, redo } = useDebouncedRefHistory(data, {
//   deep: true,
//   capacity: 15,
//   debounce: 2000,
// });

// To check if an Obj is Empty
const isObjEmpty = (obj) => {
  for (var o in obj) {
    if (obj.hasOwnProperty(o)) return false;
  }
  return true;
};
</script>

<template>
  <div class="h-screen bg-canvas-color overflow-hidden">
    <section class="h-full w-full flex">
      <EditorSidebar />
      <EditorMain />
    </section>
  </div>
</template>

<style scoped></style>
