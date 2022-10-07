<script setup>
const { routeName, isDarkMode } = useEditor();
// const data = useLocalStorage(`${routeName}`, {});
const data = inject('data')
</script>

<template>
  <main class="w-[calc(100%_-_450px)] h-screen flex flex-col">
    <div class="">
      <div class="relative h-[calc(100vh_-_50px)] overflow-y-auto px-5">
        <EditorMainPreview :data="data" />
        {{data}}
        <!-- {{message}}
        <input type="text" v-model="message.name"> -->
        <input type="text" v-model="data.name">
      </div>
    </div>
  </main>
</template>
