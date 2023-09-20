<template>
  <div class="flex flex-col h-screen">
    <header>
      <div class="p-4 border-b border-b-zinc-200">
        <div class="flex items-center gap-2 text-2xl font-bold">
          <span class="material-symbols-outlined">palette</span>
          <h1>Colorify</h1>
        </div>
      </div>
      <p class="p-4">Press spacebar to generate color palettes!</p>
    </header>
    <div class="flex-1">
      <div class="grid grid-cols-5 h-full">
        <div
          v-for="color in colors"
          :key="color.id"
          :style="{ backgroundColor: color.hex }"
          class="flex justify-center items-end py-8"
        >
          <div class="flex flex-col items-center" :style="{ color: getTextColor(color.hex) }">
            <button class="px-4 py-1 mb-2 rounded-lg" @click="onColorClicked(color.hex)">
              <h1 class="font-bold">{{ color.hex.replace('#', '').toUpperCase() }}</h1>
            </button>
            <p class="text-sm">{{ color.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="p-4">
      <div>
        <p class="text-sm">
          &copy; Copyright 2023
          <a class="underline" href="https://michaelcarillon.com/">Michael Carillon</a>
        </p>
      </div>
    </footer>
  </div>
  <GenericToast :isVisible="isToastVisible">
    <div class="flex items-center">
      <span class="material-symbols-outlined mr-2"> check_circle </span>
      <span>{{ copiedColor }} copied to the clipboard!</span>
    </div>
  </GenericToast>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { colord, random, extend } from 'colord';
import harmonies from 'colord/plugins/harmonies';
import a11yPlugin from 'colord/plugins/a11y';
import type { Color } from '@/models/color';
import { nanoid } from 'nanoid';
import { closest } from 'color-2-name';
import { onKeyStroke } from '@vueuse/core';
import GenericToast from '@/components/shared/GenericToast.vue';

extend([harmonies, a11yPlugin]);

const colors = ref<Color[]>([]);
const copiedColor = ref<string>('');
const isToastVisible = ref<boolean>(false);

onKeyStroke(' ', (e) => {
  e.preventDefault();
  generateColors();
});

const onColorClicked = (color: string) => {
  copiedColor.value = color;
  navigator.clipboard.writeText(color);
  isToastVisible.value = true;
  setTimeout(() => (isToastVisible.value = false), 1000);
};

const generateColors = () => {
  const randomColor = random().toHex();
  const color = colord(randomColor);

  colors.value = color.harmonies('double-split-complementary').map((item) => {
    const newColor: Color = {
      id: nanoid(),
      hex: item.toHex(),
      name: closest(item.toHex()).name
    };

    return newColor;
  });
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

onMounted(() => {
  generateColors();
});
</script>
