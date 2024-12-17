<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-500">404</h1>
      <p class="mt-4 text-2xl">Page Not Found</p>
      <p class="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <nuxt-link
        to="/"
        class="inline-block px-4 py-2 mt-6 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Go Back Home
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
