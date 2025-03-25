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
        ref="correctFeedback"
        class="rounded-lg border border-green-600/60 bg-green-600/20 p-3 text-green-800"
      >
        Bonne réponse!
      </div>
      <div
        v-else
        ref="incorrectFeedback"
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
import { computed, ref, watch } from 'vue';
import type { Word } from '../types/types';
import gsap from 'gsap';

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

const correctFeedback = ref(null);
const incorrectFeedback = ref(null);

// Observer les changements de showFeedback pour déclencher les animations
watch(
  () => props.showFeedback,
  (newValue) => {
    if (newValue) {
      // Animation déclenchée lorsque le feedback est affiché
      if (props.isCorrect) {
        animateCorrectAnswer();
      } else {
        animateIncorrectAnswer();
      }

      // Animer aussi le bouton approprié
      animateAnswerButton();
    }
  }
);
watch(
  () => props.currentIndex,
  () => {
    // Réinitialiser les styles des boutons quand on change de question
    resetButtonStyles();
  }
);

// Fonction pour réinitialiser les styles des boutons
const resetButtonStyles = () => {
  // Sélectionner tous les boutons
  const buttons = document.querySelectorAll('.grid button');

  buttons.forEach((button) => {
    // Réinitialiser tous les styles d'animation
    gsap.to(button, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      x: 0,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
      duration: 0.1,
      clearProps: 'all', // Ceci est crucial pour nettoyer toutes les propriétés GSAP
    });
  });
};

// Animation pour une réponse correcte
const animateCorrectAnswer = () => {
  if (correctFeedback.value) {
    gsap.fromTo(
      correctFeedback.value,
      { opacity: 0, y: 40, scale: 0.7 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1.2, 0.5)',
      }
    );
  }
};

// Animation pour une réponse incorrecte
const animateIncorrectAnswer = () => {
  if (incorrectFeedback.value) {
    gsap.fromTo(
      incorrectFeedback.value,
      { opacity: 0, y: 40, scale: 0.7 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1.2, 0.5)',
      }
    );
  }
};

// Animation pour mettre en évidence les boutons de réponse
const animateAnswerButton = () => {
  // Sélectionner tous les boutons
  const buttons = document.querySelectorAll('.grid button');

  buttons.forEach((button) => {
    const buttonText = button.textContent?.trim().toLowerCase();
    const isCorrectButton = buttonText === props.correctAnswer?.toLowerCase();
    const isSelectedButton = buttonText === props.selectedAnswer?.toLowerCase();

    if (isCorrectButton) {
      // Animation pour la bonne réponse - rotation plus prononcée
      gsap.to(button, {
        keyframes: {
          rotate: [0, -6, 6, -6, 6, -3, 3, 0],
        },
        duration: 0.8,
        ease: 'power1.inOut',
        delay: 0.1,
      });

      // Effet de pulsation plus prononcé pour la bonne réponse
      gsap.fromTo(
        button,
        { scale: 1 },
        {
          scale: 1.1,
          duration: 0.4,
          repeat: 1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: 0.1,
        }
      );

      // Ajout d'un flash lumineux (box-shadow)
      gsap.fromTo(
        button,
        { boxShadow: '0 0 0 rgba(34, 197, 94, 0)' },
        {
          boxShadow: '0 0 30px rgba(34, 197, 94, 0.9)',
          duration: 0.4,
          repeat: 1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: 0.1,
        }
      );
    } else if (isSelectedButton && !isCorrectButton) {
      // Animation de secousse plus forte pour la mauvaise réponse
      gsap.fromTo(
        button,
        { x: 0 },
        {
          keyframes: {
            x: [0, -12, 12, -12, 12, -8, 8, -4, 4, 0],
          },
          duration: 0.4,
          ease: 'power1.inOut',
        }
      );

      // Ajout d'un effet de flash rouge
      gsap.fromTo(
        button,
        { boxShadow: '0 0 0 rgba(239, 68, 68, 0)' },
        {
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.8)',
          duration: 0.4,
          repeat: 1,
          yoyo: true,
          ease: 'power2.inOut',
        }
      );
    } else {
      // Animation plus prononcée pour les autres boutons
      gsap.to(button, {
        opacity: 0.5,
        scale: 0.9,
        duration: 0.4,
        delay: 0.1,
      });
    }
  });
};

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
