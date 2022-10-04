<template>
  <div class="min-h-screen bg-canvas-color">
    <Navbar />
    <main class="py-20">
      <section class="max-w-[1280px] mx-auto px-5">
        <div
          class="wrapper bg-white shadow-lg border rounded-xl pt-8 pb-12 px-7"
        >
          <div class="flex justify-center flex-wrap mt-10">
            <div
              class="card relative m-2 w-[350px] py-8 px-6 bg-white shadow-lg border rounded-3xl"
            >
              <div
                class="price-tag absolute top-[-16px] right-[24px] pt-4 text-white bg-primary-color w-[60px] h-[88px] text-center"
              >
                <div class="text-lg font-medium"><span class="text-sm">$</span>0</div>
                <span class="text-sm">/month</span>
              </div>
              <div class="text-2xl font-semibold">Free</div>
              <ul>
                <li class="flex items-center">
                  <div class="flex items-center text-primary-color mr-2">
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path
                        d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"
                      />
                    </svg>
                  </div>
                  <p class="text-base">1 Signature</p>
                </li>
                <li class="flex items-center">
                  <div class="flex items-center text-primary-color mr-2">
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path
                        d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"
                      />
                    </svg>
                  </div>
                  <p class="text-base">1 Signature</p>
                </li>
                <li class="flex items-center">
                  <div class="flex items-center text-primary-color mr-2">
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path
                        d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"
                      />
                    </svg>
                  </div>
                  <p class="text-base">1 Signature</p>
                </li>
                <li class="flex items-center">
                  <div class="flex items-center text-primary-color mr-2">
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path
                        d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"
                      />
                    </svg>
                  </div>
                  <p class="text-base">1 Signature</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.price-tag:before {
    content: '';
    position: absolute;
  width: 14px;
  height: 16px;
  background-color: #87ceeb;
  top: 0;
  left: -14px;
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
}
.price-tag:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 14px;
    background-color: #ffffff;
    left: 0;
    bottom: -1px;
    clip-path: polygon(0 100%, 50% 0, 100% 100%);
}
</style>
