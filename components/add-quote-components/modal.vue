<template>
  <UModal
    v-model:open="ModalBook.open"
    fullscreen>
    <UButton
      icon="mdi:plus-box"
      size="xl"
      color="primary"
      variant="soft" />

    <template #title>
      <span>Add a new quote</span>
    </template>

    <template #description />

    <template #body>
      <UTabs
        v-model="label"
        :items="items"
        class="w-full">
        <template #content>
          <div v-if="isOcrMode">
            <QuoteBookVideoToImgCanvas
              v-model:quote="quote"
              @next-step="label = '1'" />
          </div>
          <div v-else>
            <QuoteBookTextArea v-model:quote="quote" />
          </div>
        </template>
      </UTabs>
    </template>
    <template #footer>
      <div class="w-full flex justify-end mr-4">
        <UButton
          v-if="!isOcrMode"
          label="Add"
          color="primary"
          :disabled="isAddButtonDisabled"
          variant="subtle"
          @click="endAddQuote" />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { Quote } from '~/types/books';

const route = useRoute();
const ModalBook = useModalBookStore();
const Books = useBooksStore();
const label = ref('0');
const quote = ref<Quote>({
  id: 0,
  page: '',
  content: '',
});
const items = ref([
  {
    label: 'Extract text',
    icon: 'i-lucide-user',
  },
  {
    label: 'Text',
    icon: 'i-lucide-lock',
  },
]);

const isOcrMode = computed(() => label.value === '0');

const isAddButtonDisabled = computed(() => !quote.value.content.trim());

function endAddQuote() {
  quote.value.id = Date.now();
  Books.addQuote(Number(route.params.id), quote.value);
  ModalBook.reset();
  resetModal();
}

function resetModal() {
  quote.value = {
    id: 0,
    page: '',
    content: '',
  };
  label.value = '0';
}
</script>

<style scoped></style>
