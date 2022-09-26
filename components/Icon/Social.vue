<script setup>
const props = defineProps(["icon"]);
</script>

<template>
  <div
    class="w-[35px] h-[35px] flex items-center justify-center rounded-lg cursor-pointer"
    :class="icon"
    :title="icon"
  >
    <img
      :src="'/icons/social/' + icon + '.svg'"
      class="h-[16px] w-[16px] fill-white"
      alt=""
    />
  </div>
</template>
