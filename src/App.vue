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
  <ToastContainer />
</template>

<script setup lang="ts">
import BaseColor from '@/components/BaseColor.vue';
import ToastContainer from '@/components/ToastContainer.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import { useToast } from '@/composables/useToast';
import { getBlackOrWhiteTextColor } from '@/helpers/colorHelper';
import { useRootStore } from '@/stores/rootStore';
import { onKeyStroke } from '@vueuse/core';
import { onMounted } from 'vue';

const rootStore = useRootStore();
const toast = useToast();

onKeyStroke(' ', (e) => {
  e.preventDefault();
  rootStore.generateColors();
});

const onColorCopied = (color: string) => {
  const textColor = getBlackOrWhiteTextColor(color);

  toast.open(`${color.toUpperCase()} copied to clipboard!`, { backgroundColor: color, textColor });
};

onMounted(() => {
  rootStore.generateColors();
});
</script>
