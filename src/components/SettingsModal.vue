<template>
  <BaseModal v-model="isOpen" heading="Generate Method">
    <div class="flex flex-col gap-2">
      <button
        v-for="harmony in rootStore.harmonyNames"
        :key="harmony"
        class="px-6 py-2 rounded-lg"
        :class="{
          'bg-blue-500 text-white hover:bg-blue-600': rootStore.selectedHarmonyMethod === harmony,
          'bg-zinc-100 text-black hover:bg-zinc-200': rootStore.selectedHarmonyMethod !== harmony
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
import { defineModel } from 'vue';

const isOpen = defineModel<boolean>({ required: true });

const rootStore = useRootStore();

const onHarmonyClicked = (harmony: HarmonyType) => {
  rootStore.selectedHarmonyMethod = harmony;
  rootStore.generateColors();
};
</script>
