<template>
  <nav
    class="bg-white border-b px-5 py-3 flex items-center justify-between sticky top-0 z-20"
  >
    <div class=" flex items-center">
      <nuxt-link to="/">
        <div class="home flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width="16"
            height="16"
          >
            <path
              d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
            />
          </svg>
          <span class="ml-2 text-lg">Home</span>
        </div>
      </nuxt-link>
      <div class="file ml-5 relative">
        <span class=" text-lg cursor-pointer">File</span>
        <!-- <div class="absolute top-[110%] left-[-50px] bg-white border rounded-3xl z-50">
            <div class="w-[300px] py-6 px-7"></div>
        </div> -->
      </div>
    </div>
    <div class="">
        <button class="save bg-primary-color text-white px-3 py-2 rounded-2xl">
            Save Project
        </button>
    </div>
  </nav>
</template>
