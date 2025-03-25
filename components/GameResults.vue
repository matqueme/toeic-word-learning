<template>
  <div
    class="rounded-lg border border-(--custom-brown)/20 bg-white p-6 shadow-md"
  >
    <h2 class="text-(--custom-brown)-dark mb-4 text-2xl font-semibold">
      Résultats
    </h2>

    <div class="mb-6">
      <div class="mb-2 text-center text-4xl font-bold text-(--custom-brown)">
        {{ score }}/{{ total }}
      </div>
      <div class="text-center text-xl text-gray-600">{{ percentage }}%</div>
    </div>

    <button
      @click="reset"
      class="w-full rounded-lg bg-(--custom-brown) px-6 py-3 font-bold text-white hover:bg-(--custom-brown-dark)"
    >
      Nouvelle partie
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from 'vue';

const props = defineProps<{
  score: number;
  total: number;
}>();

const emit = defineEmits<{
  (e: 'reset'): void;
}>();

const percentage = computed(() => {
  return Math.round((props.score / props.total) * 100);
});

const reset = () => {
  emit('reset');
};
</script>
