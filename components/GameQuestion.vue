<template>
  <div class="rounded-lg bg-white p-6 shadow-md">
    <div class="mb-4 flex justify-between">
      <div class="text-gray-600">
        Question {{ currentIndex + 1 }}/{{ totalQuestions }}
      </div>
      <div class="font-semibold">Score: {{ score }}/{{ currentIndex }}</div>
    </div>

    <div class="mb-8" v-if="currentQuestion">
      <div class="mb-1 text-gray-600">
        {{ isFromEnglish ? 'Anglais' : 'Français' }}:
      </div>
      <div class="mb-4 text-2xl font-bold">
        {{ isFromEnglish ? currentQuestion.en.word : currentQuestion.fr.word }}
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
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showFeedback" class="mb-4">
      <div v-if="isCorrect" class="rounded-lg bg-green-100 p-3 text-green-800">
        Bonne réponse!
      </div>
      <div v-else class="rounded-lg bg-red-100 p-3 text-red-800">
        Incorrect. La bonne réponse était: {{ correctAnswer }}
      </div>
    </div>

    <div class="mt-6 flex justify-between">
      <button
        @click="reset"
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
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from 'vue';
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

const emit = defineEmits<{
  (e: 'update:currentIndex', index: number): void;
  (e: 'update:score', score: number): void;
  (e: 'answer', answer: string): void;
  (e: 'next'): void;
  (e: 'results'): void;
  (e: 'reset'): void;
}>();

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

const reset = () => {
  emit('reset');
};
</script>
