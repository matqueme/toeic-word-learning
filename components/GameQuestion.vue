<template>
  <div class="rounded-lg bg-white p-6 shadow-md">
    <div class="mb-4 flex justify-between">
      <div class="text-gray-600">
        Question {{ currentIndex + 1 }}/{{ totalQuestions }}
      </div>
      <div class="font-semibold">
        Score: {{ score }}/{{ answeredQuestions }}
      </div>
    </div>

    <div class="mb-8" v-if="currentQuestion">
      <div class="mb-1 text-gray-600">
        {{ isFromEnglish ? 'Anglais' : 'Français' }}:
      </div>
      <div class="mb-4 text-2xl font-bold">
        {{ displayWord }}
      </div>

      <div class="mb-4">
        <div class="mb-1 text-gray-600">Choisissez la traduction correcte:</div>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            v-for="(option, index) in answerOptions"
            :key="index"
            @click="selectAnswer(option)"
            class="rounded-lg border border-gray-300 bg-white px-4 py-3 text-left transition duration-150 hover:bg-gray-100"
            :class="{
              'border-green-500 bg-green-50':
                showFeedback && option === correctAnswer,
              'border-red-500 bg-red-50':
                showFeedback &&
                selectedAnswer === option &&
                option !== correctAnswer,
            }"
          >
            {{ option.charAt(0).toUpperCase() + option.slice(1) }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showFeedback" class="mb-4">
      <div v-if="isCorrect" class="rounded-lg bg-green-100 p-3 text-green-800">
        Bonne réponse!
      </div>
      <div v-else class="rounded-lg bg-red-100 p-3 text-red-800">
        Incorrect. La bonne réponse était:
        {{
          correctAnswer
            ? correctAnswer.charAt(0).toUpperCase() + correctAnswer.slice(1)
            : ''
        }}
      </div>
    </div>

    <div class="mt-6 flex justify-between">
      <button
        @click="confirmReset"
        class="rounded-lg bg-gray-500 px-6 py-2 font-bold text-white hover:bg-gray-600"
      >
        Nouvelle partie
      </button>
      <button
        v-if="showFeedback && !isLastQuestion"
        @click="next"
        class="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
      >
        Question suivante
      </button>
      <button
        v-if="showFeedback && isLastQuestion"
        @click="showResults"
        class="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
      >
        Voir les résultats
      </button>
    </div>

    <!-- Modal de confirmation pour nouvelle partie -->
    <div
      v-if="showResetConfirmation"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm"
    >
      <div class="max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 class="mb-4 text-xl font-bold">Recommencer la partie ?</h3>
        <p class="mb-6 text-gray-600">
          Êtes-vous sûr de vouloir recommencer ? Votre progression actuelle sera
          perdue.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showResetConfirmation = false"
            class="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="confirmAndReset"
            class="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Recommencer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue';
import type { Word } from '../types/types';

const props = defineProps<{
  questions: Word[];
  currentIndex: number;
  score: number;
  answerOptions: string[];
  showFeedback: boolean;
  isCorrect: boolean;
  correctAnswer: string | null;
  selectedAnswer: string | null;
}>();

const showResetConfirmation = ref(false);

const emit = defineEmits<{
  (e: 'update:currentIndex', index: number): void;
  (e: 'update:score', score: number): void;
  (e: 'answer', answer: string): void;
  (e: 'next'): void;
  (e: 'results'): void;
  (e: 'reset'): void;
}>();

const displayWord = computed(() => {
  if (!currentQuestion.value) return '';
  const word = isFromEnglish.value
    ? currentQuestion.value.en.word
    : currentQuestion.value.fr.word;
  return word.charAt(0).toUpperCase() + word.slice(1);
});

const currentQuestion = computed(
  () => props.questions[props.currentIndex] || null
);

const isFromEnglish = computed(() => {
  return currentQuestion.value ? currentQuestion.value._isFromEnglish : true;
});

const totalQuestions = computed(() => props.questions.length);

const isLastQuestion = computed(
  () => props.currentIndex >= totalQuestions.value - 1
);

const confirmReset = () => {
  showResetConfirmation.value = true;
};

const confirmAndReset = () => {
  showResetConfirmation.value = false;
  emit('reset');
};

const answeredQuestions = computed(() => {
  return props.showFeedback ? props.currentIndex + 1 : props.currentIndex;
});

const selectAnswer = (option: string) => {
  if (props.showFeedback) return;
  emit('answer', option);
};

const next = () => {
  emit('next');
};

const showResults = () => {
  emit('results');
};
</script>
