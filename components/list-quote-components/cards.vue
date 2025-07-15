<template>
  <UCard
    variant="subtle"
    class="my-2">
    <div class="flex justify-between">
      <div class="w-3/4">
        <h2 class="truncate">{{ props.quote.content }}</h2>
        <span class="text-sm italic">p. {{ props.quote.page }}</span>
      </div>

      <div>
        <QuoteBookModal />

        <UButton
          icon="mdi:delete"
          size="lg"
          color="primary"
          variant="soft" />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Quote } from '~/types/books';
import type { PropType } from 'vue';

const props = defineProps({
  quote: {
    type: Object as PropType<Quote>,
    default: () => ({} as Quote),
  },
});
</script>

<style scoped lang="scss"></style>
