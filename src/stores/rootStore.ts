import type { HarmonyType } from 'colord/plugins/harmonies';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRootStore = defineStore('rootStore', () => {
  const harmonyMethod = ref<HarmonyType>('double-split-complementary');

  return {
    harmonyMethod
  };
});
