<template>
  <header class="p-2 flex justify-between border-b-2">
    <div class="flex">
      <UButton
        icon="prime:align-justify"
        size="lg"
        color="primary"
        variant="solid" />
      <h1
        class="text-2xl ml-2"
        @click="backToHome">
        {{ bookTitle }}
      </h1>
    </div>
    <div>
      <addBookModal />
    </div>
  </header>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const { title } = useBooksStore();

const bookTitle = computed(() => {
  if (route.name === 'index') {
    return 'Books';
  } else {
    return title(Number(route.params.id)) || 'Books';
  }
});

function backToHome() {
  router.push({ name: 'index' });
}
</script>

<style scoped></style>
