<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>

<script setup lang="ts">
import { useHead } from '#imports';

useHead({
  title: 'Nuxt template',
  meta: [{ name: 'description', content: 'My awesome Nuxt.js project' }],
  htmlAttrs: {
    lang: 'fr',
    dir: 'ltr',
  },
});
</script>
