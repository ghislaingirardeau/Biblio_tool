<template>
  <div class="py-2">
    <ListBookCards
      v-for="book in books"
      :key="book.id"
      :book="book" />
  </div>
</template>

<script setup lang="ts">
import books from '~/assets/books.json';
</script>
