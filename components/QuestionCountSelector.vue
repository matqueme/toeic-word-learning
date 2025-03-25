<template>
  <div class="rounded-lg bg-white p-6 shadow-md">
    <h2 class="mb-4 text-2xl font-semibold">Étape 2: Combien de questions?</h2>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <button
        v-for="count in [5, 10, 20, 30]"
        :key="count"
        @click="selectCount(count)"
        class="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-center font-semibold transition duration-150 hover:bg-blue-100"
      >
        {{ count }} questions
      </button>
      <button
        @click="selectCount(0)"
        class="col-span-2 rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-center font-semibold transition duration-150 hover:bg-blue-100 md:col-span-4"
      >
        Toutes les questions
      </button>
    </div>

    <div class="mt-6 flex justify-between">
      <button
        @click="prev"
        class="rounded-lg bg-gray-500 px-6 py-2 font-bold text-white hover:bg-gray-600"
      >
        Précédent
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'prev'): void;
  (e: 'next'): void;
}>();

const selectCount = (count: number) => {
  emit('update:modelValue', count);
  emit('next');
};

const prev = () => {
  emit('prev');
};
</script>
