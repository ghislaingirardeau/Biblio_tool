<template>
  <UCard
    variant="subtle"
    class="py-2">
    <template #header>
      <div class="flex justify-between">
        <h2>{{ props.book.author }}</h2>
        <div>actions</div>
      </div>
    </template>

    <span>{{ props.book.title }}</span>

    <!-- <template #footer>
      <span>{{ props.book.publisher }}</span>
    </template> -->
  </UCard>
</template>

<script setup lang="ts">
import type { Book } from '~/types/books';
import type { PropType } from 'vue';

const props = defineProps({
  book: {
    type: Object as PropType<Book>,
    default: () => ({} as Book),
  },
});
</script>

<style scoped></style>
