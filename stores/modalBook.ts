import { defineStore } from 'pinia';
import type { Book } from '~/types/books';

export const useModalBookStore = defineStore('ModalBooks', () => {
  const open = ref(false);
  const book = ref<null | Book>(null);

  function reset() {
    open.value = false;
    console.log('reset book');
    book.value = null;
  }

  return { open, book, reset };
});
