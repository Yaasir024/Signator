<script setup>
const { defaultTransition } = useTailwindConfig();
const filterValue = ref("all");
const filter = (value) => {
  filterValue.value = value;
};
</script>

<template>
  <div class="min-h-screen bg-canvas-color">
    <Navbar />
    <main class="px-8">
      <section class="hero py-32">
        <div class="wrapper text-center">
          <h1 class="text-4xl font-medium mb-3">Email Signature Templates</h1>
          <h3 class="text-lg">
            Design your Email signature with our easily customizable templates
          </h3>
        </div>
      </section>
      <ul class="filter-bar flex flex-center justify-center text-lg">
        <li
          class="px-5 py-2 cursor-pointer border border-gray-400 rounded-l-2xl transition-all ease-in-out duration-350"
          @click="filter('all')"
          :class="filterValue == 'all' ? 'text-white bg-primary-color ' : ''"
        >
          All
        </li>
        <li
          class="px-5 py-2 cursor-pointer border-y border-r border-gray-400 transition-all ease-in-out duration-350"
          @click="filter('professional')"
          :class="
            filterValue == 'professional' ? 'text-white bg-primary-color ' : ''
          "
        >
          Professional
        </li>
        <li
          class="px-5 py-2 cursor-pointer border-y border-gray-400 transition-all ease-in-out duration-350"
          @click="filter('creative')"
          :class="
            filterValue == 'creative' ? 'text-white bg-primary-color ' : ''
          "
        >
          Creative
        </li>
        <li
          class="px-5 py-2 cursor-pointer border border-gray-400 rounded-r-2xl transition-all ease-in-out duration-350"
          @click="filter('free')"
          :class="filterValue == 'free' ? 'text-white bg-primary-color ' : ''"
        >
          Free
        </li>
      </ul>
      <div class="mt-12">
        <div class="flex flex-wrap max-w-[1140px] mx-auto">
          <div class="flex-33.33% w-full px-3 my-2" v-for="i in 12" :key="i">
            <div class="p-5 bg-white shadow-lg rounded-xl">
              <img :src="'/images/templates/' + i + '.PNG'" alt="" />
              {{ i }}
            </div>
          </div>
        </div>
      </div>
      templates
    </main>
  </div>
</template>

<style scoped>
.filter-link.active {
  color: #000000;
  font-weight: 500;
}
.filter-link.active:before {
  content: "";
  position: absolute;
  width: 22px;
  height: 2px;
  background: #4255d4;
  left: 0;
  bottom: 0;
}
</style>
