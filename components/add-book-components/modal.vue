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
