<template>
  <div>
    <p class="py-2">Or type the book's ISBN</p>
    <UInput
      v-model="bookIsbn"
      color="secondary"
      size="lg"
      placeholder="Book ISBN"
      :disabled="isLoading"
      :loading="isLoading" />
    <UButton
      label="Find"
      color="secondary"
      size="lg"
      variant="subtle"
      @click="findBook" />
  </div>
</template>

<script setup lang="ts">
const bookIsbn = ref('0299326101');
const isLoading = ref(false);
const ModalBook = useModalBookStore();

async function findBook() {
  console.log('call api to find the book');
  try {
    isLoading.value = true;
    const response = await fetch(
      `http://localhost:3000/api/book?isbn=${bookIsbn.value}`
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      ModalBook.book = result;
      isLoading.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped></style>
