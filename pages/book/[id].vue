<template>
  <div class="py-2 h-full overflow-y-auto">
    {{ book }}
  </div>
</template>

<script setup lang="ts">
const { find } = useBooksStore();

const route = useRoute();

const book = computed(() => {
  return find(Number(route.params.id));
});
</script>

<style scoped></style>
