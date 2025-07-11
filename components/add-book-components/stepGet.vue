<template>
  <div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui autem
      doloribus molestias nihil aspernatur officia fuga harum suscipit
      repudiandae, id culpa nemo eligendi excepturi tempore voluptate placeat
      enim. Ipsum, doloribus!
    </p>
    <USeparator
      orientation="horizontal"
      class="w-full my-5" />
    <p>Type ISBN</p>
    <USeparator
      orientation="horizontal"
      class="w-full my-5" />
    <UButton
      label="Next"
      color="neutral"
      variant="subtle"
      @click="active = 1" />
  </div>
</template>

<script setup lang="ts">
const active = defineModel<number>('active');
</script>

<style scoped></style>
