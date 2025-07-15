import { defineStore } from 'pinia';
import type { Book } from '~/types/books';

export const useBooksStore = defineStore('BooksStore', () => {
  const books = ref<Book[]>([]);

  function title(id: number) {
    return books.value.find((book) => book.id === id)?.title;
  }

  function find(id: number) {
    return books.value.find((book) => book.id === id);
  }

  function add(book: Book) {
    book.id = Number(book.industryIdentifiers[0].identifier);
    books.value.unshift(book);
    localStorage.setItem('books', JSON.stringify(books.value));
  }

  // Load books from localStorage on store init
  onMounted(() => {
    const saved = localStorage.getItem('books');
    if (saved) {
      books.value = JSON.parse(saved);
    }
  });

  // Watch for changes and save to localStorage
  // watch(
  //   books,
  //   (newBook) => {
  //     if (newBook) {
  //       localStorage.setItem('books', JSON.stringify(books.value));
  //     }
  //   },
  //   { deep: true }
  // );

  return { books, add, find, title };
});
