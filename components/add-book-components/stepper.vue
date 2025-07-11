<template>
  <UStepper
    ref="stepper"
    v-model="active"
    disabled
    :items="items">
    <template #content>
      <div v-if="active === 0">
        <AddBookStepGet v-model:active="active" />
      </div>
      <div v-else>
        <AddBookStepEdit v-model:active="active" />
      </div>
    </template>
  </UStepper>
</template>

<script setup lang="ts">
const active = ref(0);
const items = ref([
  {
    title: 'ISBN',
    description: 'Book Data',
    icon: 'i-lucide-house',
  },

  {
    title: 'Checkout',
    description: 'Confirm your order',
  },
]);
</script>

<style scoped></style>
