<template>
  <div
    class="rounded-lg border border-(--custom-brown)/20 bg-white/40 p-6 shadow-md"
  >
    <h2 class="text-(--custom-brown)-dark mb-4 text-2xl font-semibold">
      Étape 2: Combien de questions?
    </h2>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <button
        v-for="count in [5, 10, 20, 30]"
        :key="count"
        @click="selectCount(count)"
        class="rounded-lg border border-(--custom-brown-light)/40 bg-(--custom-light) px-4 py-3 text-center font-semibold text-(--custom-green-dark) transition duration-150 hover:cursor-pointer hover:border-(--custom-brown) hover:bg-(--custom-brown-light)/30"
      >
        {{ count }} questions
      </button>
      <button
        @click="selectCount(0)"
        class="col-span-2 rounded-lg border border-(--custom-brown-light)/40 bg-(--custom-light) px-4 py-3 text-center font-semibold text-(--custom-green-dark) transition duration-150 hover:cursor-pointer hover:border-(--custom-brown) hover:bg-(--custom-brown-light)/30 md:col-span-4"
      >
        Toutes les questions
      </button>
    </div>

    <div class="mt-6 flex justify-between">
      <button
        @click="prev"
        class="rounded-lg bg-(--custom-brown) px-6 py-2 font-bold text-white hover:cursor-pointer hover:bg-(--custom-brown-light)"
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
