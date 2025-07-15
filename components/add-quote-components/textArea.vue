<template>
  <span class="font-bold">Quote</span>
  <UTextarea
    v-model="quote!.content"
    placeholder="Paste your quote here"
    :rows="8"
    class="w-full my-2"
    autoresize />
  <span class="font-bold">Page</span>
  <UInput
    v-model="quote!.page"
    class="w-full my-2"
    placeholder="12 or 12-15..." />
</template>

<script setup lang="ts">
import type { Quote } from '~/types/books';

const quote = defineModel<Quote>('quote');
</script>

<style scoped></style>
