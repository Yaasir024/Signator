<script setup>
const { defaultTransition, editorNavActive, editorNav } = useTailwindConfig();
const { uid } = useGenerateUid();
const { socialIcons, addonsSocial, getUrl } = useEditorIcons();

// Change Editor Route
const currentEditorNav = ref("general");
const setNavValue = (value) => {
  currentEditorNav.value = value;
};

const data = reactive({
  image: {
    imgSrc: "",
    url: "",
  },
  name: "",
  position: "",
  department: "",
  company: "",
  contactInfo: [],
  socialInfo: [],
  addons: {
    id: [],
    social: {
      isAdded: false,
      items: [],
      style: {
        height: 22,
        paddingTop: 10,
      },
    },
    videoMeeting: {
      isAdded: false,
      items: {
        name: "zoom",
        text: "Meet me on ",
        url: "",
      },
      style: {
        height: 22,
        paddingTop: 10,
      },
    },
    cta: {
      isAdded: false,
      item: {
        text: "",
        url: "",
      },
      style: {
        paddingTop: 10,
        textColor: "#ffffff",
        buttonColor: "#1A0E71",
      },
    },
  },
  design: {
    layout: {
      fontFamily: "Arial",
      fontSize: 16,
      textColor: "#000000",
      templateColor: "#000000",
    },
    image: {
      width: 120,
      roundness: 0,
    },
    socialIcon: {
      size: 27,
      roundness: 0,
    },
  },
});

const socialSearchQuery = ref("");

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

// Add New Contact Item
const addNewContactItem = () => {
  data.contactInfo.push({
    id: uid(6),
    field: "",
    value: "",
  });
};
// Delete Contact Item
const deleteContanctItem = (id) => {
  data.contactInfo = data.contactInfo.filter((item) => item.id != id);
};

// Add New Social Item
const addNewSocialItem = (social) => {
  if (!data.socialInfo.some((e) => e.name === social)) {
    data.socialInfo.push({
      id: uid(6),
      name: social,
      url: "",
    });
    socialSearchQuery.value = "";
  }
};

// Delete Social Item
const deleteSocialItem = (id) => {
  data.socialInfo = data.socialInfo.filter((item) => item.id != id);
};

const addAddons = (addon) => {
  data.addons[addon].isAdded = true;

  console.log(data.addons);
};
const deleteAddons = (addon) => {
  data.addons[addon].isAdded = false;

  console.log(data.addons);
};
const checkAddons = () => {
  return (
    data.addons.social.isAdded ||
    data.addons.videoMeeting.isAdded ||
    data.addons.cta.isAdded
  );
};

/*  SOCIAL ADDON  */
// Add Social Addon
const addSocialAddon = (social) => {
  if (!data.addons.social.items.some((e) => e.name === social)) {
    data.addons.social.items.push({
      id: uid(6),
      name: social,
      url: "",
    });
  }
};
// Delete Social Addon
const deleteSocialAddon = (id) => {
  data.addons.social.items = data.addons.social.items.filter(
    (item) => item.id != id
  );
};

/* VIDEO MEETING ADDON */
// Add video meeting
const addVideoMeetingAddon = (name) => {
  data.addons.videoMeeting.items.name = name;
};

/* FONT MENU BAR */
// Font Menu
const fontMenu = ref(false);
// Toggle Font Menu
const toggleFontMenu = () => {
  fontMenu.value = !fontMenu.value;
};
// Set Font
const setFont = (font) => {
  data.design.layout.fontFamily = font;
  fontMenu.value = false;
};
// On Click Outside
const fontMenuBar = ref(null);
useClickOutside(fontMenuBar, () => {
  fontMenu.value = false;
});

