<script setup>
import {
  useRefHistory,
  useDebouncedRefHistory,
  useLocalStorage,
  useStorage,
} from "@vueuse/core";
const { templates } = useTemplatesData();
const { defaultTransition, editorNavActive, editorNav } = useTailwindConfig();
const { uid } = useGenerateUid();
const { getTime, getDate } = useGetDateTime();
const { socialIcons, addonsSocial, getUrl } = useEditorIcons();
const route = useRoute();
const name = route.params.name;

// const data = reactive({});

// onMounted(() => {
//   Object.assign(data, JSON.parse(localStorage.getItem(name)));
// });

// localStorage.setItem('store', '{"hello": "hello"}')
const data = useLocalStorage(`${name}`, {});
const { history, undo, redo } = useDebouncedRefHistory(data, {
  deep: true,
  capacity: 15,
  debounce: 2000,
});

// Change Editor Route
const currentEditorNav = ref("general");
const setNavValue = (value) => {
  currentEditorNav.value = value;
};

/*  GENERAL SECTION */
// Add New Contact Item
const addNewContactItem = () => {
  data.value.contactInfo.push({
    id: uid(6),
    field: "",
    value: "",
  });
};
// Delete Contact Item
const deleteContactItem = (id) => {
  data.value.contactInfo = data.value.contactInfo.filter(
    (item) => item.id != id
  );
};

/*  SOCIAL SECTION */
// Add New Social Item
const addNewSocialItem = (social) => {
  if (!data.value.socialInfo.some((e) => e.name === social)) {
    data.value.socialInfo.push({
      id: uid(6),
      name: social,
      url: "",
    });
    socialSearchQuery.value = "";
  }
};
// Delete Social Item
const deleteSocialItem = (id) => {
  data.value.socialInfo = data.value.socialInfo.filter((item) => item.id != id);
};
const socialSearchQuery = ref("");
// FILTERED SOCIAL MEDIA
const filteredSocialData = computed(() => {
  const query = ref(socialSearchQuery.value.toLowerCase());
  if (socialSearchQuery.value === "") {
    return socialIcons;
  }
  return socialIcons.filter((item) => {
    return Object.values(item).some((word) =>
      String(word).toLowerCase().includes(query.value)
    );
  });
});

/*  ADDONS SECTION */
const addonsDetailsVisibility = reactive({
  signoff: false,
  social: false,
  videoMeeting: false,
  cta: false,
});
const showAddonDetail = (addon) => {
  addonsDetailsVisibility[addon] = !addonsDetailsVisibility[addon];
  console.log(addonsDetailsVisibility[addon]);
};

// Add addon
const addAddons = (addon) => {
  data.value.addons[addon].isAdded = true;

  console.log(data.value.addons);
};
// Delete Addon
const deleteAddons = (addon) => {
  data.value.addons[addon].isAdded = false;

  console.log(data.value.addons);
};
//check addon
const checkAddons = () => {
  return (
    data.value.addons.social.isAdded ||
    data.value.addons.videoMeeting.isAdded ||
    data.value.addons.cta.isAdded
  );
};

/*  SignOFF ADDON  */
// Font Menu
const signoffFontMenu = ref(false);
// Toggle Font Menu
const toggleSignoffFontMenu = () => {
  signoffFontMenu.value = !signoffFontMenu.value;
};
// Set Font
const setSignoffFont = (font) => {
  data.value.addons.signoff.style.fontFamily = font;
  signoffFontMenu.value = false;
};
// FontMenu On Click Outside
const signoffFontMenuBar = ref(null);
useClickOutside(signoffFontMenuBar, () => {
  signoffFontMenu.value = false;
});

/*  SOCIAL ADDON  */
// Add Social Addon
const addSocialAddon = (social) => {
  if (!data.value.addons.social.items.some((e) => e.name === social)) {
    data.value.addons.social.items.push({
      id: uid(6),
      name: social,
      url: "",
    });
  }
};
// Delete Social Addon
const deleteSocialAddon = (id) => {
  data.value.addons.social.items = data.value.addons.social.items.filter(
    (item) => item.id != id
  );
};
/* VIDEO MEETING ADDON */
// Add video meeting
const addVideoMeetingAddon = (name) => {
  data.value.addons.videoMeeting.items.name = name;
};

/* DESIGN SECTION */
// Font Menu
const fontMenu = ref(false);
// Toggle Font Menu
const toggleFontMenu = () => {
  fontMenu.value = !fontMenu.value;
};
// Set Font
const setFont = (font) => {
  data.value.design.layout.fontFamily = font;
  fontMenu.value = false;
};
// FontMenu On Click Outside
const fontMenuBar = ref(null);
useClickOutside(fontMenuBar, () => {
  fontMenu.value = false;
});

const imageModal = ref(false);
const toggleImageModal = () => {
  imageModal.value = !imageModal.value;
};

