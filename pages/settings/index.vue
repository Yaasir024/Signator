<template>
    <section
      class="bg-white text-lg h-screen overflow-hidden"
    >
      <Navbar />
      <div class="h-full overflow-hidden">
        <div class="h-full flex">
          <SidebarSetting />
          <div class=" h-full w-full ">
            <div class="overflow-y-scroll min-h-screen px-12">
              <div class="py-6">
                <h1 class="text-4xl font-semibold">Account Settings</h1>
                <p class="">View and Update your account details and profiles.</p>
              </div>
              <div class="bg-white shadow-2xl h-24 w-full">
                <div class="bg-red-200 px-4 py-6">
                  <h2>Basic Information</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>