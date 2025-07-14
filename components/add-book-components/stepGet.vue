<template>
  <div>
    <AddBookScanBar />
    <USeparator
      orientation="horizontal"
      class="w-full my-5" />
    <AddBookIsbnInput />
    <USeparator
      orientation="horizontal"
      class="w-full my-5" />
    <UButton
      label="Next"
      color="primary"
      variant="subtle"
      @click="active = 1" />
  </div>
</template>

<script setup lang="ts">
const active = defineModel<number>('active');
</script>

<style scoped></style>
