<script setup>
const prop = defineProps(["data"]);
</script>

<template>
  <div
    class="max-w-[700px] mx-auto bg-white shadow-2xl rounded-2xl sticky top-[80px]"
  >
    <div class="">
      <div class="header px-7 py-4 border-b">Preview Signature</div>
      <div class="preview">
        <div class="sig-preview pt-10 px-9 mb-10">
          <!-- <Layouts01 :data="data" /> -->
          <Layouts02 :data="data" />
        </div>
        <div class="footer">Save</div>
      </div>
    </div>
  </div>
</template>
