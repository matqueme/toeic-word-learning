<template>
  <div class="rounded-lg bg-white p-6 shadow-md">
    <h2 class="text-(--custom-mauve)-dark mb-4 text-2xl font-semibold">
      Étape 1: Choisissez les catégories
    </h2>

    <div
      class="grid grid-cols-1 gap-4 hover:cursor-pointer md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="(category, index) in categories"
        :key="category.id"
        class="flex items-center hover:cursor-pointer"
      >
        <input
          type="checkbox"
          :id="category.id"
          v-model="selected"
          :value="category.id"
          class="h-5 w-5 rounded border-(--custom-mauve)/50 text-(--custom-mauve) hover:cursor-pointer focus:ring-(--custom-mauve)"
        />
        <label
          :for="category.id"
          class="ml-2 text-gray-700 hover:cursor-pointer"
        >
          {{ index + 1 }}. {{ category.nameFr }} <br />
          <span class="text-sm text-gray-500 italic hover:cursor-pointer">
            ({{ category.nameEn }})
          </span>
        </label>
      </div>
    </div>

    <div class="mt-6 text-right">
      <button
        @click="next"
        class="rounded-lg bg-(--custom-mauve) px-6 py-2 font-bold text-white hover:cursor-pointer hover:bg-(--custom-mauve-dark) disabled:opacity-50"
        :disabled="selected.length === 0"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';
import type { Category } from '../types/types';

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
