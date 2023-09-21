<template>
  <div class="flex flex-col h-full w-full">
    <div
      v-for="tint in color.tints"
      :key="tint.id"
      :style="{ backgroundColor: tint.hex }"
      class="flex-1"
    ></div>
    <div
      v-for="shade in color.shades"
      :key="shade.id"
      :style="{ backgroundColor: shade.hex }"
      class="flex-1"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { Color } from '@/models/color';
import type { PropType } from 'vue';

defineProps({
  color: {
    type: Object as PropType<Color>,
    required: true
  }
});
</script>
