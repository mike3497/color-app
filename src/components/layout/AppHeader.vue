<template>
  <header class="border-b border-b-zinc-200">
    <div class="flex gap-2 items-center p-4">
      <h1 class="text-2xl font-bold"><i class="fa-solid fa-palette pr-2"></i>Colorify</h1>
      <div class="flex-1">
        <p class="text-center hidden md:block">
          Press
          <kbd
            class="px-4 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg"
            >Spacebar</kbd
          >
          to generate color palettes!
        </p>
      </div>
      <button
        class="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 px-3 py-2 rounded-lg"
        @click="isSettingsModalOpen = true"
      >
        <i class="fa-solid fa-gear"></i><span>Settings</span>
      </button>
    </div>
    <div class="p-4 md:hidden">
      <button
        class="bg-blue-500 text-white px-6 py-2 rounded-lg w-full"
        @click="onGenerateClicked"
      >
        Generate
      </button>
    </div>
  </header>
  <SettingsModal v-model="isSettingsModalOpen" />
</template>

<script setup lang="ts">
import SettingsModal from '@/components/SettingsModal.vue';
import { useRootStore } from '@/stores/rootStore';
import { ref } from 'vue';

const rootStore = useRootStore();

const isSettingsModalOpen = ref<boolean>(false);

const onGenerateClicked = () => {
  rootStore.generateColors();
}
</script>
