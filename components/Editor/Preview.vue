<script setup>
const prop = defineProps(["data"]);
</script>

<template>
  <div
    class="max-w-[750px] mx-auto bg-white shadow-2xl border rounded-3xl sticky top-[80px]"
  >
    <div class="">
      <div class="header px-7 py-4 border-b">Preview Signature</div>
      <div class="preview">
        <div class="sig-preview pt-10 px-9 mb-10">
          <!-- <Layouts01 :data="data" /> -->
          <Layouts02 :data="data" />
        </div>
        <div class="footer px-7 py-4 border-t">Save</div>
      </div>
    </div>
  </div>
</template>
