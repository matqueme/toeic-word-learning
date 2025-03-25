<template>
  <div
    class="rounded-lg border border-(--custom-brown)/20 bg-white/40 p-6 shadow-md"
  >
    <div class="mb-4 flex justify-between">
      <div class="font-medium text-(--custom-green-dark)">
        Question {{ currentIndex + 1 }}/{{ totalQuestions }}
      </div>
      <div class="font-semibold text-(--custom-green-dark)">
        Score: {{ score }}/{{ answeredQuestions }}
      </div>
    </div>

    <div class="mb-8" v-if="currentQuestion">
      <div class="mb-1 font-medium text-(--custom-brown)">
        {{ isFromEnglish ? 'Anglais' : 'Français' }}:
      </div>
      <div class="mb-4 text-2xl font-bold text-(--custom-green-dark)">
        {{ displayWord }}
      </div>

      <div class="mb-4">
        <div class="mb-2 font-medium text-(--custom-brown)">
          Choisissez la traduction correcte:
        </div>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            v-for="(option, index) in answerOptions"
            :key="index"
            @click="selectAnswer(option)"
            class="rounded-lg border border-(--custom-brown-light)/40 bg-(--custom-light) px-4 py-3 text-left text-(--custom-green-dark) transition duration-150"
            :class="{
              'border-2 border-(--custom-green) bg-(--custom-green-dark) text-(--custom-green-dark)':
                showFeedback && option === correctAnswer,
              'border-2 border-red-500/50 bg-red-50':
                showFeedback &&
                selectedAnswer === option &&
                option !== correctAnswer,
              'hover:cursor-pointer hover:border-(--custom-brown) hover:bg-(--custom-brown-light)/30':
                !showFeedback,
            }"
          >
            {{ option.charAt(0).toUpperCase() + option.slice(1) }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showFeedback" class="mb-4">
      <div
        v-if="isCorrect"
        class="rounded-lg border border-(--custom-green)/60 bg-(--custom-green)/20 p-3 text-(--custom-green-dark)"
      >
        Bonne réponse!
      </div>
      <div
        v-else
        class="rounded-lg border border-red-500/60 bg-red-500/20 p-3 text-red-500"
      >
        Incorrect. La bonne réponse était:
        {{
          correctAnswer
            ? correctAnswer.charAt(0).toUpperCase() + correctAnswer.slice(1)
            : ''
        }}
      </div>
    </div>

    <div class="mt-6 flex justify-between gap-4">
      <button
        @click="confirmReset"
        class="rounded-lg bg-(--custom-brown) px-6 py-2 font-bold text-white hover:cursor-pointer hover:bg-(--custom-brown-light)"
      >
        Nouvelle partie
      </button>
      <button
        v-if="showFeedback && !isLastQuestion"
        @click="next"
        class="rounded-lg bg-(--custom-green) px-6 py-2 font-bold text-white hover:cursor-pointer hover:bg-(--custom-green-dark)"
      >
        Question suivante
      </button>
      <button
        v-if="showFeedback && isLastQuestion"
        @click="showResults"
        class="rounded-lg bg-(--custom-green) px-6 py-2 font-bold text-(--custom-green-dark) hover:cursor-pointer hover:bg-(--custom-brown-light)"
      >
        Voir les résultats
      </button>
    </div>
    <!-- Modal de confirmation pour nouvelle partie -->
    <div
      v-if="showResetConfirmation"
      class="fixed inset-0 z-50 flex items-center justify-center bg-(--custom-green-dark)/40 backdrop-blur-sm"
    >
      <div class="max-w-md rounded-lg bg-(--custom-light) p-6 shadow-xl">
        <h3 class="mb-4 text-xl font-bold text-(--custom-green-dark)">
          Recommencer la partie ?
        </h3>
        <p class="mb-6 text-(--custom-brown-dark)">
          Êtes-vous sûr de vouloir recommencer ? Votre progression actuelle sera
          perdue.
        </p>
        <div class="flex justify-end gap-4">
          <button
            @click="showResetConfirmation = false"
            class="rounded-lg border border-(--custom-brown-light) bg-(--custom-light) px-4 py-2 font-medium text-(--custom-green-dark) hover:cursor-pointer hover:bg-(--custom-brown-light)/20"
          >
            Annuler
          </button>
          <button
            @click="confirmAndReset"
            class="rounded-lg bg-(--custom-brown) px-4 py-2 font-medium text-white hover:cursor-pointer hover:bg-(--custom-brown-light)"
          >
            Recommencer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
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
