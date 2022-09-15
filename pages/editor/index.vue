<template>
  <div class="min-h-screen bg-canvas-color">
    <Navbar />
    <main class="mt-8">
      <section class="max-w-[1280px] mx-auto px-6">
        <div class="editor flex">
          <div class="flex-50% min-h[500px] ">left</div>
          <div class="flex-50%">
            <div class="bg-white shadow-lg rounded-2xl overflow-hidden">
              <ul class="nav flex flex-row border-b text-center">
                <li
                  class="px-5 py-3 flex-1 cursor-pointer text-lg font-semibold capitalize border-r"
                >
                  General
                </li>
                <li
                  class="px-5 py-3 flex-1 cursor-pointer text-lg font-semibold capitalize border-r"
                >
                  Social
                </li>
                <li
                  class="px-5 py-3 flex-1 cursor-pointer text-lg font-semibold capitalize border-r"
                >
                  Addons
                </li>
                <li
                  class="px-5 py-3 flex-1 cursor-pointer text-lg font-semibold capitalize"
                >
                  Design
                </li>
              </ul>
              <div class="main px-10 pt-10 pb-12">
                <div class="general">
                    <div class="content max-w-[400px] mx-auto">
                        <div class="wrapper pb-3">
                            <div class="form-item">
                                <label >Name</label>
                                <input type="text">
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
