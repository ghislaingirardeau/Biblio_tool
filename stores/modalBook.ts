import { defineStore } from 'pinia';
import type { Book, Quote } from '~/types/books';

export const useModalBookStore = defineStore('ModalBooks', () => {
  const open = ref(false);
  const book = ref<null | Book>(null);
  const quote = ref<null | Quote>(null);

  function reset() {
    open.value = false;
    book.value = null;
    quote.value = null;
  }

  return { open, book, quote, reset };
});
