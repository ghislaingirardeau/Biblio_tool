import { defineStore } from 'pinia';
import type { Book } from '~/types/books';

export const useBooksStore = defineStore('BooksStore', () => {
  const books = ref<Book[]>([]);

  function add(book: Book) {
    book.id = Number(book.industryIdentifiers[0].identifier);
    books.value.unshift(book);
  }

  return { books, add };
});
