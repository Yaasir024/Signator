<template>
    <div class="pt-[15vh]">
      <div class="form-wrapper max-w-[350px] mx-auto">
        <form @submit.prevent class="flex flex-col w-full">
          <h1 class="text-center text-sk-dark-100 text-3xl font-semibold mb-4">
            Log In
          </h1>
          <input
            type="email"
            placeholder="Email"
            class="h-12 px-2 mb-4 border-2 border-sk-dark-100 rounded-md text-lg outline-secondary-color"
          />
          <input
            type="password"
            placeholder="Password"
            class="h-12 px-2 mb-5 border-2 border-sk-dark-100 rounded-md text-lg outline-secondary-color"
          />
          <button
            class="py-3 px-5 text-white text-lg font-medium bg-sk-dark-100 rounded-lg transition-all duration-300 ease-in-out hover:-translate-y-1"
          >
            Log in
          </button>
        </form>
        <p
          class="cursor-pointer text-primary-color text-center text-lg leading-160 tracking-0.01 mt-3"
        >
          Forgot Password?
        </p>
        <p
          class="text-sk-dark-100 text-center text-lg leading-160 tracking-0.01 mt-5"
        >
          No account?
          <nuxt-link to="#" class="text-primary-color"
            >Create One</nuxt-link
          >
        </p>
      </div>
    </div>
  </template>
  