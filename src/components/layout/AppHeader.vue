<template>
  <header>
    <div class="p-4 border-b border-b-zinc-200">
      <h1 class="text-2xl font-bold"><i class="fa-solid fa-palette pr-2"></i>Colorify</h1>
    </div>
    <div class="flex justify-between items-center p-4">
      <p class="hidden md:block">Press the spacebar to generate color palettes!</p>
      <button
        class="bg-blue-500 text-white px-6 py-2 rounded-lg md:hidden"
        @click="$emit('generateClicked')"
      >
        Generate
      </button>
      <button
        class="hover:bg-zinc-100 px-3 py-2 rounded-lg"
        @click="isGenerateMethodModalVisible = true"
      >
        <i class="fa-solid fa-gear pr-2"></i>Settings
      </button>
    </div>
  </header>
  <BaseModal
    heading="Generate Method"
    :isVisible="isGenerateMethodModalVisible"
    @closeClicked="isGenerateMethodModalVisible = false"
  >
    <div class="flex flex-col gap-2">
      <button
        v-for="harmony in harmonies"
        :key="harmony"
        class="px-6 py-2 rounded-lg"
        :class="{
          'bg-blue-500 text-white hover:bg-blue-600': rootStore.harmonyMethod === harmony,
          'bg-zinc-100 text-black hover:bg-zinc-200': rootStore.harmonyMethod !== harmony
        }"
        @click="onHarmonyClicked(harmony)"
      >
        {{ harmony }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/shared/BaseModal.vue';
import { useRootStore } from '@/stores/rootStore';
import type { HarmonyType } from 'colord/plugins/harmonies';
import { ref } from 'vue';

defineEmits(['generateClicked']);

const rootStore = useRootStore();

const isGenerateMethodModalVisible = ref<boolean>(false);

const onHarmonyClicked = (harmony: string) => {
  rootStore.harmonyMethod = harmony as HarmonyType;
};

const harmonies = [
  'analogous',
  'complementary',
  'double-split-complementary',
  'rectangle',
  'split-complementary',
  'tetradic',
  'triadic'
];
</script>
