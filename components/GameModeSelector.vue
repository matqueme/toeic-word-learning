<template>
  <div class="rounded-lg bg-white p-6 shadow-md">
    <h2 class="text-(--custom-mauve)-dark mb-4 text-2xl font-semibold">
      Étape 3: Mode de jeu
    </h2>
    <p class="mb-4 text-gray-600">
      Choisissez le mode de jeu:
      <span class="text-sm text-gray-500 italic">
        <br />(Anglais → Français = mots anglais, réponses en français)
        <br />(Français → Anglais = mots français, réponses en anglais)
        <br />(Mélangé = mots anglais et français, réponses en anglais et
        français)
      </span>
    </p>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <button
        @click="selectMode('en-fr')"
        class="rounded-lg border border-(--custom-mauve)/30 bg-(--custom-mauve-lighter) px-4 py-4 text-center font-semibold transition duration-150 hover:cursor-pointer hover:bg-(--custom-mauve-light) hover:text-white"
      >
        Anglais → Français
      </button>
      <button
        @click="selectMode('fr-en')"
        class="rounded-lg border border-(--custom-mauve)/30 bg-(--custom-mauve-lighter) px-4 py-4 text-center font-semibold transition duration-150 hover:cursor-pointer hover:bg-(--custom-mauve-light) hover:text-white"
      >
        Français → Anglais
      </button>
      <button
        @click="selectMode('mixed')"
        class="rounded-lg border border-(--custom-mauve)/30 bg-(--custom-mauve-lighter) px-4 py-4 text-center font-semibold transition duration-150 hover:cursor-pointer hover:bg-(--custom-mauve-light) hover:text-white"
      >
        Mélangé
      </button>
    </div>

    <div class="mt-6 flex justify-between">
      <button
        @click="prev"
        class="rounded-lg bg-(--custom-teal) px-6 py-2 font-bold text-white hover:cursor-pointer hover:bg-(--custom-teal-dark)"
      >
        Précédent
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'prev'): void;
  (e: 'start'): void;
}>();

const selectMode = (mode: string) => {
  emit('update:modelValue', mode);
  emit('start');
};

const prev = () => {
  emit('prev');
};
</script>
