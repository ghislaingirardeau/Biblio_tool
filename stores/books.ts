import { defineStore } from 'pinia';
import type { Book } from '~/types/books';

const ModalBookStore = useModalBookStore();

export const useBooksStore = defineStore('Books', () => {
  const books = ref<Book[]>([]);

  function add() {
    books.value.unshift(ModalBookStore.book!);
    ModalBookStore.reset();
  }

  return { books, add };
});
