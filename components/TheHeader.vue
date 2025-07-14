<template>
  <header class="p-2 flex justify-between border-b-2">
    <div class="flex">
      <UButton
        icon="prime:align-justify"
        size="lg"
        color="primary"
        variant="solid" />
      <h1 class="text-2xl ml-2">Books</h1>
    </div>
    <div>
      <addBookModal />
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
