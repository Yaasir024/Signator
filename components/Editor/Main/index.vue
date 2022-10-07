<script setup>
const data = inject("data");
</script>

<template>
  <main class="w-[calc(100%_-_450px)] h-screen flex flex-col">
    <div class="">
      <EditorMainHeader />
      <div class="relative h-[calc(100vh_-_50px)] overflow-y-auto px-5">
        <EditorMainPreview :data="data" />
      </div>
    </div>
  </main>
</template>
