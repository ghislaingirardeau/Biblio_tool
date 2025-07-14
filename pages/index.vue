<template>
  <div class="py-2 h-full overflow-y-auto">
    <ListBookCards
      v-for="book in fakeApiRes"
      :key="book.id"
      :book="book" />
  </div>
</template>

<script setup lang="ts">
import { fakeApiRes } from '~/assets/book_api_res';

const BooksStore = useBooksStore();
</script>
