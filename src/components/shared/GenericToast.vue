<template>
  <Transition>
    <div v-if="isVisible" class="fixed flex items-center justify-center inset-x-0 bottom-8">
      <div class="bg-zinc-600 text-white rounded-full px-6 py-2">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-32px);
  opacity: 0;
}
</style>
