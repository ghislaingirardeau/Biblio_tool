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

    <template #description>
      <span>Scan the quote</span>
    </template>

    <template #body> </template>
  </UModal>
</template>

<script setup lang="ts">
const ModalBook = useModalBookStore();
</script>

<style scoped></style>
