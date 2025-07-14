<template>
  <div class="py-2 h-full overflow-y-auto">
    <ListBookCards
      v-for="book in BooksStore.books"
      :key="book.id"
      :book="book" />
  </div>
</template>

<script setup lang="ts">
const BooksStore = useBooksStore();
</script>
