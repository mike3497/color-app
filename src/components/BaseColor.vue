<template>
  <div
    class="flex flex-col flex-1 items-center justify-center md:justify-end md:pb-8"
    :style="{ color: textColor }"
  >
    <button class="px-4 py-1 mb-2 rounded-lg" @click="onColorClicked(color.hex)">
      <h1 class="font-bold">{{ color.hex.replace('#', '').toUpperCase() }}</h1>
    </button>
    <p class="text-sm">{{ color.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { getBlackOrWhiteTextColor } from '@/helpers/colorHelper';
import type { Color } from '@/models/color';
import { computed, type PropType } from 'vue';

const emit = defineEmits(['colorCopied']);

const props = defineProps({
  color: {
    type: Object as PropType<Color>,
    required: true
  }
});

const textColor = computed<string>(() => getBlackOrWhiteTextColor(props.color.hex));

const onColorClicked = (color: string) => {
  navigator.clipboard.writeText(color);
  emit('colorCopied', color);
};
</script>