// Add image
const previewImage = (event) => {
  let input = event.target;
  let image = input.files[0];
  if (input.files) {
    let reader = new FileReader();
    reader.onload = (e) => {
      data.image.imgSrc = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
};
// Remove Image
const clearImage = () => {
  data.image.imgSrc = "";
};
</script>

<template>
  <div class="min-h-screen bg-canvas-color">
    <Navbar />
    <main class="pt-16 pb-24">
      <section class="max-w-[1280px] mx-auto px-6">
        <div class="editor flex">
          <div class="flex-1 pr-8">
            <EditorPreview :data="data" />
          </div>
          <div class="flex-475px">
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
                <div class="general" v-if="currentEditorNav === 'general'">
                  <div class="content max-w-[400px] mx-auto">
                    <div class="wrapper image-section flex items-end pb-3">
                      <div
                        class="image-preview w-[40%] text-secondary-color relative"
                      >
                        <div
                          class="relative flex flex-col items-center py-10 border border-dashed overflow-hidden"
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
                            @change="previewImage"
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
                      <div class="w-[60%] pl-2 mb-4">
                        <input
                          type="text"
                          placeholder="Add Link"
                          class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                          :class="defaultTransition"
                        />
                      </div>
                    </div>
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
                          class="field flex space-between mt-4 relative"
                          v-for="item in data.contactInfo"
                          :key="item.id"
                        >
                          <div class="w-[50%] pr-1">
                            <input
                              type="text"
                              placeholder="Field"
                              class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                              :class="defaultTransition"
                              v-model="item.field"
                            />
                          </div>
                          <div class="w-[50%] pl-1">
                            <input
                              type="text"
                              class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                              :class="defaultTransition"
                              v-model="item.value"
                            />
                          </div>
                          <div
                            class="flex items-center justify-center absolute right-[-20px] top-3 cursor-pointer"
                            @click="deleteContanctItem(item.id)"
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
                <div class="social" v-if="currentEditorNav === 'social'">
                  <div class="my-3 mb-10" v-if="data.socialInfo.length >= 1">
                    <div
                      class="field flex items-center justify-between mt-4 relative"
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
                        class="flex items-center justify-center absolute right-[-20px] top-3 cursor-pointer"
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
                <div class="addons" v-if="currentEditorNav === 'addons'">
                  <div class="border-b pb-7 mb-10" v-if="checkAddons()">
                    <EditorHeadings :title="'Added Addons'" />
                    <div
                      class="mb-12 rounded-3xl shadow-2xl relative"
                      v-if="data.addons.social.isAdded"
                    >
                      <div
                        class="accordion flex items-center py-4 px-5 border-b"
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
                      <div class="content py-7 px-8">
                        <div class="">
                          <div
                            class="field flex items-center justify-between mt-4 relative"
                            v-for="social in data.addons.social.items"
                            :key="social.id"
                          >
                            <div class="max-w-[120px]">
                              <img
                                :src="
                                  '/icons/addons/' + social.name + '_1' + '.png'
                                "
                                alt=""
                                class="w-full"
                              />
                            </div>
                            <div class="w-[55%] pl-1">
                              <input
                                type="text"
                                :placeholder="getUrl(social.name)"
                                class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4"
                                :class="defaultTransition"
                                v-model="social.url"
                              />
                            </div>
                            <div
                              class="flex items-center justify-center absolute right-[-20px] top-3 cursor-pointer"
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
                      <div
                        class="flex items-center justify-center absolute right-[-20px] top-3 cursor-pointer"
                        @click="deleteAddons('social')"
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
                    <!-- Video Meeting -->
                    <div
                      class="mb-3 rounded-3xl shadow-2xl relative"
                      v-if="data.addons.videoMeeting.isAdded"
                    >
                      <div
                        class="accordion flex items-center py-4 px-5 border-b"
                      >
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
                      <div class="content py-7 px-8">
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
                          <!-- Google Meet -->
                          <div
                            class="flex flex-50% p-2"
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
                        </div>

                        <!-- Button URL -->
                        <div class="flex items-center justify-between mt-4">
                          <div class="">
                            <span>Button Url</span>
                          </div>
                          <div class="w-[60%] pl-1">
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
                          <div class="">
                            <span>Button Text</span>
                          </div>
                          <div class="w-[60%] pl-1">
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
                            v-model="data.addons.videoMeeting.style.paddingTop"
                          />
                        </div>
                      </div>
                      <!-- Close Button -->
                      <div
                        class="flex items-center justify-center absolute right-[-20px] top-3 cursor-pointer"
                        @click="deleteAddons('videoMeeting')"
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
                    <!-- CTA -->
                    <div
                      class="mb-3 rounded-3xl shadow-2xl relative"
                      v-if="data.addons.cta.isAdded"
                    >
                      <div
                        class="accordion flex items-center py-4 px-5 border-b"
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
                      <div class="content py-7 px-8">
                        <!-- Button URL -->
                        <div class="flex items-center justify-between mt-4">
                          <div class="">
                            <span>Button Url</span>
                          </div>
                          <div class="w-[60%] pl-1">
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
                          <div class="">
                            <span>Button Text</span>
                          </div>
                          <div class="w-[60%] pl-1">
                            <input
                              type="text"
                              placeholder="Button text goes here"
                              class="text-sm w-full bg-canvas-color rounded-2xl border outline-none focus:border-primary-color focus:bg-white overflow-hidden py-2 px-4 transition-all ease-in-out duration-350"
                              v-model="data.addons.cta.item.text"
                            />
                          </div>
                        </div>
                        <!-- Padding Top -->
                        <div class="mt-4 mb-2">
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
                      <!-- Close Button -->
                      <div
                        class="flex items-center justify-center absolute right-[-20px] top-3 cursor-pointer"
                        @click="deleteAddons('cta')"
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
                  <div class="available-addons">
                    <EditorHeadings :title="'Available Addons'" />
                    <div class="mb-2">
                      <div class="mb-3" v-if="!data.addons.social.isAdded">
                        <div
                          class="accordion flex items-center py-4 px-8 rounded-3xl shadow-xl cursor-pointer"
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
                      <div class="mb-3" v-if="!data.addons.cta.isAdded">
                        <div
                          class="accordion flex items-center py-4 px-8 rounded-3xl shadow-xl cursor-pointer"
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
                      <div
                        class="mb-3"
                        v-if="!data.addons.videoMeeting.isAdded"
                      >
                        <div
                          class="accordion flex items-center justify-between py-4 px-8 rounded-3xl shadow-xl cursor-pointer"
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
                          <div class="relative">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"
                              />
                            </svg>
                            <div
                              class="absolute top-[30px] right-[-60px] min-w-[220px] py-2 px-3 bg-canvas-color"
                            >
                              Upgrage to use PRO Features
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="design" v-if="currentEditorNav === 'design'">
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
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.social-icon img {
  height: 16px;
  width: 16px;
  fill: red;
}

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
</style>
