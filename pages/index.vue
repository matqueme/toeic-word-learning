<template>
  <main role="main" class="container mx-auto max-w-4xl px-4 py-8">
    <h1 class="mb-8 text-center text-3xl font-bold">
      Apprentissage de vocabulaire TOEIC
    </h1>

    <!-- Étape 1: Sélection des catégories -->
    <div v-if="currentStep === 1" class="rounded-lg bg-white p-6 shadow-md">
      <h2 class="mb-4 text-2xl font-semibold">
        Étape 1: Choisissez les catégories
      </h2>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="category in availableCategories"
          :key="category.id"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :id="category.id"
            v-model="selectedCategories"
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
          @click="nextStep"
          class="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
          :disabled="selectedCategories.length === 0"
        >
          Suivant
        </button>
      </div>
    </div>

    <!-- Étape 2: Nombre de questions -->
    <div v-if="currentStep === 2" class="rounded-lg bg-white p-6 shadow-md">
      <h2 class="mb-4 text-2xl font-semibold">
        Étape 2: Combien de questions?
      </h2>

      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <button
          v-for="count in [5, 10, 20, 30]"
          :key="count"
          @click="
            questionCount = count;
            nextStep();
          "
          class="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-center font-semibold transition duration-150 hover:bg-blue-100"
        >
          {{ count }} questions
        </button>
        <button
          @click="
            questionCount = 0; // 0 indique toutes les questions
            nextStep();
          "
          class="col-span-2 rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-center font-semibold transition duration-150 hover:bg-blue-100 md:col-span-4"
        >
          Toutes les questions
        </button>
      </div>

      <div class="mt-6 flex justify-between">
        <button
          @click="prevStep"
          class="rounded-lg bg-gray-500 px-6 py-2 font-bold text-white hover:bg-gray-600"
        >
          Précédent
        </button>
      </div>
    </div>

    <!-- Étape 3: Direction de traduction -->
    <div v-if="currentStep === 3" class="rounded-lg bg-white p-6 shadow-md">
      <h2 class="mb-4 text-2xl font-semibold">Étape 3: Mode de jeu</h2>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button
          @click="
            translationDirection = 'en-fr';
            startGame();
          "
          class="rounded-lg border border-gray-300 bg-gray-100 px-4 py-4 text-center font-semibold transition duration-150 hover:bg-blue-100"
        >
          Anglais → Français
        </button>
        <button
          @click="
            translationDirection = 'fr-en';
            startGame();
          "
          class="rounded-lg border border-gray-300 bg-gray-100 px-4 py-4 text-center font-semibold transition duration-150 hover:bg-blue-100"
        >
          Français → Anglais
        </button>
        <button
          @click="
            translationDirection = 'mixed';
            startGame();
          "
          class="rounded-lg border border-gray-300 bg-gray-100 px-4 py-4 text-center font-semibold transition duration-150 hover:bg-blue-100"
        >
          Mélangé
        </button>
      </div>

      <div class="mt-6 flex justify-between">
        <button
          @click="prevStep"
          class="rounded-lg bg-gray-500 px-6 py-2 font-bold text-white hover:bg-gray-600"
        >
          Précédent
        </button>
      </div>
    </div>

    <!-- Jeu en cours -->
    <div v-if="currentStep === 4" class="rounded-lg bg-white p-6 shadow-md">
      <div class="mb-4 flex justify-between">
        <div class="text-gray-600">
          Question {{ currentQuestionIndex + 1 }}/{{ gameQuestions.length }}
        </div>
        <div class="font-semibold">
          Score: {{ score }}/{{ currentQuestionIndex }}
        </div>
      </div>

      <div class="mb-8">
        <div class="mb-1 text-gray-600">
          {{ isFromEnglish ? 'Anglais' : 'Français' }}:
        </div>
        <div class="mb-4 text-2xl font-bold">
          {{
            currentQuestion
              ? isFromEnglish
                ? currentQuestion.en.word
                : currentQuestion.fr.word
              : ''
          }}
        </div>

        <div class="mb-4">
          <div class="mb-1 text-gray-600">
            Choisissez la traduction correcte:
          </div>
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <button
              v-for="(option, index) in currentAnswerOptions"
              :key="index"
              @click="checkAnswer(option)"
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
        <div
          v-if="isCorrect"
          class="rounded-lg bg-green-100 p-3 text-green-800"
        >
          Bonne réponse!
        </div>
        <div v-else class="rounded-lg bg-red-100 p-3 text-red-800">
          Incorrect. La bonne réponse était: {{ correctAnswer }}
        </div>
      </div>

      <div class="mt-6 flex justify-between">
        <button
          @click="resetGame"
          class="rounded-lg bg-gray-500 px-6 py-2 font-bold text-white hover:bg-gray-600"
        >
          Nouvelle partie
        </button>
        <button
          v-if="showFeedback && currentQuestionIndex < gameQuestions.length - 1"
          @click="nextQuestion"
          class="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
        >
          Question suivante
        </button>
        <button
          v-if="
            showFeedback && currentQuestionIndex >= gameQuestions.length - 1
          "
          @click="showResults"
          class="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
        >
          Voir les résultats
        </button>
      </div>
    </div>

    <!-- Résultats finaux -->
    <div v-if="currentStep === 5" class="rounded-lg bg-white p-6 shadow-md">
      <h2 class="mb-4 text-2xl font-semibold">Résultats</h2>

      <div class="mb-6">
        <div class="mb-2 text-center text-4xl font-bold">
          {{ score }}/{{ gameQuestions.length }}
        </div>
        <div class="text-center text-xl text-gray-600">
          {{ Math.round((score / gameQuestions.length) * 100) }}%
        </div>
      </div>

      <button
        @click="resetGame"
        class="w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
      >
        Nouvelle partie
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Type definition
interface Word {
  en: { word: string; otherAnswers?: string[] };
  fr: { word: string; otherAnswers?: string[] };
  _isFromEnglish?: boolean;
}

interface Category {
  id: string;
  nameFr: string;
  nameEn: string;
  words: Word[];
}

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
  // Au lieu de charger uniquement jobs.json, chargeons tous les fichiers
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
// Computed properties
const currentQuestion = computed(() => {
  if (
    !gameQuestions.value.length ||
    currentQuestionIndex.value >= gameQuestions.value.length
  ) {
    return null;
  }
  return gameQuestions.value[currentQuestionIndex.value];
});

const isFromEnglish = computed(() => {
  if (translationDirection.value === 'mixed') {
    // Si c'est mélangé, nous déterminerons pour chaque question
    return currentQuestion.value ? currentQuestion.value._isFromEnglish : true;
  }
  return translationDirection.value === 'en-fr';
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
  const shuffled = [...allWords].sort(() => 0.5 - Math.random());
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
  if (!currentQuestion.value) return;

  showFeedback.value = false;
  selectedAnswer.value = null;

  // Déterminer les options de réponses
  const question = currentQuestion.value;
  const fromEnglish = isFromEnglish.value;

  // const sourceLanguage = fromEnglish ? 'en' : 'fr';
  const targetLanguage = fromEnglish ? 'fr' : 'en';

  correctAnswer.value = question[targetLanguage].word;

  // Récupérer les réponses incorrectes du mot actuel
  const wrongAnswers = question[targetLanguage].otherAnswers || [];

  // Créer un tableau avec toutes les options (correcte + incorrectes)
  let options = [correctAnswer.value, ...wrongAnswers];

  // Mélanger les options
  currentAnswerOptions.value = options.sort(() => 0.5 - Math.random());
};

const checkAnswer = (option: string | null) => {
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
