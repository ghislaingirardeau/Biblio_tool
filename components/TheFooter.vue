<template>
  <footer class="p-2 flex justify-between border-t-2">
    <UInput
      v-model="query"
      color="secondary"
      class="w-3/4"
      size="lg"
      placeholder="Title, author, publication..."
      :disabled="isDisabled"
      :loading="isLoading"
      @keyup.enter="filterBooks" />
    <UButton
      label="Filter Books"
      color="secondary"
      size="lg"
      class="ml-2"
      variant="subtle"
      @click="filterBooks" />
    <span>{{ message }} </span>
  </footer>
</template>

<script setup lang="ts">
const route = useRoute();
const { filter } = useBooksStore();

const query = ref('');
const isDisabled = ref(false);
const isLoading = ref(false);
const message = ref<null | string | undefined>(null);

function filterBooks() {
  message.value = filter(query.value);
}

watch(
  () => route,
  () => {
    query.value = '';
  },
  { deep: true }
);
</script>

<style scoped></style>
