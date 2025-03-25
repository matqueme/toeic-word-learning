<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>

<script setup lang="ts">
import { useHead } from '#imports';

useHead({
  title: 'Toeic Quiz',
  meta: [
    {
      name: 'description',
      content: 'Quiz pour réviser le vocabulaire du TOEIC',
    },
  ],
  htmlAttrs: {
    lang: 'fr',
    dir: 'ltr',
  },
});
</script>
