<script setup>
const prop = defineProps(["data"]);
</script>


<!--  sticky top-[80px] -->
<template>
  <div
    class="max-w-[650px] mx-auto my-4 bg-white shadow-lg border rounded-3xl"
  >
    <div class="">
      <div class="header px-7 py-4 border-b text-lg">Preview Signature</div>
      <div class="preview">
        <div class="sig-preview pt-7 px-9 mb-10">
          <!-- <Layouts01 :data="data" /> -->
          <Layouts03 :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>
