<template>
  <footer class="bg-zinc-800 text-zinc-400 p-4">
    <div>
      <p class="text-center text-sm">
        <span>&copy; Copyright {{ year }}</span>
        <span>&nbsp;</span>
        <a class="underline" href="https://michaelcarillon.com/">Michael Carillon</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
