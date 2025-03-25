<template>
  <div class="rounded-lg bg-white p-6 shadow-md">
    <h2 class="mb-4 text-2xl font-semibold">
      Étape 1: Choisissez les catégories
    </h2>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex items-center"
      >
        <input
          type="checkbox"
          :id="category.id"
          v-model="selected"
          :value="category.id"
          class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label :for="category.id" class="ml-2 text-gray-700">
          {{ category.nameFr }} <br />({{ category.nameEn }})
        </label>
      </div>
    </div>

    <div class="mt-6 text-right">
      <button
        @click="next"
        class="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        :disabled="selected.length === 0"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { Category } from '@/types';

const props = defineProps<{
  categories: Category[];
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'next'): void;
}>();

const selected = ref<string[]>([...props.modelValue]);

watch(selected, (newValue) => {
  emit('update:modelValue', newValue);
});

const next = () => {
  emit('next');
};
</script>
