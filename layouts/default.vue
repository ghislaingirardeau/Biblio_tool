<template>
  <div class="p-2 h-screen flex flex-col justify-between">
    <TheHeader />
    <slot />
    <TheFooter />
  </div>
</template>

<style scoped>
.contain-layout {
  height: 100vh;
}
</style>
