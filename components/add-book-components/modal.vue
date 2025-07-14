<template>
  <UModal
    v-model:open="ModalBook.open"
    fullscreen>
    <UButton
      icon="i-lucide-search"
      size="lg"
      color="primary"
      variant="solid" />

    <template #title>
      <span>Add a new book</span>
    </template>

    <template #description>
      <span>Scan the ISBN bar code</span>
    </template>

    <template #body>
      <AddBookStepper />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const ModalBook = useModalBookStore();
</script>

<style scoped></style>
