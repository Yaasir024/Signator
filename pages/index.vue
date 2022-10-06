<script setup>
const myArray = ref([
  { id: 1, name: "Yaasir" },
  { id: 2, name: "GeekMe" },
  { id: 3, name: "Riaasr" },
  { id: 4, name: "Son Goku" },
  { id: 5, name: "Trunks" },
]);
const drag = ref(false);
</script>

<template>
  <div class="min-h-screen bg-canvas-color">
    <Navbar />
    <section class="bg-white h-[85vh] w-full">
      <main class="grid grid-cols-2 gap-4">
        <h1 class="text-xl">HOME PAGE</h1>
        <!-- <draggable
          v-model="myArray"
          group="people"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }">
            <div>{{ element.name }}</div>
          </template>
        </draggable> -->
      </main>
    </section>
  </div>
</template>
