<template>
  <div>
    <p class="py-2">Or type the book's ISBN</p>
    <UInput
      v-model="bookIsbn"
      color="secondary"
      size="lg"
      placeholder="Book ISBN"
      :disabled="isDisabled"
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
const bookIsbn = ref('');
const isDisabled = ref(false);
const isLoading = ref(false);

function findBook() {
  console.log('call api to find the book');
}
</script>

<style scoped></style>
