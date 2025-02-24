<template>
  <main role="main">
    <NuxtRouteAnnouncer />
    <NuxtWelcome />

    <!-- i18n example -->
    <div>{{ t('welcome') }}</div>
    <div>{{ t('example.goodbye') }}</div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
