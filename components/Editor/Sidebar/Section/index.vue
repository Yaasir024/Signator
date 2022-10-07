<script setup>
    const { currentEditorNav } = useEditor();
</script>

<template>
    <div class="editor-tools h-full w-full overflow-y-auto">
        <div class="px-4 pt-8 pb-14">
            <EditorSidebarSectionGeneral v-if="currentEditorNav === 'general'"/>
            <EditorSidebarSectionSocial v-if="currentEditorNav === 'social'"/>
            <EditorSidebarSectionAddons v-if="currentEditorNav === 'addons'"/>
            <EditorSidebarSectionDesign v-if="currentEditorNav === 'design'"/>
        </div>
    </div>
</template>

<style scoped>
.editor-tools::-webkit-scrollbar {
  width: 10px;
}

.editor-tools::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.editor-tools::-webkit-scrollbar-thumb {
  background-color: rgb(206, 206, 206);
  outline: 1px solid rgb(184, 194, 204);
}
</style>