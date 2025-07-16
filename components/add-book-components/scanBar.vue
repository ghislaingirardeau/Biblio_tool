<template>
  <div>
    <p v-if="isFetchingBookData">Fetching book data...</p>
    <add-book-barcode-detection
      v-else
      @detection-isbn="isbnBookData" />
  </div>
</template>

<script setup lang="ts">
const bookData = ref(null);
const isFetchingBookData = ref(false);
const isFetched = ref(false);
async function isbnBookData(payload: string) {
  try {
    isFetchingBookData.value = true;
    /* TODO: send barcode to API to get ISBN datas */
    const response = await fetch(`/api/article?doi=${payload}`);
    if (response.ok) {
      const result = await response.json();
      bookData.value = result.message;
      isFetched.value = true;
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped></style>
