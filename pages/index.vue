<template>
  <main
    role="main"
    class="flex min-h-screen min-w-screen flex-col items-center justify-center bg-(--custom-light) px-4 py-8"
  >
    <div class="max-w-4xl">
      <h1
        class="mb-8 text-center text-3xl font-bold text-(--custom-brown-dark)"
      >
        Apprentissage de vocabulaire TOEIC
      </h1>

      <CategorySelector
        v-if="currentStep === 1"
        v-model="selectedCategories"
        :categories="availableCategories"
        @next="nextStep"
      />

      <QuestionCountSelector
        v-if="currentStep === 2"
        v-model="questionCount"
        @prev="prevStep"
        @next="nextStep"
      />

      <GameModeSelector
        v-if="currentStep === 3"
        v-model="translationDirection"
        @prev="prevStep"
        @start="startGame"
      />

      <GameQuestion
        v-if="currentStep === 4"
        :questions="gameQuestions"
        :current-index="currentQuestionIndex"
        :score="score"
        :answer-options="currentAnswerOptions"
        :show-feedback="showFeedback"
        :is-correct="isCorrect"
        :correct-answer="correctAnswer"
        :selected-answer="selectedAnswer"
        @update:current-index="currentQuestionIndex = $event"
        @update:score="score = $event"
        @answer="checkAnswer"
        @next="nextQuestion"
        @results="showResults"
        @reset="resetGame"
      />

      <GameResults
        v-if="currentStep === 5"
        :score="score"
        :total="gameQuestions.length"
        @reset="resetGame"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CategorySelector from '@/components/CategorySelector.vue';
import QuestionCountSelector from '@/components/QuestionCountSelector.vue';
import GameModeSelector from '@/components/GameModeSelector.vue';
import GameQuestion from '@/components/GameQuestion.vue';
import GameResults from '@/components/GameResults.vue';
import type { Word, Category } from '../types/types';

// État de l'application
const currentStep = ref(1);
const availableCategories = ref<Category[]>([]);
const selectedCategories = ref<string[]>([]);
const questionCount = ref(10);
const translationDirection = ref('en-fr'); // 'en-fr', 'fr-en', 'mixed'

// État du jeu
const gameQuestions = ref<Word[]>([]);
const currentQuestionIndex = ref(0);
const score = ref(0);
const showFeedback = ref(false);
const selectedAnswer = ref<string | null>(null);
const isCorrect = ref(false);
const correctAnswer = ref<string | null>(null);
const currentAnswerOptions = ref<string[]>([]);

// Charger les catégories au démarrage
onMounted(async () => {
  const modules = import.meta.glob('@/assets/listWords/*.json');
  const allCategories: Category[] = [];

  for (const path in modules) {
    const module = (await modules[path]()) as {
      default: { categories: Category[] };
    };
    if (module.default && module.default.categories) {
      allCategories.push(...module.default.categories);
    }
  }

  availableCategories.value = allCategories;
});

// Méthodes
const nextStep = () => {
  currentStep.value++;
};

const prevStep = () => {
  currentStep.value--;
};

const startGame = async () => {
  // Récupérer tous les mots des catégories sélectionnées
  let allWords: Word[] = [];

  for (const categoryId of selectedCategories.value) {
    const category = availableCategories.value.find((c) => c.id === categoryId);
    if (category) {
      allWords = [...allWords, ...category.words];
    }
  }

  // Mélanger et sélectionner le nombre de questions demandé
  const shuffled = [...allWords];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Sélectionner soit le nombre demandé, soit toutes les questions si questionCount est 0
  let selectedWords =
    questionCount.value === 0
      ? shuffled
      : shuffled.slice(0, questionCount.value);

  // Préparation des questions avec la direction de traduction
  gameQuestions.value = selectedWords.map((word) => {
    // Si mélangé, déterminer aléatoirement la direction pour chaque question
    const isFromEnglish =
      translationDirection.value === 'mixed'
        ? Math.random() > 0.5
        : translationDirection.value === 'en-fr';

    return {
      ...word,
      _isFromEnglish: isFromEnglish,
    };
  });

  currentQuestionIndex.value = 0;
  score.value = 0;
  showFeedback.value = false;
  loadCurrentQuestion();
  nextStep();
};

const loadCurrentQuestion = () => {
  if (currentQuestionIndex.value >= gameQuestions.value.length) return;

  const question = gameQuestions.value[currentQuestionIndex.value];
  showFeedback.value = false;
  selectedAnswer.value = null;

  // Déterminer les options de réponses
  const fromEnglish = question._isFromEnglish;
  const targetLanguage = fromEnglish ? 'fr' : 'en';

  correctAnswer.value = question[targetLanguage].word;

  // Récupérer les réponses incorrectes du mot actuel
  const wrongAnswers = question[targetLanguage].otherAnswers || [];

  // Créer un tableau avec toutes les options (correcte + incorrectes)
  let options = [correctAnswer.value, ...wrongAnswers];

  // Mélanger les options
  currentAnswerOptions.value = options.sort(() => 0.5 - Math.random());
};

const checkAnswer = (option: string) => {
  if (showFeedback.value) return; // Éviter de répondre plusieurs fois

  selectedAnswer.value = option;
  isCorrect.value = option === correctAnswer.value;

  if (isCorrect.value) {
    score.value++;
  }

  showFeedback.value = true;
};

const nextQuestion = () => {
  currentQuestionIndex.value++;
  loadCurrentQuestion();
};

const showResults = () => {
  currentStep.value = 5;
};

const resetGame = () => {
  currentStep.value = 1;
  selectedCategories.value = [];
  gameQuestions.value = [];
};
</script>
