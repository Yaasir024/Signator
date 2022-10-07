<script setup>
  const { imageModal } = useEditor();
</script>

<template>
  <aside class="sidebar static top-0 h-screen">
    <div class="w-[450px] bg-white shadow-xl border-r h-full flex">
      <EditorSidebarMenu />
      <EditorSidebarSection />
      <EditorSidebarImageModal v-if="imageModal"/>
    </div>
  </aside>
</template>
