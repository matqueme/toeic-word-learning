<template>
  <div
    class="rounded-lg border border-(--custom-brown)/20 bg-white/40 p-6 shadow-md"
  >
    <h2 class="mb-4 text-2xl font-semibold text-(--custom-green-dark)">
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
          class="custom-checkbox h-5 w-5 rounded border-2 border-(--custom-brown)/40 bg-white/80 text-(--custom-green) hover:cursor-pointer hover:border-(--custom-green)"
        />
        <label
          :for="category.id"
          class="ml-2 text-(--custom-green-dark) hover:cursor-pointer"
        >
          {{ index + 1 }}. {{ category.nameFr }} <br />
          <span
            class="text-sm text-(--custom-brown) italic hover:cursor-pointer"
          >
            ({{ category.nameEn }})
          </span>
        </label>
      </div>
    </div>

    <div class="mt-6 text-right">
      <button
        @click="next"
        class="rounded-lg bg-(--custom-green) px-6 py-2 font-bold text-white hover:cursor-pointer hover:bg-(--custom-green-dark) disabled:opacity-50"
        :disabled="selected.length === 0"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
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

<style scoped>
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  background-color: white;
}

.custom-checkbox:checked {
  background-color: var(--custom-green);
  border-color: var(--custom-green);
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}

.custom-checkbox:hover {
  border-color: var(--custom-green);
}

.custom-checkbox:checked:hover {
  background-color: var(--custom-green-dark);
}
</style>
