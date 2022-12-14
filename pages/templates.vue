<script setup>
const { templates } = useTemplatesData();
const { uid } = useGenerateUid();
const router = useRouter();

// https://www.youtube.com/watch?v=URTeTJ5tDrQ
// https://www.youtube.com/watch?v=2C2sxQ4hiS8

// Filter
const filterValue = ref("all");
const filter = (value) => {
  filterValue.value = value;
};

// Filtered Templates

const filteredTemplates = computed(() => {
  return templates.filter((template) => {
    if (filterValue.value === "professional") {
      return template.category === "professional";
    }
    if (filterValue.value === "creative") {
      return template.category === "creative";
    }
    return template;
  });
});

const createEditorSession = (data) => {
  let sessionId = uid(16);
  let editorSession = {
    data: data,
  };
  console.log(editorSession);
  localStorage.setItem(sessionId, JSON.stringify(data));
  router.push({ path: `/editor/${sessionId}` });
};

//
const user = ref("free");
</script>

<template>
  <div class="min-h-screen bg-canvas-color">
    <Navbar />
    <main class="px-8 pb-20">
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
          <div
            class="flex-full md:flex-50% lg:flex-33.33% w-full px-3 my-2"
            v-for="template in filteredTemplates"
            :key="template.id"
          >
            <div
              class="card p-5 max-h-[250px] h-full bg-white shadow-lg rounded-xl relative cursor-pointer"
            >
              <img :src="'/images/templates/' + template.imgSrc" alt="" class=""/>
              <div
                class="overlay absolute w-full h-full top-0 left-0 flex items-center justify-center bg-[#ffffffb3] opacity-0 transition-all ease-in-out duration-350"
              >
                <!-- :to="`/editor/${template.name}`" -->
                <button
                  class="bg-primary-color text-white py-2 px-3 rounded-2xl"
                  v-if="template.type == user || user == 'pro'"
                  @click="createEditorSession(template.data)"
                >
                  Customize This Template
                </button>
                <button
                  class="bg-primary-color text-white py-2 px-3 rounded-2xl"
                  v-else
                >
                  Upgrade To Pro to Unlock
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      templates
    </main>
  </div>
</template>

<style scoped>
.card:hover .overlay {
  opacity: 1;
}
.filter-link.active {
  color: #000000;
  font-weight: 500;
}
.filter-link.active:before {
  content: "";
  position: absolute;
  width: 22px;
  height: 2px;
  background: #ffffffb3;
  left: 0;
  bottom: 0;
}
</style>
