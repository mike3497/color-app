<template>
  <div class="flex flex-col h-[100dvh]">
    <AppHeader />
    <div class="flex-1">
      <div class="flex flex-col flex-1 md:flex-row h-full">
        <div
          v-for="color in rootStore.colors"
          :key="color.id"
          :style="{ backgroundColor: color.hex }"
          class="flex flex-1"
        >
          <BaseColor :color="color" @colorCopied="onColorCopied" />
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
  <BaseToast :backgroundColor="copiedColor" :isVisible="isToastVisible">
    <div>
      <i class="fa-solid fa-circle-check pr-2"></i>
      <span>{{ copiedColor }} copied to the clipboard!</span>
    </div>
  </BaseToast>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import BaseColor from '@/components/BaseColor.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import BaseToast from '@/components/shared/BaseToast.vue';
import { useRootStore } from '@/stores/rootStore';
import { onKeyStroke } from '@vueuse/core';

const rootStore = useRootStore();

const copiedColor = ref<string>('');
const isToastVisible = ref<boolean>(false);

onKeyStroke(' ', (e) => {
  e.preventDefault();
  rootStore.generateColors();
});

const onColorCopied = (color: string) => {
  isToastVisible.value = true;
  copiedColor.value = color.toUpperCase();
  setTimeout(() => (isToastVisible.value = false), 1000);
};

onMounted(() => {
  rootStore.generateColors();
});
</script>
