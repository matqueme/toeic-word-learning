<template>
  <div class="example">
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const message = ref('Hello, this is an example component!');
</script>
