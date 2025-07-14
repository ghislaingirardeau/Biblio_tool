import { defineStore } from 'pinia';
import type { Book } from '~/types/books';

export const useBooksStore = defineStore('BooksStore', () => {
  const books = ref<Book[]>([]);

  // Load books from localStorage on store init
  onMounted(() => {
    const saved = localStorage.getItem('books');
    if (saved) {
      books.value = JSON.parse(saved);
    }
  });

  function add(book: Book) {
    book.id = Number(book.industryIdentifiers[0].identifier);
    books.value.unshift(book);
  }

  // Watch for changes and save to localStorage
  watch(
    books,
    () => {
      localStorage.setItem('books', JSON.stringify(books.value));
    },
    { deep: true }
  );

  return { books, add };
});
