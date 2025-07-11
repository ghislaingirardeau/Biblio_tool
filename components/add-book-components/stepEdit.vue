<template>
  <div>
    <p>Inputs to edit data and valid</p>
    <USeparator
      orientation="horizontal"
      class="w-full my-5" />
    <UButton
      label="Prev"
      color="neutral"
      variant="subtle"
      @click="active = 0" />
    <UButton
      label="Add"
      color="neutral"
      variant="subtle" />
  </div>
</template>

<script setup lang="ts">
const active = defineModel<number>('active');
</script>

<style scoped></style>
