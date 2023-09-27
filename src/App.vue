<template>
  <div class="flex flex-col h-[100dvh]">
    <AppHeader @generateClicked="generateColors" />
    <div class="flex-1">
      <div class="flex flex-col flex-1 md:flex-row h-full">
        <div
          v-for="color in colors"
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
import { colord, random, extend } from 'colord';
import harmonies from 'colord/plugins/harmonies';
import a11yPlugin from 'colord/plugins/a11y';
import mix from 'colord/plugins/mix';
import type { Color } from '@/models/color';
import { nanoid } from 'nanoid';
import { closest } from 'color-2-name';
import { onKeyStroke } from '@vueuse/core';
import BaseToast from '@/components/shared/BaseToast.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import BaseColor from './components/BaseColor.vue';
import { useRootStore } from '@/stores/rootStore';

extend([harmonies, a11yPlugin, mix]);

const rootStore = useRootStore();

const colors = ref<Color[]>([]);
const copiedColor = ref<string>('');
const isToastVisible = ref<boolean>(false);

onKeyStroke(' ', (e) => {
  e.preventDefault();
  generateColors();
});

const onColorCopied = (color: string) => {
  isToastVisible.value = true;
  copiedColor.value = color.toUpperCase();
  setTimeout(() => (isToastVisible.value = false), 1000);
};

const generateColors = () => {
  const randomColor = random().toHex();
  const color = colord(randomColor);

  colors.value = color.harmonies(rootStore.harmonyMethod).map((item) => {
    const shades = item.shades(10).filter((shade) => shade.toHex() !== item.toHex());
    const tints = item.tints(10).reverse();

    const newColor: Color = {
      id: nanoid(),
      hex: item.toHex(),
      name: closest(item.toHex()).name,
      shades: shades.map((item) => {
        const newColor: Color = {
          id: nanoid(),
          hex: item.toHex(),
          name: closest(item.toHex()).name
        };

        return newColor;
      }),
      tints: tints.map((item) => {
        const newColor: Color = {
          id: nanoid(),
          hex: item.toHex(),
          name: closest(item.toHex()).name
        };

        return newColor;
      })
    };

    return newColor;
  });
};

onMounted(() => {
  generateColors();
});
</script>
