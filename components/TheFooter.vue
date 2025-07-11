<template>
  <footer class="p-2 flex justify-between border-t-2">
    <UInput
      v-model="filter"
      color="secondary"
      class="w-3/4"
      size="lg"
      placeholder="Title, author, publication..."
      :disabled="isDisabled"
      :loading="isLoading" />
    <UButton
      label="Filter Books"
      color="secondary"
      size="lg"
      variant="subtle"
      @click="filterBooks" />
  </footer>
</template>

<script setup lang="ts">
const filter = '';
const isDisabled = ref(false);
const isLoading = ref(false);

function filterBooks() {
  console.log('filter books');
}
</script>

<style scoped></style>