const previewImage = ref("");
// Add image
const readImage = (event) => {
  let input = event.target;
  let image = input.files[0];
  if (input.files) {
    let reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
  imageModal.value = true;
  console.log(image);
};
const setImage = () => {
  data.value.image.imgSrc = previewImage.value;
  imageModal.value = false;
};
// Remove Image
const clearImage = () => {
  data.value.image.imgSrc = "";
};

// 

// To check if an Obj is Empty
const isObjEmpty = (obj) => {
  for (var o in obj) {
    if (obj.hasOwnProperty(o)) return false;
  }
  return true;
};
</script>

<template>
  <div class="" v-if="!isObjEmpty(data)">
    <div class="h-screen bg-canvas-color overflow-hidden">
      <!-- <NavbarEditor /> -->
      <section class="h-full w-full flex" v-if="!isObjEmpty(data)">
        <aside class="sidebar static top-0 h-screen">
          <div class="bg-white shadow-xl border-r h-full flex">
            <div class="left h-full bg-canvas-color max-w-[74px] w-full">
              <div class="w-full">
                <!-- General -->
                <button
                  class="flex flex-col items-center justify-center h-[74px] w-full px-1 hover:text-gray-500 transition-all ease-in-out duration-400"
                  :class="currentEditorNav === 'general' ? 'bg-white' : ''"
                  @click="setNavValue('general')"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  >
                    <path
                      d="M20 15h4.071v2h-4.071v4.071h-2v-4.071h-4.071v-2h4.071v-4.071h2v4.071zm-8 6h-12v-2h12v2zm0-4.024h-12v-2h12v2zm0-3.976h-12v-2h12v2zm12-4h-24v-2h24v2zm0-4h-24v-2h24v2z"
                    />
                  </svg>
                  <span>General</span>
                </button>
                <!-- Social -->
                <button
                  class="flex flex-col items-center justify-center h-[74px] w-full px-1 hover:text-gray-500 transition-all ease-in-out duration-400"
                  :class="currentEditorNav === 'social' ? 'bg-white' : ''"
                  @click="setNavValue('social')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M5 9c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.239-5 5s2.238 5 5 5 5-2.239 5-5-2.238-5-5-5zm15 9c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.944 1.764l5.488 2.927c-.072.301-.121.611-.121.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-22c-2.209 0-4 1.791-4 4 0 .324.049.634.121.935l-5.488 2.927c.395.536.713 1.128.944 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4s-1.791-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"
                    />
                  </svg>
                  <span>Social</span>
                </button>
                <!-- Addons -->
                <button
                  class="flex flex-col items-center justify-center h-[74px] w-full px-1 hover:text-gray-500 transition-all ease-in-out duration-400"
                  :class="currentEditorNav === 'addons' ? 'bg-white' : ''"
                  @click="setNavValue('addons')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14.852 6h-.004c.485-.627 1.072-1.547 1.072-2.744 0-1.572-1.499-3.256-3.731-3.256-2.23 0-3.729 1.684-3.729 3.256 0 1.195.587 2.117 1.072 2.744h-6.531999999999999v6.528c0 .974.438 1.736 1.172 2.04.709.293 1.547.078 2.186-.562 1.246-1.298 2.642-.131 2.642 1.183 0 1.29-1.396 2.484-2.644 1.184-.638-.639-1.476-.854-2.185-.561-.733.303-1.171 1.066-1.171 2.04v6.148h18v-18h-6.148zm-9.852 16v-4.151999999999999c.627.485 1.547 1.072 2.744 1.072 1.572 0 3.256-1.499 3.256-3.73 0-2.23-1.684-3.729-3.256-3.729-1.195 0-2.117.587-2.744 1.072v-4.5329999999999995h4.528c.974 0 1.736-.438 2.04-1.171.293-.71.078-1.548-.562-2.187-1.298-1.245-.131-2.642 1.183-2.642 1.29 0 2.484 1.397 1.184 2.644-.639.638-.854 1.476-.561 2.185.303.733 1.066 1.171 2.04 1.171h4.148v14h-14z"
                    />
                  </svg>
                  <span>Addons</span>
                </button>
                <!-- Design -->
                <button
                  class="flex flex-col items-center justify-center h-[74px] w-full px-1 hover:text-gray-500 transition-all ease-in-out duration-400"
                  :class="currentEditorNav === 'design' ? 'bg-white' : ''"
                  @click="setNavValue('design')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    width="26"
                    height="26"
                    fill="currentColor"
                  >
                    <rect width="20" height="20" fill="none" />
                    <path
                      d="M221.6,149.4a96.2,96.2,0,0,0,2.4-22.2c-.4-52.9-44.2-95.7-97-95.2A96,96,0,0,0,96,218.5a23.9,23.9,0,0,0,32-22.6V192a23.9,23.9,0,0,1,24-24h46.2A24,24,0,0,0,221.6,149.4Z"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="16"
                    />
                    <circle cx="128" cy="76" r="16" />
                    <circle cx="83" cy="102" r="16" />
                    <circle cx="83" cy="154" r="16" />
                    <circle cx="173" cy="102" r="16" />
                  </svg>
                  <span>Design</span>
                </button>
                <!-- Layout -->
                <button
                  class="flex flex-col items-center justify-center h-[74px] w-full px-1 hover:text-gray-500 transition-all ease-in-out duration-400"
                  :class="currentEditorNav === 'layout' ? 'bg-white' : ''"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M0 0v24h24v-24h-24zm11 22h-9v-16h9v16zm11 0h-9v-7h9v7zm0-9h-9v-7h9v7z"
                    />
                  </svg>
                  <span>Layout</span>
                </button>
              </div>
            </div>
            <div class="editor-tools h-full w-[400px] overflow-y-auto">
              <div class="px-4 pt-8 pb-14">
                <!-- GENERAL -->
                <div
                  class="general pt-6 pb-14"
                  v-if="currentEditorNav === 'general'"
                >
                  <div class="content max-w-[400px] mx-auto">
                    <!-- Image Secion -->
                    <div
                      class="wrapper image-section flex items-center justify-center pb-3"
                    >
                      <div
                        class="image-preview w-[40%] text-secondary-color relative"
                      >
                        <div
                          class="relative flex flex-col items-center py-10 border border-dashed overflow-hidden cursor-pointer"
                          v-if="!data.image.imgSrc"
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
                            @change="readImage"
                            class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        <img
                          :src="data.image.imgSrc"
                          class="w-full h-full"
                          v-if="data.image.imgSrc"
                        />
                        <div
                          class="flex items-center justify-center absolute right-[-4px] top-[-4px] bg-red-600 text-white p-1 rounded-full cursor-pointer"
                          v-if="data.image.imgSrc"
                          @click="clearImage()"
                        >
                          <svg
                            height="16"
                            width="16"
                            fill="currentColor"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            stroke-linejoin="round"
                            stroke-miterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <!--  -->
                    <div class="wrapper mt-4 pb-6 mb-10 border-b">
                      <!-- Name -->
                      <div
                        class="form-item flex items-center justify-between my-6"
                      >
                        <label>Name</label>
                        <input
                          type="text"
                          class="text-sm w-full max-w-[60%] bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                          :class="defaultTransition"
                          v-model="data.name"
                        />
                      </div>
                      <!-- Position -->
                      <div
                        class="form-item flex items-center justify-between my-6"
                      >
                        <label>Position</label>
                        <input
                          type="text"
                          class="text-sm w-full max-w-[60%] bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                          :class="defaultTransition"
                          v-model="data.position"
                        />
                      </div>
                      <!-- Department -->
                      <div
                        class="form-item flex items-center justify-between my-6"
                      >
                        <label class="">Department</label>
                        <input
                          type="text"
                          class="text-sm w-full max-w-[60%] bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                          :class="defaultTransition"
                          v-model="data.department"
                        />
                      </div>
                      <!-- Company -->
                      <div
                        class="form-item flex items-center justify-between my-6"
                      >
                        <label class="">Company</label>
                        <input
                          type="text"
                          class="text-sm w-full max-w-[60%] bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                          :class="defaultTransition"
                          v-model="data.company"
                        />
                      </div>
                    </div>
                    <!-- Contact Info Section -->
                    <div class="wrapper contact">
                      <EditorHeadings :title="'Layout'" />
                      <div class="my-3">
                        <div
                          class="field flex space-between mt-4 px-2 relative"
                          v-for="item in data.contactInfo"
                          :key="item.id"
                        >
                          <div class="w-[40%] pr-1">
                            <input
                              type="text"
                              placeholder="Field"
                              class="text-sm w-full bg-canvas-color rounded-3xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                              :class="defaultTransition"
                              v-model="item.field"
                            />
                          </div>
                          <div class="w-[60%] pl-1">
                            <input
                              type="text"
                              class="text-sm w-full bg-canvas-color rounded-3xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                              :class="defaultTransition"
                              v-model="item.value"
                            />
                          </div>
                          <div
                            class="flex items-center justify-center absolute right-[-10px] top-3 cursor-pointer"
                            @click="deleteContactItem(item.id)"
                          >
                            <svg
                              height="16"
                              width="16"
                              fill="currentColor"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                              stroke-linejoin="round"
                              stroke-miterlimit="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <!-- Add Button -->
                      <div class="flex justify-end mt-6">
                        <div
                          class="flex items-center text-primary-color cursor-pointer"
                          @click="addNewContactItem()"
                        >
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
                <!-- SOCIAL -->
                <div class="social pb-14" v-if="currentEditorNav === 'social'">
                  <div class="my-3 mb-10" v-if="data.socialInfo.length >= 1">
                    <div
                      class="field flex items-center justify-between mt-4 px-2 relative"
                      v-for="social in data.socialInfo"
                      :key="social.id"
                    >
                      <SocialIcon :icon="social.name" />
                      <div class="w-[85%] pl-1">
                        <input
                          type="text"
                          :placeholder="getUrl(social.name)"
                          class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                          :class="defaultTransition"
                          v-model="social.url"
                        />
                      </div>
                      <div
                        class="flex items-center justify-center absolute right-[-10px] top-3 cursor-pointer"
                        @click="deleteSocialItem(social.id)"
                      >
                        <svg
                          height="16"
                          width="16"
                          fill="currentColor"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          stroke-linejoin="round"
                          stroke-miterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="search">
                    <input
                      type="text"
                      placeholder="Search"
                      class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                      :class="defaultTransition"
                      v-model="socialSearchQuery"
                    />
                  </div>
                  <div class="social-icons flex flex-wrap my-8">
                    <div
                      class="m-1"
                      v-for="icon in filteredSocialData"
                      :key="icon.id"
                      @click="addNewSocialItem(icon.name)"
                    >
                      <SocialIcon :icon="icon.name" />
                    </div>
                  </div>
                </div>
                <!-- ADDONS -->
                <div class="addons pb-14" v-if="currentEditorNav === 'addons'">
                  <!-- Added -->
                  <div class="border-b pb-7 mb-10" v-if="checkAddons()">
                    <EditorHeadings :title="'Added Addons'" />
                    <!-- Sign Off -->
                    <div
                      class="rounded-3xl shadow-lg border relative overflow-hidden"
                      v-if="data.addons.signoff.isAdded"
                      :class="
                        addonsDetailsVisibility.signoff ? 'mb-5' : 'mb-12'
                      "
                    >
                      <div
                        class="accordion flex items-center justify-between py-4 px-5 border-b"
                        @click="showAddonDetail('signoff')"
                      >
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M13.473 9.196c-.425-.439-.401-1.127.035-1.552l4.461-4.326c.218-.211.498-.318.775-.318.282 0 .563.11.776.331l-6.047 5.865zm-7.334 11.021c-.092.089-.139.208-.139.327 0 .25.204.456.456.456.114 0 .229-.042.317-.128l.749-.729-.633-.654-.75.728zm6.33-8.425l-2.564 2.485c-1.378 1.336-2.081 2.63-2.73 4.437l1.132 1.169c1.825-.593 3.14-1.255 4.518-2.591l2.563-2.486-2.919-3.014zm7.477-7.659l-6.604 6.405 3.326 3.434 6.604-6.403c.485-.469.728-1.093.728-1.718 0-2.088-2.53-3.196-4.054-1.718zm-19.946 16.867h4v-1h-4v1z"
                            />
                          </svg>
                          <span class="ml-3">SignOff</span>
                        </div>
                        <div
                          class="flex items-center justify-center cursor-pointer"
                          @click="deleteAddons('signoff')"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        class="overflow-hidden transition-all ease-in-out duration-300"
                        :class="
                          addonsDetailsVisibility.signoff
                            ? 'max-h-0'
                            : 'max-h-[500px]'
                        "
                      >
                        <div class="content py-7 px-5">
                          <div class="options mb-2">
                            <div class="flex flex-wrap">
                              <div
                                class="flex items-center flex-50% p-1 text-lg cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  id="best-regards"
                                  value="Best Regards,"
                                  v-model="data.addons.signoff.value"
                                />
                                <label for="best-regards" class="ml-1"
                                  >Best Regards,</label
                                >
                              </div>
                              <div
                                class="flex items-center flex-50% p-1 text-lg cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  id="best"
                                  value="Best,"
                                  v-model="data.addons.signoff.value"
                                />
                                <label for="best" class="ml-1">Best,</label>
                              </div>
                              <div
                                class="flex items-center flex-50% p-1 text-lg cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  id="best-wishes"
                                  value="Best Wishes,"
                                  v-model="data.addons.signoff.value"
                                />
                                <label for="best-wishes" class="ml-1"
                                  >Best Wishes,</label
                                >
                              </div>
                              <div
                                class="flex items-center flex-50% p-1 text-lg cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  id="regards"
                                  value="Regards,"
                                  v-model="data.addons.signoff.value"
                                />
                                <label for="regards" class="ml-1"
                                  >Regards,</label
                                >
                              </div>
                              <div
                                class="flex items-center flex-50% p-1 text-lg cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  id="thanks"
                                  value="Thanks,"
                                  v-model="data.addons.signoff.value"
                                />
                                <label for="thanks" class="ml-1">Thanks,</label>
                              </div>
                              <div
                                class="flex items-center flex-50% p-1 text-lg cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  id="sincerely"
                                  value="Sincerely,"
                                  v-model="data.addons.signoff.value"
                                />
                                <label for="sincerely" class="ml-1"
                                  >Sincerely,</label
                                >
                              </div>
                            </div>
                          </div>
                          <div class="styles my-5">
                            <!-- Font Family -->
                            <div
                              class="item flex items-center justify-between mb-5"
                            >
                              <label class="w-[35%]">Font Family</label>
                              <div
                                class="relative max-w-[65%] w-full"
                                ref="signoffFontMenuBar"
                              >
                                <div
                                  class="w-full bg-canvas-color flex items-center justify-between py-2 px-4 border rounded-2xl cursor-pointer"
                                  :style="{
                                    'font-family':
                                      data.addons.signoff.style.fontFamily,
                                  }"
                                  @click="toggleSignoffFontMenu()"
                                >
                                  {{ data.addons.signoff.style.fontFamily }}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 21l-12-18h24z" />
                                  </svg>
                                </div>
                                <transition name="menu">
                                  <div
                                    class="absolute top-[45px] left-0 z-30 w-full bg-white shadow border rounded-b-2xl overflow-hidden"
                                    v-if="signoffFontMenu"
                                  >
                                    <div
                                      class="py-1 px-4 border-b cursor-pointer hover:bg-canvas-color"
                                      style="font-family: Arial"
                                      @click="setSignoffFont('Arial')"
                                    >
                                      <span>Arial</span>
                                    </div>
                                    <div
                                      class="py-1 px-4 border-b cursor-pointer hover:bg-canvas-color"
                                      style="font-family: Arial Black"
                                      @click="setSignoffFont('Arial Black')"
                                    >
                                      <span>Arial Black</span>
                                    </div>
                                    <div
                                      class="py-1 px-4 border-b cursor-pointer hover:bg-canvas-color"
                                      style="font-family: cursive"
                                      @click="setSignoffFont('cursive')"
                                    >
                                      <span>Cursive</span>
                                    </div>
                                    <div
                                      class="py-1 px-4 border-b cursor-pointer hover:bg-canvas-color"
                                      style="font-family: Sans Serif"
                                      @click="setSignoffFont('Sans Serif')"
                                    >
                                      <span>Sans Serif</span>
                                    </div>
                                    <div
                                      class="py-1 px-4 border-b cursor-pointer hover:bg-canvas-color"
                                      style="font-family: Verdana"
                                      @click="setSignoffFont('Verdana')"
                                    >
                                      <span>Verdana</span>
                                    </div>
                                  </div>
                                </transition>
                              </div>
                            </div>
                            <!-- Text Color -->
                            <div class="flex items-center mb-5">
                              <span class="w-[40%]">Text Color</span>

                              <div
                                class="relative w-9 h-9 rounded-full"
                                :style="{
                                  background: data.addons.signoff.style.color,
                                }"
                              >
                                <input
                                  type="color"
                                  class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                                  v-model="data.addons.signoff.style.color"
                                />
                              </div>
                            </div>
                            <!-- Font Size -->
                            <div class="mb-5">
                              <div class="flex items-center justify-between">
                                <span>Font Size</span>
                                <span
                                  >{{
                                    data.addons.signoff.style.fontSize
                                  }}px</span
                                >
                              </div>
                              <input
                                type="range"
                                class=""
                                min="20"
                                max="50"
                                v-model="data.addons.signoff.style.fontSize"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Social -->
                    <div
                      class="rounded-3xl shadow-lg border relative overflow-hidden"
                      v-if="data.addons.social.isAdded"
                      :class="addonsDetailsVisibility.social ? 'mb-5' : 'mb-12'"
                    >
                      <div
                        class="accordion flex items-center justify-between py-4 px-5 border-b"
                        @click="showAddonDetail('social')"
                      >
                        <div class="flex items-center">
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path
                              d="M16.272 5.451c-.176-.45-.272-.939-.272-1.451 0-2.208 1.792-4 4-4s4 1.792 4 4-1.792 4-4 4c-1.339 0-2.525-.659-3.251-1.67l-7.131 3.751c.246.591.382 1.239.382 1.919 0 .681-.136 1.33-.384 1.922l7.131 3.751c.726-1.013 1.913-1.673 3.253-1.673 2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4c0-.51.096-.999.27-1.447l-7.129-3.751c-.9 1.326-2.419 2.198-4.141 2.198-2.76 0-5-2.24-5-5s2.24-5 5-5c1.723 0 3.243.873 4.143 2.201l7.129-3.75zm3.728 11.549c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm-15-9c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm15-7c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z"
                            />
                          </svg>
                          <span class="ml-3">Social</span>
                        </div>
                        <div
                          class="flex items-center justify-center cursor-pointer"
                          @click="deleteAddons('social')"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        class="overflow-hidden transition-all ease-in-out duration-300"
                        :class="
                          addonsDetailsVisibility.social
                            ? 'max-h-0'
                            : 'max-h-[500px]'
                        "
                      >
                        <div class="content py-7 px-5">
                          <div class="">
                            <div
                              class="field flex items-center justify-between mt-4 relative"
                              v-for="social in data.addons.social.items"
                              :key="social.id"
                            >
                              <div class="w-[40%] pr-1">
                                <img
                                  :src="
                                    '/icons/addons/' +
                                    social.name +
                                    '_1' +
                                    '.png'
                                  "
                                  alt=""
                                  class="w-full"
                                />
                              </div>
                              <div class="w-[60%] pl-1">
                                <input
                                  type="text"
                                  :placeholder="getUrl(social.name)"
                                  class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                                  :class="defaultTransition"
                                  v-model="social.url"
                                />
                              </div>
                              <div
                                class="flex items-center justify-center absolute right-[-16px] top-3 cursor-pointer"
                                @click="deleteSocialAddon(social.id)"
                              >
                                <svg
                                  height="16"
                                  width="16"
                                  fill="currentColor"
                                  clip-rule="evenodd"
                                  fill-rule="evenodd"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="2"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div class="icons my-6">
                            <div class="flex flex-wrap">
                              <div
                                class="max-w-[33.3333%] p-1 cursor-pointer"
                                v-for="icon in addonsSocial"
                                :key="icon.id"
                                @click="addSocialAddon(icon.name)"
                              >
                                <img
                                  :src="
                                    '/icons/addons/' + icon.name + '_1' + '.png'
                                  "
                                  class="w-full"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div class="styles my-5">
                            <!-- Height -->
                            <div class="mb-2">
                              <div class="flex items-center justify-between">
                                <span>Height</span>
                                <span
                                  >{{ data.addons.social.style.height }}px</span
                                >
                              </div>
                              <input
                                type="range"
                                class=""
                                min="20"
                                max="50"
                                v-model="data.addons.social.style.height"
                              />
                            </div>
                            <!-- Padding Top -->
                            <div class="mb-2">
                              <div class="flex items-center justify-between">
                                <span>Padding-Top</span>
                                <span
                                  >{{
                                    data.addons.social.style.paddingTop
                                  }}px</span
                                >
                              </div>
                              <input
                                type="range"
                                class=""
                                min="5"
                                max="20"
                                v-model="data.addons.social.style.paddingTop"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Video Meeting -->
                    <div
                      class="rounded-3xl shadow-lg border relative overflow-hidden"
                      v-if="data.addons.videoMeeting.isAdded"
                      :class="
                        addonsDetailsVisibility.videoMeeting ? 'mb-5' : 'mb-12'
                      "
                    >
                      <div
                        class="accordion flex items-center justify-between py-4 px-5 border-b"
                        @click="showAddonDetail('videoMeeting')"
                      >
                        <div class="flex items-center">
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path
                              d="M15 3c1.104 0 2 .896 2 2v4l7-4v14l-7-4v4c0 1.104-.896 2-2 2h-13c-1.104 0-2-.896-2-2v-14c0-1.104.896-2 2-2h13zm0 17c.552 0 1-.448 1-1v-14c0-.551-.448-1-1-1h-13c-.551 0-1 .449-1 1v14c0 .552.449 1 1 1h13zm2-9.848v3.696l6 3.429v-10.554l-6 3.429z"
                            />
                          </svg>
                          <span class="ml-3">Video Meeting</span>
                        </div>
                        <!-- Close -->
                        <div
                          class="flex items-center justify-center cursor-pointer"
                          @click="deleteAddons('videoMeeting')"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"
                            />
                          </svg>
                        </div>
                      </div>
                      <!-- Content -->
                      <div
                        class="overflow-hidden transition-all ease-in-out duration-300"
                        :class="
                          addonsDetailsVisibility.videoMeeting
                            ? 'max-h-0'
                            : 'max-h-[500px]'
                        "
                      >
                        <div class="content py-7 px-5">
                          <div class="flex flex-wrap">
                            <!-- Zoom -->
                            <div
                              class="flex flex-50% p-2"
                              @click="addVideoMeetingAddon('zoom')"
                            >
                              <div
                                class="w-full flex items-center border py-2 px-3 rounded-3xl cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M16 18c0 1.104-.896 2-2 2h-12c-1.105 0-2-.896-2-2v-12c0-1.104.895-2 2-2h12c1.104 0 2 .896 2 2v12zm8-14l-6 6.223v3.554l6 6.223v-16z"
                                  />
                                </svg>
                                <span class="ml-2">Zoom</span>
                              </div>
                            </div>
                            <!-- Skype -->
                            <div
                              class="flex flex-50% p-2"
                              @click="addVideoMeetingAddon('skype')"
                            >
                              <div
                                class="w-full flex items-center border py-2 px-3 rounded-3xl cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                  width="16"
                                  height="16"
                                >
                                  <path
                                    d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"
                                  />
                                </svg>
                                <span class="ml-2">Skype</span>
                              </div>
                            </div>
                            <!-- Google Meet -->
                            <div
                              class="flex flex-66.66% p-2"
                              @click="addVideoMeetingAddon('google-meet')"
                            >
                              <div
                                class="w-full flex items-center border py-2 px-3 rounded-3xl cursor-pointer"
                              >
                                <svg
                                  fill="#000000"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 50 50"
                                  width="16"
                                  height="16"
                                >
                                  <path
                                    d="M2 18L2 32 12 32 12 18zM39 9v4.31l-10 9V16H14V6h22C37.66 6 39 7.34 39 9zM29 27.69l10 9V41c0 1.66-1.34 3-3 3H14V34h15V27.69zM12 34v10H5c-1.657 0-3-1.343-3-3v-7H12zM12 6L12 16 2 16zM29 25L39 16 39 34zM49 9.25v31.5c0 .87-1.03 1.33-1.67.75L41 35.8V14.2l6.33-5.7C47.97 7.92 49 8.38 49 9.25z"
                                  />
                                </svg>
                                <span class="ml-2">Google Meet</span>
                              </div>
                            </div>
                          </div>

                          <!-- Button URL -->
                          <div class="flex items-center justify-between mt-4">
                            <div class="w-[35%]">
                              <span>Button Url</span>
                            </div>
                            <div class="w-[65%] pl-1">
                              <input
                                type="text"
                                placeholder="Button url goes here"
                                class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4 transition-all ease-in-out duration-350"
                                v-model="data.addons.videoMeeting.items.url"
                              />
                            </div>
                          </div>
                          <!-- Button Text -->
                          <div class="flex items-center justify-between mt-4">
                            <div class="w-[35%]">
                              <span>Button Text</span>
                            </div>
                            <div class="w-[65%] pl-1">
                              <input
                                type="text"
                                placeholder="Button text goes here"
                                class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4 transition-all ease-in-out duration-350"
                                v-model="data.addons.videoMeeting.items.text"
                              />
                            </div>
                          </div>

                          <!-- Height -->
                          <div class="mt-6 mb-2">
                            <div class="flex items-center justify-between">
                              <span>Height</span>
                              <span
                                >{{
                                  data.addons.videoMeeting.style.height
                                }}px</span
                              >
                            </div>
                            <input
                              type="range"
                              class=""
                              min="20"
                              max="50"
                              v-model="data.addons.videoMeeting.style.height"
                            />
                          </div>
                          <!-- Padding Top -->
                          <div class="mb-2">
                            <div class="flex items-center justify-between">
                              <span>Padding-Top</span>
                              <span
                                >{{
                                  data.addons.videoMeeting.style.paddingTop
                                }}px</span
                              >
                            </div>
                            <input
                              type="range"
                              class=""
                              min="5"
                              max="20"
                              v-model="
                                data.addons.videoMeeting.style.paddingTop
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- CTA -->
                    <div
                      class="mb-3 rounded-3xl shadow-lg border relative overflow-hidden"
                      v-if="data.addons.cta.isAdded"
                    >
                      <div
                        class="accordion flex items-center justify-between py-4 px-5 border-b"
                        @click="showAddonDetail('cta')"
                      >
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M13.333 6.805l4.213 7.297-13.256 3.223c-.572.133-1.068.333-1.492.604l-.227-.393c.525-.293.929-.675 1.227-.993l9.535-9.738zm.332-2.626l-11.011 11.244c-.616.66-1.164.977-1.857.977-.244 0-.507-.04-.797-.117l2.646 4.585c.258-1.094.814-1.708 2.006-1.985l15.348-3.732-6.335-10.972zm.31 13.951l-.467 2.118c-.094.378-.391.674-.77.771l-2.951.774c-.365.095-.754-.012-1.018-.28l-1.574-1.712 1.605-.395.646.77c.176.177.433.248.675.186l1.598-.425c.252-.064.449-.261.511-.512l.161-.906 1.584-.389zm8.719-11.267l-2.684 1.613-.756-1.262 2.686-1.612.754 1.261zm-4.396-1.161l-1.335-.616 1.342-2.914 1.335.617-1.342 2.913zm5.619 6.157l-3.202-.174.081-1.469 3.204.175-.083 1.468z"
                            />
                          </svg>
                          <span class="ml-3">Call To Action</span>
                        </div>
                        <!-- Close -->
                        <div
                          class="flex items-center justify-center cursor-pointer"
                          @click="deleteAddons('cta')"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"
                            />
                          </svg>
                        </div>
                      </div>
                      <!-- Content -->
                      <div
                        class="overflow-hidden transition-all ease-in-out duration-300"
                        :class="
                          addonsDetailsVisibility.cta
                            ? 'max-h-0'
                            : 'max-h-[500px]'
                        "
                      >
                        <div class="content py-7 px-5">
                          <!-- Button URL -->
                          <div class="flex items-center justify-between mt-4">
                            <div class="w-[35%]">
                              <span>Button Url</span>
                            </div>
                            <div class="w-[65%] pl-1">
                              <input
                                type="text"
                                placeholder="Button url goes here"
                                class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4 transition-all ease-in-out duration-350"
                                v-model="data.addons.cta.item.url"
                              />
                            </div>
                          </div>
                          <!-- Button Text -->
                          <div class="flex items-center justify-between mt-4">
                            <div class="w-[35%]">
                              <span>Button Text</span>
                            </div>
                            <div class="w-[65%] pl-1">
                              <input
                                type="text"
                                placeholder="Button text goes here"
                                class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4 transition-all ease-in-out duration-350"
                                v-model="data.addons.cta.item.text"
                              />
                            </div>
                          </div>
                          <!-- Padding Top -->
                          <div class="mt-6 mb-2">
                            <div class="flex items-center justify-between">
                              <span>Padding-Top</span>
                              <span
                                >{{ data.addons.cta.style.paddingTop }}px</span
                              >
                            </div>
                            <input
                              type="range"
                              class=""
                              min="5"
                              max="20"
                              v-model="data.addons.cta.style.paddingTop"
                            />
                          </div>
                          <!-- Button Color -->
                          <div class="flex items-center mb-5">
                            <span class="w-[40%]">Button Color</span>

                            <div
                              class="relative w-9 h-9 rounded-full bg-red-400 border"
                              :style="{
                                background: data.addons.cta.style.buttonColor,
                              }"
                            >
                              <input
                                type="color"
                                class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                                v-model="data.addons.cta.style.buttonColor"
                              />
                            </div>
                          </div>
                          <!-- Text Color -->
                          <div class="flex items-center mb-5">
                            <span class="w-[40%]">Text Color</span>

                            <div
                              class="relative w-9 h-9 rounded-full bg-red-400 border"
                              :style="{
                                background: data.addons.cta.style.textColor,
                              }"
                            >
                              <input
                                type="color"
                                class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                                v-model="data.addons.cta.style.textColor"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="available-addons pb-12">
                    <EditorHeadings :title="'Available Addons'" />
                    <div class="mb-2">
                      <!-- SignOff -->
                      <div class="mb-4" v-if="!data.addons.signoff.isAdded">
                        <div
                          class="accordion flex items-center py-4 px-8 rounded-3xl shadow-lg border cursor-pointer"
                          @click="addAddons('signoff')"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M13.473 9.196c-.425-.439-.401-1.127.035-1.552l4.461-4.326c.218-.211.498-.318.775-.318.282 0 .563.11.776.331l-6.047 5.865zm-7.334 11.021c-.092.089-.139.208-.139.327 0 .25.204.456.456.456.114 0 .229-.042.317-.128l.749-.729-.633-.654-.75.728zm6.33-8.425l-2.564 2.485c-1.378 1.336-2.081 2.63-2.73 4.437l1.132 1.169c1.825-.593 3.14-1.255 4.518-2.591l2.563-2.486-2.919-3.014zm7.477-7.659l-6.604 6.405 3.326 3.434 6.604-6.403c.485-.469.728-1.093.728-1.718 0-2.088-2.53-3.196-4.054-1.718zm-19.946 16.867h4v-1h-4v1z"
                            />
                          </svg>
                          <span class="ml-3">SignOff</span>
                        </div>
                      </div>
                      <!-- SignOff -->
                      <!-- v-if="!data.cta.signoff.isAdded" -->
                      <div class="mb-4">
                        <div
                          class="accordion flex items-center py-4 px-8 rounded-3xl shadow-lg border cursor-pointer"
                          @click="addAddons('signoff')"
                        >
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path
                              d="M10.052 19.001l.051.002.051.003.05.004.051.006.05.007.049.008.049.01.049.01.048.012.048.013.047.014.046.015.047.016.045.018.045.018.045.02.044.02.043.022.043.022.043.024.041.025.041.025.04.027.04.027.039.028.038.03.037.03.037.031.036.032.035.032.034.034.034.034.032.035.032.036.031.037.03.037.03.038.028.039.027.04.027.04.025.041.025.041.024.043.022.042.022.044.02.044.02.045.018.045.018.045.016.047.015.046.014.047.013.048.012.048.01.049.01.049.008.049.007.05.006.051.004.05.003.051.002.051.001.052v1h1v2h-13v-2h1v-1l.001-.052.002-.051.003-.051.004-.05.006-.051.007-.05.008-.049.01-.049.01-.049.012-.048.013-.048.014-.047.015-.046.016-.047.018-.045.018-.045.02-.045.02-.044.022-.044.022-.042.024-.043.025-.041.025-.041.027-.04.027-.04.028-.039.03-.038.03-.037.031-.037.032-.036.032-.035.034-.034.034-.034.035-.032.036-.032.037-.031.037-.03.038-.03.039-.028.04-.027.04-.027.041-.025.041-.025.043-.024.043-.022.043-.022.044-.02.045-.02.045-.018.045-.018.047-.016.046-.015.047-.014.048-.013.048-.012.049-.01.049-.01.049-.008.05-.007.051-.006.05-.004.051-.003.051-.002.052-.001h7l.052.001zm-7.039 1.999h-.013v1h7v-1h-6.987zm9.356-20.999l.05.001.05.003.049.005.049.005.049.007.049.007.048.009.048.011.048.011.047.012.047.014.046.014.046.016.046.017.045.018.045.019.044.021.044.021.043.022.043.024.042.025.041.025.041.027.041.028.039.029.039.029.039.031.038.032.037.033.036.034.036.035 4.949 4.949.035.036.034.036.033.038.032.037.031.039.03.039.029.04.027.04.027.042.026.041.024.042.024.043.022.043.022.044.02.044.019.045.018.045.017.046.016.046.015.046.013.047.012.047.012.048.01.048.009.048.007.049.007.048.005.049.005.05.003.049.001.05.001.05-.001.061-.003.061-.004.06-.006.06-.008.059-.01.058-.011.058-.013.057-.015.056-.016.056-.018.055-.019.054-.02.053-.023.053-.023.051-.025.051-.027.05-.027.05-.029.048-.031.047-.031.046-.033.046-.034.044-.036.044-.036.042-.038.041-.038.041-.04.039-.041.038-.041.037-.043.035-.044.035-.044.033-.046.032-.046.031-.047.029-.049.029-.048.027-.05.025-.05.024-.051.023-.052.021-.052.02-.053.019-.054.017-.054.016-.054.014-.056.012-.055.011-.056.009-.057.008-.057.006-.057.005-.057.003-.058.001-.058-.001-.059-.002-.058-.004-.059-.006-.059-.008-.059-.009-.059-.012-.06-.013-.059-.015-1.219 1.22 2.099 1.947 1.696 1.57 1.33 1.229 1.003.924.714.656.463.424.249.227.075.068.05.051.049.052.047.053.045.054.045.055.042.056.041.056.04.057.038.058.037.059.035.059.034.06.032.061.031.061.028.062.028.063.026.063.024.064.023.064.02.065.02.065.018.066.016.066.014.067.013.067.011.067.009.068.008.067.006.069.005.068.002.069.001.069-.001.073-.003.072-.005.072-.006.071-.009.071-.011.07-.012.07-.014.069-.016.069-.017.068-.02.068-.021.066-.022.067-.025.065-.026.065-.027.064-.029.063-.031.062-.032.061-.034.061-.035.06-.036.059-.038.057-.04.057-.041.056-.042.055-.043.054-.045.052-.046.052-.047.05-.049.05-.05.048-.05.047-.052.045-.054.045-.054.043-.055.042-.057.04-.057.039-.058.038-.06.036-.06.035-.061.034-.063.031-.063.031-.063.028-.065.028-.066.025-.066.024-.067.023-.068.02-.068.019-.069.017-.07.016-.071.013-.071.012-.071.01-.073.008-.072.006-.074.005-.073.002h-.074l-.075-.001-.075-.004-.063-.005-.062-.006-.062-.007-.062-.009-.062-.011-.061-.012-.061-.013-.061-.015-.06-.017-.06-.018-.06-.019-.059-.021-.059-.022-.059-.024-.058-.025-.058-.026-.057-.028-.057-.03-.056-.031-.056-.032-.056-.033-.055-.035-.054-.037-.054-.037-.054-.039-.053-.041-.052-.042-.052-.043-.051-.044-.051-.046-.05-.047-.049-.049-.042-.044-.075-.082-.241-.269-.349-.392-.437-.495-1.071-1.216-1.213-1.38-1.213-1.381-1.068-1.218-1.133-1.292-1.313 1.312.015.061.013.061.011.061.009.06.007.061.006.06.003.059.002.06.001.059-.002.059-.003.058-.005.058-.006.058-.009.057-.009.056-.012.056-.012.056-.015.055-.016.054-.017.054-.019.053-.02.052-.022.052-.023.051-.025.05-.026.049-.027.049-.028.048-.03.046-.031.047-.032.045-.034.044-.035.043-.035.042-.037.042-.039.04-.039.039-.04.038-.041.037-.043.036-.043.035-.045.033-.045.033-.046.031-.047.029-.048.029-.049.027-.05.026-.051.024-.051.023-.053.022-.053.02-.053.019-.055.017-.055.016-.056.014-.056.013-.057.011-.058.009-.058.008-.059.006-.059.004-.06.003-.06.001-.05-.001-.05-.002-.05-.003-.05-.004-.049-.005-.049-.007-.048-.008-.049-.009-.048-.01-.047-.011-.047-.013-.047-.014-.047-.014-.046-.016-.045-.017-.045-.018-.045-.019-.044-.021-.044-.021-.043-.022-.043-.024-.042-.025-.041-.025-.041-.027-.041-.028-.039-.029-.04-.029-.038-.031-.038-.032-.037-.033-.036-.034-.036-.035-4.949-4.948-.004-.004-.035-.036-.033-.036-.033-.038-.032-.038-.031-.038-.029-.039-.029-.04-.028-.041-.026-.041-.026-.041-.024-.042-.023-.043-.023-.043-.021-.043-.02-.045-.019-.044-.018-.045-.017-.046-.015-.045-.015-.047-.013-.046-.013-.047-.011-.048-.01-.047-.009-.048-.008-.049-.006-.048-.005-.049-.005-.049-.003-.05-.001-.049-.001-.05.001-.05.001-.049.003-.05.004-.049.006-.049.006-.049.008-.048.009-.048.01-.048.011-.047.012-.047.014-.047.014-.047.016-.046.017-.045.018-.045.019-.045.02-.044.021-.044.023-.043.023-.043.025-.042.025-.042.027-.041.028-.04.029-.04.029-.04.031-.038.032-.038.033-.038.034-.036.035-.036.051-.049.052-.047.054-.045.054-.042.055-.041.056-.038.058-.036.058-.034.058-.032.06-.029.06-.028.061-.025.061-.023.062-.021.062-.019.063-.017.063-.015.063-.013.063-.01.064-.009.064-.006.063-.005.064-.002.064-.001.063.002.064.004.063.005.063.008.063.009.062.012.062.013.061.016 5.679-5.679-.016-.062-.013-.063-.012-.063-.01-.063-.007-.064-.006-.064-.003-.064-.002-.064.001-.064.003-.064.004-.064.007-.063.009-.064.011-.063.013-.063.015-.063.017-.063.019-.062.021-.061.023-.061.025-.06.028-.06.029-.059.032-.058.033-.057.036-.057.038-.055.04-.055.042-.053.044-.053.046-.051.048-.05.036-.035.036-.034.037-.033.038-.032.039-.031.039-.03.04-.029.04-.028.041-.027.042-.025.042-.025.043-.024.043-.022.044-.022.044-.02.045-.019.045-.018.046-.017.046-.016.046-.015.047-.013.047-.013.048-.011.048-.01.048-.009.049-.008.049-.007.049-.005.049-.005.05-.003.05-.001.05-.001.05.001zm-5.349 8.712l3.536 3.537 1.773-1.774 1.107 1.211 2.532 2.775 1.432 1.57 1.345 1.478.594.654.518.571.421.466.308.343.028.032.029.032.031.031.033.029.034.029.035.027.037.026.038.024.038.023.04.02.04.018.041.016.041.013.042.01.021.004.021.003.021.002.021.002.027.001.026.001.025-.001.025-.001.024-.003.024-.002.024-.004.023-.004.044-.011.041-.012.04-.015.037-.016.035-.017.033-.018.03-.019.029-.019.025-.019.024-.019.021-.018.018-.017.029-.028.027-.029.026-.031.023-.031.023-.032.02-.033.018-.034.017-.035.015-.035.013-.035.011-.037.009-.036.008-.037.005-.037.003-.038.001-.037-.001-.038-.003-.039-.005-.038-.007-.037-.009-.037-.011-.037-.014-.037-.015-.036-.016-.035-.019-.035-.021-.034-.022-.034-.025-.034-.026-.032-.028-.033-.03-.031-.078-.07-.041-.034-.024-.02-.016-.015-.189-.174-.217-.202-.242-.226-.265-.25-.591-.559-.656-.625-.705-.674-.735-.705-.748-.719-.744-.717-1.405-1.356-1.177-1.138-1.11-1.076 1.634-1.635-3.537-3.536-3.882 3.884zm-1.415 1.415l-1.411.003-.001.001 4.947 4.946.001-1.413-3.535-3.537h-.001zm6.714-6.716l-.002.003 3.536 3.536.002-.002 1.412-.002-4.948-4.948v1.413z"
                            />
                          </svg>
                          <span class="ml-3">Disclaimer</span>
                        </div>
                      </div>
                      <!-- Social -->
                      <div class="mb-4" v-if="!data.addons.social.isAdded">
                        <div
                          class="accordion flex items-center py-4 px-8 rounded-3xl shadow-lg border cursor-pointer"
                          @click="addAddons('social')"
                        >
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path
                              d="M16.272 5.451c-.176-.45-.272-.939-.272-1.451 0-2.208 1.792-4 4-4s4 1.792 4 4-1.792 4-4 4c-1.339 0-2.525-.659-3.251-1.67l-7.131 3.751c.246.591.382 1.239.382 1.919 0 .681-.136 1.33-.384 1.922l7.131 3.751c.726-1.013 1.913-1.673 3.253-1.673 2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4c0-.51.096-.999.27-1.447l-7.129-3.751c-.9 1.326-2.419 2.198-4.141 2.198-2.76 0-5-2.24-5-5s2.24-5 5-5c1.723 0 3.243.873 4.143 2.201l7.129-3.75zm3.728 11.549c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm-15-9c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm15-7c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z"
                            />
                          </svg>
                          <span class="ml-3">Social</span>
                        </div>
                      </div>
                      <!-- Video Meeting -->
                      <div
                        class="mb-4"
                        v-if="!data.addons.videoMeeting.isAdded"
                      >
                        <div
                          class="accordion flex items-center justify-between py-4 px-8 rounded-3xl shadow-lg border cursor-pointer"
                          @click="addAddons('videoMeeting')"
                        >
                          <div class="flex items-center">
                            <svg
                              width="24"
                              height="24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            >
                              <path
                                d="M15 3c1.104 0 2 .896 2 2v4l7-4v14l-7-4v4c0 1.104-.896 2-2 2h-13c-1.104 0-2-.896-2-2v-14c0-1.104.896-2 2-2h13zm0 17c.552 0 1-.448 1-1v-14c0-.551-.448-1-1-1h-13c-.551 0-1 .449-1 1v14c0 .552.449 1 1 1h13zm2-9.848v3.696l6 3.429v-10.554l-6 3.429z"
                              />
                            </svg>

                            <span class="ml-3">Video Meeting</span>
                          </div>
                          <div
                            class="relative bg-primary-color text-white font-semibold py-1 px-2 rounded-3xl"
                          >
                            PRO
                          </div>
                        </div>
                      </div>
                      <div class="mb-3" v-if="!data.addons.cta.isAdded">
                        <div
                          class="accordion flex items-center py-4 px-8 rounded-3xl shadow-xl border cursor-pointer"
                          @click="addAddons('cta')"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M13.333 6.805l4.213 7.297-13.256 3.223c-.572.133-1.068.333-1.492.604l-.227-.393c.525-.293.929-.675 1.227-.993l9.535-9.738zm.332-2.626l-11.011 11.244c-.616.66-1.164.977-1.857.977-.244 0-.507-.04-.797-.117l2.646 4.585c.258-1.094.814-1.708 2.006-1.985l15.348-3.732-6.335-10.972zm.31 13.951l-.467 2.118c-.094.378-.391.674-.77.771l-2.951.774c-.365.095-.754-.012-1.018-.28l-1.574-1.712 1.605-.395.646.77c.176.177.433.248.675.186l1.598-.425c.252-.064.449-.261.511-.512l.161-.906 1.584-.389zm8.719-11.267l-2.684 1.613-.756-1.262 2.686-1.612.754 1.261zm-4.396-1.161l-1.335-.616 1.342-2.914 1.335.617-1.342 2.913zm5.619 6.157l-3.202-.174.081-1.469 3.204.175-.083 1.468z"
                            />
                          </svg>
                          <span class="ml-3">Call To Action</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- DESIGN -->
                <div class="design pb-14" v-if="currentEditorNav === 'design'">
                  <!-- Layout -->
                  <div class="layout pb-7 border-b">
                    <EditorHeadings :title="'Layout'" />
                    <!-- Font Family -->
                    <div class="item flex items-center justify-between mb-5">
                      <label>Font Family</label>
                      <div
                        class="relative max-w-[60%] w-full"
                        ref="fontMenuBar"
                      >
                        <div
                          class="w-full bg-canvas-color flex items-center justify-between py-2 px-4 border rounded-2xl cursor-pointer"
                          :style="{
                            'font-family': data.design.layout.fontFamily,
                          }"
                          @click="toggleFontMenu"
                        >
                          {{ data.design.layout.fontFamily }}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21l-12-18h24z" />
                          </svg>
                        </div>
                        <transition name="menu">
                          <div
                            class="absolute top-[45px] left-0 z-30 w-full bg-white shadow border rounded-b-2xl overflow-hidden"
                            v-if="fontMenu"
                          >
                            <div
                              class="py-1 px-4 border-b cursor-pointer hover:bg-canvas-color"
                              style="font-family: Arial"
                              @click="setFont('Arial')"
                            >
                              <span>Arial</span>
                            </div>
                            <div
                              class="py-1 px-4 border-b cursor-pointer hover:bg-canvas-color"
                              style="font-family: Arial Black"
                              @click="setFont('Arial Black')"
                            >
                              <span>Arial Black</span>
                            </div>
                            <div
                              class="py-1 px-4 border-b cursor-pointer hover:bg-canvas-color"
                              style="font-family: cursive"
                              @click="setFont('cursive')"
                            >
                              <span>Cursive</span>
                            </div>
                            <div
                              class="py-1 px-4 border-b cursor-pointer hover:bg-canvas-color"
                              style="font-family: Sans Serif"
                              @click="setFont('Sans Serif')"
                            >
                              <span>Sans Serif</span>
                            </div>
                            <div
                              class="py-1 px-4 border-b cursor-pointer hover:bg-canvas-color"
                              style="font-family: Verdana"
                              @click="setFont('Verdana')"
                            >
                              <span>Verdana</span>
                            </div>
                          </div>
                        </transition>
                      </div>
                    </div>
                    <!-- Text Color -->
                    <div class="flex items-center mb-5">
                      <span class="w-[40%]">Text Color</span>

                      <div
                        class="relative w-9 h-9 rounded-full bg-red-400 border"
                        :style="{ background: data.design.layout.textColor }"
                      >
                        <input
                          type="color"
                          class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                          v-model="data.design.layout.textColor"
                        />
                      </div>
                    </div>
                    <!-- Template Color -->
                    <div class="flex items-center mb-5">
                      <span class="w-[40%]">Template Color</span>

                      <div
                        class="relative w-9 h-9 rounded-full bg-red-400 border"
                        :style="{
                          background: data.design.layout.templateColor,
                        }"
                      >
                        <input
                          type="color"
                          class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                          v-model="data.design.layout.templateColor"
                        />
                      </div>
                    </div>
                    <!-- Font Size -->
                    <div class="mb-5">
                      <div class="flex items-center justify-between">
                        <span>Font Size</span>
                        <span>{{ data.design.layout.fontSize }}px</span>
                      </div>
                      <input
                        type="range"
                        class=""
                        min="14"
                        max="32"
                        v-model="data.design.layout.fontSize"
                      />
                    </div>
                  </div>
                  <!-- Image -->
                  <div class="image mt-10 pb-6">
                    <EditorHeadings :title="'Image'" />
                    <!-- Image Width -->
                    <div class="mb-5">
                      <div class="flex items-center justify-between">
                        <span>Image Width</span>
                        <span>{{ data.design.image.width }}px</span>
                      </div>
                      <input
                        type="range"
                        class=""
                        min="50"
                        max="200"
                        v-model="data.design.image.width"
                      />
                    </div>
                    <!-- Image Shape -->
                    <div class="mb-5">
                      <div class="flex items-center justify-between">
                        <span>Image Shape</span>
                        <span>{{ data.design.image.roundness }}%</span>
                      </div>
                      <input
                        type="range"
                        class=""
                        min="0"
                        max="50"
                        step="5"
                        v-model="data.design.image.roundness"
                      />
                    </div>
                  </div>
                  <!-- Social Icon -->
                  <div class="social-icon mt-10 pb-6">
                    <EditorHeadings :title="'Social Icon'" />

                    <!-- Icon Width -->
                    <div class="mb-5">
                      <div class="flex items-center justify-between">
                        <span>Icon Size</span>
                        <span>{{ data.design.socialIcon.size }}px</span>
                      </div>
                      <input
                        type="range"
                        class=""
                        min="25"
                        max="35"
                        v-model="data.design.socialIcon.size"
                      />
                    </div>
                    <!-- Icon Shape -->
                    <div class="mb-5">
                      <div class="flex items-center justify-between">
                        <span>Icon Shape</span>
                        <span>{{ data.design.socialIcon.roundness }}%</span>
                      </div>
                      <input
                        type="range"
                        class=""
                        min="0"
                        max="50"
                        step="25"
                        v-model="data.design.socialIcon.roundness"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <main class="w-full h-screen justify-between flex flex-col">
          <div class="">
            <div
              class="h-[45px] w-full bg-white shadow-lg border-b flex items-center px-6"
            >
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
              <div class="controls ml-4 flex items-center">
                <div class="undo cursor-pointer" title="Undo" @click="undo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c-3.31 0-6.291 1.353-8.459 3.522l-2.48-2.48-1.061 7.341 7.437-.966-2.489-2.488c1.808-1.808 4.299-2.929 7.052-2.929 5.514 0 10 4.486 10 10s-4.486 10-10 10c-3.872 0-7.229-2.216-8.89-5.443l-1.717 1.046c2.012 3.803 6.005 6.397 10.607 6.397 6.627 0 12-5.373 12-12s-5.373-12-12-12z"
                    />
                  </svg>
                </div>
                <div
                  class="redo ml-2 cursor-pointer"
                  title="Redo"
                  @click="redo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c3.31 0 6.291 1.353 8.459 3.522l2.48-2.48 1.061 7.341-7.437-.966 2.489-2.489c-1.808-1.807-4.299-2.928-7.052-2.928-5.514 0-10 4.486-10 10s4.486 10 10 10c3.872 0 7.229-2.216 8.89-5.443l1.717 1.046c-2.012 3.803-6.005 6.397-10.607 6.397-6.627 0-12-5.373-12-12s5.373-12 12-12z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="relative overflow-y-auto px-5">
            <EditorPreview :data="data" />
          </div>
          <div class="">
            <div
              class="h-[50px] w-full flex items-center justify-end px-6 bg-white shadow-2xl border-t"
            >
              <div class="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
    <div
      class="image-modal fixed top-0 left-0 w-full h-full bg-[#ffffff83] backdrop-blur"
      v-if="imageModal"
    >
      <div
        class="h-full w-full py-8 px-6 overflow-y-scroll flex items-center justify-center"
      >
        <div
          class="bg-white m-auto pt-5 pb-10 px-6 rounded-3xl shadow-lg border relative"
        >
          <div class="flex items-center justify-between pb-4">
            <h1 class="text-xl font-medium">Image Preview</h1>
            <div
              class="flex items-center cursor-pointer"
              @click="toggleImageModal()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"
                />
              </svg>
            </div>
          </div>
          <div class="image-preview">
            <div class="img" v-if="previewImage">
              <img :src="previewImage" alt="" />
            </div>
            <div class="controls flex items-center justify-between pt-12 pb-2">
              <div
                class="relative overflow-hidden py-1 px-3 bg-primary-color text-white text-lg rounded-3xl border-2 border-primary-color hover:text-primary-color hover:bg-white cursor-pointer transition-all ease-in-out duration-30"
              >
                Choose New Image
                <input
                  type="file"
                  accept="image/*"
                  @change="readImage"
                  class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div class="">
                <div
                  class="py-1 px-4 border-2 border-primary-color text-primary-color text-lg rounded-3xl hover:text-white hover:bg-primary-color cursor-pointer transition-all ease-in-out duration-300"
                  @click="setImage"
                >
                  Use Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <span>
    {{ name }}
    {{ data }}
  </span> -->
</template>

<style scoped>
/* Menu Animation */
.menu-enter-active,
.menu-leave-active {
  transition: transform 0.3s ease;
  transform-origin: top left;
}

.menu-enter-from,
.menu-leave-to {
  transform: scale(0);
}

/* Menu Animation */
.section-enter-active,
.section-leave-active {
  transition: transform 0.3s ease;
  /* transform-origin: top left; */
}

.section-enter-from,
.section-leave-to {
  transform: translateY(77);
  opacity: 0;
}

.editor-tools::-webkit-scrollbar {
  width: 10px;
}

.editor-tools::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.editor-tools::-webkit-scrollbar-thumb {
  background-color: rgb(206, 206, 206);
  outline: 1px solid rgb(184, 194, 204);
}
</style>
