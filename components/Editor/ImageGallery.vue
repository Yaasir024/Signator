<script>
    // Cropper
const cropImg = ref(null);

const imageModal = ref(false);
const toggleImageModal = () => {
  imageModal.value = !imageModal.value;
};
const imageModalPath = ref("upload");
    const imageLibrary = ref([
  {
    id: "08edrb",
    imgSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    imgName: "Anos.jpeg",
    imgSize: 31809,
    dateCreated: "Saturday, October 1, 2022",
    timeCreated: "8:48:38 PM",
  },
]);
onMounted(() => {
  console.log("Mounted");
});
const getImgData = (event) => {
  let input = event.target;
  let image = input.files[0];
  let imgData = {
    id: uid(6),
    imgSrc: "",
    imgName: image.name,
    imgSize: image.size,
    dateCreated: getDate(),
    timeCreated: getTime(),
  };

  if (input.files) {
    let reader = new FileReader();
    reader.onload = (e) => {
      imgData.imgSrc = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
  updateImgData(imgData);
  // console.log(input.files[0])
};
const updateImgData = (data) => {
  console.log(data);
  imageLibrary.value.push(data);
  // setTimeout(() => {
  //   setLibraryData(imageLibrary.value);
  //   imageModalPath.value = 'library'
  // }, 500);
};

const setLibraryData = (data) => {
  console.log(imageLibrary.value);
  localStorage.setItem("imagesLibrary", JSON.stringify(data));
};
const getImageData = () => {
  imageLibrary.value = JSON.parse(localStorage.getItem("imagesLibrary"));
};
const selectedImg = ref(null);
const setImage = () => {
  console.log(selectedImg.value);
  data.value.image.imgSrc = selectedImg.value.imgSrc;
  imageModal.value = false;
};
</script>

<template>
    <div
      class="modal fixed top-[40px] right-[40px] bottom-[40px] left-[40px] rounded-3xl shadow-2xl bg-canvas-color overflow-hidden z-40 flex flex-col"
      v-if="imageModal"
    >
      <div class="header pt-4 px-8 bg-white border-b">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-semibold">Select Image</h1>
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
        <div class="">
          <button
            class="py-2 px-3 transition-all ease-in-out duration-300"
            @click="imageModalPath = 'library'"
            :class="imageModalPath === 'library' ? 'bg-canvas-color' : ''"
          >
            Image Library
          </button>
          <button
            class="py-2 px-3 transition-all ease-in-out duration-300"
            @click="imageModalPath = 'upload'"
            :class="imageModalPath === 'upload' ? 'bg-canvas-color' : ''"
          >
            Upload File
          </button>
        </div>
      </div>
      <div class="content h-full">
        <div
          class="selection-section h-full p-5"
          v-if="imageModalPath == 'upload'"
        >
          <div class="flex items-center justify-center h-full">
            <!-- v-if="!data.image.imgSrc" -->
            <div class="image-select flex flex-col items-center relative">
              <h1 class="text-2xl font-medium">Drop Image Here</h1>
              <span class="text-xl mt-1">or</span>
              <button class="py-1 px-2 border-2 flex items-center">
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
                <span class="ml-2">Select File</span>
              </button>
              <input
                type="file"
                accept="image/*"
                @change="getImgData"
                class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <!-- <div class="flex items-center justify-center py-4 h-[90%]">
            <div class="flex flex-col items-center h-full">
              <div class="img-container max-h-[70%] h-full">
                <img
                  :src="data.image.imgSrc"
                  ref="cropImg"
                  class="w-full h-full"
                />
              </div>
              <div class="controls max-h-[30%] h-full py-5 px-5">
                I am A control
              </div>
            </div>
          </div> -->
        </div>
        <div class="h-full" v-if="imageModalPath == 'library'">
          <div class="h-full px-4 py-3 pb-[55px] overflow-y-auto">
            <div
              class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-20 max-w-[1290px] mx-auto"
            >
              <div
                class="p-2 max-h-[160px]"
                v-for="img in imageLibrary"
                :key="img.id"
              >
                <div
                  class="w-full h-full border-2 overflow-hidden"
                  @click="selectedImg = img"
                  :class="selectedImg === img ? 'border-primary-color' : ''"
                >
                  <img
                    :src="img.imgSrc"
                    alt=""
                    class="w-full h-full object-cover cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="h-[50px] bg-white w-full absolute bottom-0 px-8 flex items-center justify-end"
      >
        <button
          class="bg-primary-color text-white py-1 px-2 rounded-3xl"
          @click="setImage()"
        >
          Set as Image
        </button>
      </div>
    </div>
    <div
              class="bg-canvas-color flex flex-col items-center justify-center w-full py-4 px-4 rounded-2xl h-[160px]"
            >
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="45" width="45" viewBox="0 0 640 512"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/></svg>
              </div>
              <h1 class="text-xl font-medium">Upload Image</h1>
            </div>
</template>