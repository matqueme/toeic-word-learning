<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-500">404</h1>
      <p class="mt-4 text-2xl">Page Not Found</p>
      <p class="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <nuxt-link
        to="/"
        class="mt-6 inline-block rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Go Back Home
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';

useHead({
  title: '404 - Page Not Found',
  meta: [
    {
      name: 'description',
      content: 'Sorry, the page you are looking for does not exist.',
    },
  ],
});
</script>
