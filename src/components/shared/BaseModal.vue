<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div
        v-show="isOpen"
        class="flex justify-center items-center w-screen h-screen fixed top-0 left-0 bg-zinc-500/50"
      >
        <Transition name="modal-inner">
          <div v-show="isOpen" class="relative bg-white w-full md:w-1/2 mx-4 rounded-lg">
            <div class="flex justify-between items-center border-b border-b-zinc-200 p-4">
              <h1 class="font-bold">{{ heading }}</h1>
              <button
                class="bg-zinc-100 hover:bg-zinc-200 px-3 py-2 rounded-lg"
                @click="onCloseClicked"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div class="p-4">
              <slot></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';

defineProps({
  heading: {
    type: String,
    required: true
  }
});

const isOpen = defineModel<boolean>({ required: true });

const onCloseClicked = () => {
  isOpen.value = false;
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
