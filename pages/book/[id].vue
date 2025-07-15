<template>
  <div class="py-2 h-full overflow-y-auto">
    <div v-if="!quotes || quotes.length === 0">
      <p class="italic">No quotes available</p>
    </div>
    <div v-else>
      <p
        v-for="quote in quotes"
        :key="quote.id">
        {{ quotes }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { find } = useBooksStore();

const route = useRoute();

const quotes = computed(() => {
  return find(Number(route.params.id))?.quotes;
});
</script>

<style scoped></style>
