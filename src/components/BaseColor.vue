<template>
  <div
    class="flex flex-col w-full h-full items-center justify-end pb-8"
    :style="{ color: getTextColor(color.hex) }"
  >
    <button class="px-4 py-1 mb-2 rounded-lg" @click="onColorClicked(color.hex)">
      <h1 class="font-bold">{{ color.hex.replace('#', '').toUpperCase() }}</h1>
    </button>
    <p class="text-sm">{{ color.name }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Color } from '@/models/color';
import { colord } from 'colord';
import { type PropType } from 'vue';

const emit = defineEmits(['colorCopied']);

defineProps({
  color: {
    type: Object as PropType<Color>,
    required: true
  }
});

const onColorClicked = (color: string) => {
  navigator.clipboard.writeText(color);
  emit('colorCopied', color);
};

const getTextColor = (backgroundColor: string): string => {
  const color = colord(backgroundColor);
  const blackTextContrastRatio = color.contrast('#000000');
  const whiteTextContrastRatio = color.contrast('#FFFFFF');

  if (blackTextContrastRatio > whiteTextContrastRatio) {
    return '#000000';
  }

  return '#FFFFFF';
};
</script>
