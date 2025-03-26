<template>
  <div
    class="rounded-lg border border-(--custom-brown)/20 bg-white/40 p-6 shadow-md"
  >
    <h2 class="mb-4 text-2xl font-semibold text-(--custom-green-dark)">
      Étape 3: Mode de jeu
    </h2>
    <p class="mb-4 text-(--custom-brown-dark)">
      Choisissez le mode de jeu:
      <span class="text-sm text-gray-600 italic">
        <br />(Anglais → Français = mots anglais, réponses en français)
        <br />(Français → Anglais = mots français, réponses en anglais)
        <br />(Mélangé = mots anglais et français, réponses en anglais et
        français)
      </span>
    </p>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <button
        @click="selectMode('en-fr')"
        class="rounded-lg border border-(--custom-brown-light)/40 bg-(--custom-light) px-4 py-4 text-center font-semibold text-(--custom-green-dark) transition duration-150 hover:cursor-pointer hover:border-(--custom-brown) hover:bg-(--custom-brown-light)/30"
      >
        Anglais → Français
      </button>
      <button
        @click="selectMode('fr-en')"
        class="rounded-lg border border-(--custom-brown-light)/40 bg-(--custom-light) px-4 py-4 text-center font-semibold text-(--custom-green-dark) transition duration-150 hover:cursor-pointer hover:border-(--custom-brown) hover:bg-(--custom-brown-light)/30"
      >
        Français → Anglais
      </button>
      <button
        @click="selectMode('mixed')"
        class="rounded-lg border border-(--custom-brown-light)/40 bg-(--custom-light) px-4 py-4 text-center font-semibold text-(--custom-green-dark) transition duration-150 hover:cursor-pointer hover:border-(--custom-brown) hover:bg-(--custom-brown-light)/30"
      >
        Mélangé
      </button>
    </div>

    <div class="mt-6 flex flex-wrap justify-between gap-2">
      <button
        @click="prev"
        class="rounded-lg bg-(--custom-brown) px-6 py-2 font-bold text-white hover:cursor-pointer hover:bg-(--custom-brown-light)"
      >
        Précédent
      </button>
      <button
        @click="skipWithDefault"
        class="rounded-lg bg-(--custom-green) px-6 py-2 font-bold text-white hover:cursor-pointer hover:bg-(--custom-green-dark)"
      >
        Continuer avec Français → Anglais
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'prev'): void;
  (e: 'start'): void;
}>();

const selectMode = (mode: string) => {
  emit('update:modelValue', mode);
  emit('start');
};

const skipWithDefault = () => {
  // Vous pouvez changer 'en-fr' par le mode par défaut que vous préférez
  const defaultMode = 'en-fr';
  emit('update:modelValue', defaultMode);
  emit('start');
};

const prev = () => {
  emit('prev');
};
</script>
