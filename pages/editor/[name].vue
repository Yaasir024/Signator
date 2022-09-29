<script setup>
const { templates } = useTemplatesData();
const { defaultTransition, editorNavActive, editorNav } = useTailwindConfig();
const { uid } = useGenerateUid();
const { socialIcons, addonsSocial, getUrl } = useEditorIcons();
const route = useRoute();
const name = route.params.name;

const data = reactive({});

onMounted(() => {
  Object.assign(data, JSON.parse(localStorage.getItem(name)));
});
</script>

<template>
  <div class="min-h-screen bg-canvas-color">
    <Navbar />
    <section class="h-full flex">
        
    </section>
  </div>
  {{ name }}
  {{ data }}
  
</template>
