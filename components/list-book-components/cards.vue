<template>
  <UCard
    variant="subtle"
    class="my-2">
    <div class="flex justify-between">
      <div>
        <h2>{{ authors }}</h2>
        <span class="text-sm italic">{{ props.book.title }}</span>
      </div>
      <div>actions</div>
    </div>

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

const authors = computed(() => {
  return props.book.author.join(', ');
});
</script>

<style scoped lang="scss"></style>
