<template>
  <div
    ref="resultsContainer"
    class="scale-95 rounded-lg border border-(--custom-brown)/20 bg-white/40 p-6 opacity-0 shadow-md"
  >
    <h2 class="mb-4 text-2xl font-semibold text-(--custom-green-dark)">
      Résultats
    </h2>

    <div
      class="mb-6 rounded-lg border border-(--custom-brown-light)/40 bg-(--custom-light) p-4"
    >
      <div
        ref="scoreEl"
        class="mb-2 text-center text-4xl font-bold text-(--custom-green-dark)"
      >
        {{ displayScore }}/{{ total }}
      </div>
      <div ref="percentageEl" class="text-center text-xl text-(--custom-green)">
        {{ displayPercentage }}%
      </div>
    </div>

    <button
      @click="reset"
      class="w-full rounded-lg bg-(--custom-brown) px-6 py-3 font-bold text-white transition duration-150 hover:cursor-pointer hover:bg-(--custom-brown-light)"
    >
      Nouvelle partie
    </button>
  </div>
  <div
    ref="confettiContainer"
    class="pointer-events-none fixed inset-0 z-100"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';

const confettiContainer = ref<HTMLDivElement | null>(null);

const createConfetti = () => {
  console.log('object');

  const colors = ['#FFC700', '#FF0055', '#2BD1FC', '#C04CFD', '#47CF73'];
  const confettiCount = 100;

  // Vider le conteneur avant de créer de nouveaux confettis
  if (confettiContainer.value) {
    confettiContainer.value.innerHTML = '';
  }

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Créer un élément de confetti avec un style aléatoire
    confetti.className = 'absolute';
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 4 + 2}px`;
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = `${Math.random() > 0.5 ? '50%' : '0'}`;
    confetti.style.opacity = '0';

    // Ajouter au conteneur
    if (confettiContainer.value) {
      confettiContainer.value.appendChild(confetti);
    }

    // Position initiale (en haut de l'écran)
    gsap.set(confetti, {
      x: Math.random() * window.innerWidth,
      y: -20,
      rotation: Math.random() * 360,
      opacity: 1,
    });

    // Animation de chute
    gsap.to(confetti, {
      y: window.innerHeight + 100,
      x: `+=${Math.random() * 200 - 100}`,
      rotation: `+=${Math.random() * 360 + 180}`,
      opacity: 0,
      duration: Math.random() * 3 + 2,
      ease: 'power1.out',
      delay: Math.random() * 1,
      onComplete: () => {
        confetti.remove();
      },
    });
  }
};

const props = defineProps<{
  score: number;
  total: number;
}>();

const emit = defineEmits<{
  (e: 'reset'): void;
}>();

const resultsContainer = ref<HTMLDivElement | null>(null);
const scoreEl = ref<HTMLDivElement | null>(null);
const percentageEl = ref<HTMLDivElement | null>(null);
const displayScore = ref(0);
const displayPercentage = ref(0);

const percentage = computed(() => {
  return Math.round((props.score / props.total) * 100);
});

const reset = () => {
  emit('reset');
};

const animateResults = () => {
  // Animer l'apparition du conteneur
  gsap.to(resultsContainer.value, {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: 'back.out(1.7)',
    onComplete: () => {
      // Animer le score et le pourcentage
      gsap.to(displayScore, {
        value: props.score,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          displayScore.value = Math.round(displayScore.value);
        },
        onComplete: () => {
          // Lancer les confettis une fois l'animation du score terminée
          if (props.score / props.total >= 0.7) {
            // Si le score est supérieur à 70%
            createConfetti();
          }
        },
      });

      gsap.to(displayPercentage, {
        value: percentage.value,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          displayPercentage.value = Math.round(displayPercentage.value);
        },
      });
    },
  });
};

onMounted(() => {
  animateResults();
});

// Réinitialiser et relancer l'animation si le score change
watch(
  () => props.score,
  (newScore, oldScore) => {
    if (newScore !== oldScore) {
      displayScore.value = 0;
      displayPercentage.value = 0;
      gsap.set(resultsContainer.value, { opacity: 0, scale: 0.95 });
      animateResults();
    }
  }
);
</script>
