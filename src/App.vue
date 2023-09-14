<template>
  <div class="flex flex-col h-screen">
    <header class="p-4">
      <div>
        <h1 class="text-4xl font-bold mb-2">Colorify</h1>
        <p>Press spacebar to generate color palettes!</p>
      </div>
    </header>
    <div class="flex-1">
      <div class="grid grid-cols-5 h-full">
        <div
          v-for="color in colors"
          :key="color.id"
          :style="{ backgroundColor: color.hex }"
          class="flex justify-center items-end py-8"
        >
          <button
            class="text-center"
            :style="{ color: getTextColor(color.hex) }"
            @click="onColorClicked(color.hex)"
          >
            <h1 class="font-bold">{{ color.hex.replace('#', '').toUpperCase() }}</h1>
            <p class="text-sm">{{ color.name }}</p>
          </button>
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

extend([harmonies, a11yPlugin]);

const colors = ref<Color[]>([]);

onKeyStroke(' ', (e) => {
  e.preventDefault();
  generateColors();
});

const onColorClicked = (color: string) => {
  navigator.clipboard.writeText(color);
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
