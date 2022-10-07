<script setup>
const { routeName, data } = useEditor();
provide(/* key */ 'data', /* value */ data)
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
