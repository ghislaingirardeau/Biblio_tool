<template>
  <div>
    <p v-if="isFetchingBookData">Fetching book data... {{ isbn }}</p>
    <p v-else-if="isFetched">{{ ModalBook.book }}</p>
    <add-book-barcode-detection
      v-else
      @detection-isbn="isbnBookData" />
  </div>
</template>

<script setup lang="ts">
const ModalBook = useModalBookStore();
const isFetchingBookData = ref(false);
const isFetched = ref(false);
const isbn = ref('');
async function isbnBookData(payload: string) {
  isbn.value = payload;
  try {
    isFetchingBookData.value = true;
    const response = await fetch(`/api/book?isbn=${payload}`);
    // article?doi=
    if (response.ok) {
      const result = await response.json();
      ModalBook.book = result;
      isFetched.value = true;
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped></style>
