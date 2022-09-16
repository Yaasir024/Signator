<script setup>
const { defaultTransition, editorNavActive, editorNav } = useTailwindConfig();

const currentEditorNav = ref("general");
const setNavValue = (value) => {
  currentEditorNav.value = value;
};

const preview = ref();
const image = ref();

const previewImage = (event) => {
  let input = event.target;
  if (input.files) {
    let reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target.result;
    };
    image.value = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
  console.log(preview.value, image.value);
};
</script>

<template>
  <div class="min-h-screen bg-canvas-color">
    <Navbar />
    <main class="mt-8">
      <section class="max-w-[1280px] mx-auto px-6">
        <div class="editor flex">
          <div class="flex-50% min-h[500px]">left</div>
          <div class="flex-50%">
            <div class="bg-white shadow-lg rounded-2xl overflow-hidden">
              <ul class="nav flex flex-row border-b text-center text-base">
                <li
                  class="px-5 py-3 flex-1 cursor-pointer font-semibold capitalize border-r transition-all ease-in-out duration-350"
                  :class="
                    currentEditorNav === 'general' ? editorNavActive : editorNav
                  "
                  @click="setNavValue('general')"
                >
                  General
                </li>
                <li
                  class="px-5 py-3 flex-1 cursor-pointer font-semibold capitalize border-r transition-all ease-in-out duration-350"
                  :class="
                    currentEditorNav === 'social' ? editorNavActive : editorNav
                  "
                  @click="setNavValue('social')"
                >
                  Social
                </li>
                <li
                  class="px-5 py-3 flex-1 cursor-pointer font-semibold capitalize border-r transition-all ease-in-out duration-350"
                  :class="
                    currentEditorNav === 'addons' ? editorNavActive : editorNav
                  "
                  @click="setNavValue('addons')"
                >
                  Addons
                </li>
                <li
                  class="px-5 py-3 flex-1 cursor-pointer font-semibold capitalize transition-all ease-in-out duration-350"
                  :class="
                    currentEditorNav === 'design' ? editorNavActive : editorNav
                  "
                  @click="setNavValue('design')"
                >
                  Design
                </li>
              </ul>
              <div class="main px-10 pt-10 pb-12">
                <div class="general">
                  <div class="content max-w-[400px] mx-auto">
                    <div class="wrapper image-section flex pb-3">
                      <div
                        class="image-preview w-[40%] rounded-2xl overflow-hidden text-secondary-color"
                      >
                        <div
                          class="relative flex flex-col items-center py-10 border overflow-hidden"
                          v-if="!image"
                        >
                          <div class="icon block">
                            <svg
                              width="24"
                              height="24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            >
                              <path
                                d="M11.492 10.172l-2.5 3.064-.737-.677 3.737-4.559 3.753 4.585-.753.665-2.5-3.076v7.826h-1v-7.828zm7.008 9.828h-13c-2.481 0-4.5-2.018-4.5-4.5 0-2.178 1.555-4.038 3.698-4.424l.779-.14.043-.789c.185-3.448 3.031-6.147 6.48-6.147 3.449 0 6.295 2.699 6.478 6.147l.044.789.78.14c2.142.386 3.698 2.246 3.698 4.424 0 2.482-2.019 4.5-4.5 4.5m.978-9.908c-.212-3.951-3.472-7.092-7.478-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.522-5.408"
                              />
                            </svg>
                          </div>
                          <span class="inline-block mt-2">Choose Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            @change="previewImage"
                            class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            id="my-file"
                          />
                        </div>
                        <img
                          :src="preview"
                          class="w-full h-full"
                          v-if="image"
                        />
                      </div>
                    </div>
                    <div class="wrapper mt-4 pb-3 text-base">
                      <div
                        class="form-item flex items-center justify-between my-6"
                      >
                        <label>Name</label>
                        <input
                          type="text"
                          class="text-sm w-full max-w-[60%] bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                          :class="defaultTransition"
                        />
                      </div>
                      <div
                        class="form-item flex items-center justify-between my-6"
                      >
                        <label>Position</label>
                        <input
                          type="text"
                          class="text-sm w-full max-w-[60%] bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                          :class="defaultTransition"
                        />
                      </div>
                      <div
                        class="form-item flex items-center justify-between my-6"
                      >
                        <label class="">Company</label>
                        <input
                          type="text"
                          class="text-sm w-full max-w-[60%] bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                          :class="defaultTransition"
                        />
                      </div>
                    </div>
                    <div class="wrapper contact border-t">
                      <div
                        class="text-primary-color text-lg font-semibold my-4"
                      >
                        Contact Info
                      </div>
                      <div class="flex justify-end">
                        <div class="flex items-center text-primary-color cursor-pointer">
                          <span class="mr-2">Add Field</span>
                          <svg
                            width="24"
                            height="24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path
                              d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
