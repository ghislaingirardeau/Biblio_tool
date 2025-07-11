<template>
  <div class="p-2">
    <TheHeader />
    <h1>Welcome to the homepage</h1>
    <UAlert
      title="Heads up!"
      class="bg-amber-600 text-blue-600" />
    <UButton
      icon="i-lucide-sun"
      color="secondary"
      variant="subtle"
      >Button</UButton
    >
    <UIcon
      name="uil:github"
      class="text-amber-600 text-6xl" />
    <UCard
      variant="solid"
      as="aside"
      class="rounded-2xl">
      <template #header>
        <span>Hello</span>
      </template>

      <span
        >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab rem
        consequatur, quod molestias quaerat quasi mollitia natus voluptas. Optio
        eaque hic adipisci quae repellat inventore recusandae quam aperiam totam
        nihil.</span
      >

      <template #footer>
        <div class="flex justify-end">
          <span>World</span>
        </div>
      </template>
    </UCard>
    <!-- <video-canvas /> -->
  </div>
</template>
