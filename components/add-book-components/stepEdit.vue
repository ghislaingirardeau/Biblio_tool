<template>
  <div>
    <p>Inputs to edit data and valid</p>
    <USeparator
      orientation="horizontal"
      class="w-full my-5" />
    <UButton
      label="Prev"
      color="neutral"
      variant="subtle"
      @click="active = 0" />
    <UButton
      label="Add"
      color="neutral"
      variant="subtle"
      @click="endAddBook" />
  </div>
</template>

<script setup lang="ts">
import { useBooksStore } from '~/stores/books';

const active = defineModel<number>('active');
const books = useBooksStore();

function endAddBook() {
  books.add();
}
</script>

<style scoped></style>
