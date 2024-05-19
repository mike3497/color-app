import type { Color } from '@/models/color';
import { colord, extend, random } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import type { HarmonyType } from 'colord/plugins/harmonies';
import harmonies from 'colord/plugins/harmonies';
import mix from 'colord/plugins/mix';
import namesPlugin from 'colord/plugins/names';
import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRootStore = defineStore('rootStore', () => {
  extend([harmonies, a11yPlugin, mix, namesPlugin]);

  const harmonyNames: HarmonyType[] = [
    'analogous',
    'complementary',
    'double-split-complementary',
    'rectangle',
    'split-complementary',
    'tetradic',
    'triadic'
  ];

  const colors = ref<Color[]>([]);
  const selectedHarmonyMethod = ref<HarmonyType>('double-split-complementary');

  const generateColors = () => {
    const randomColor = random().toHex();
    const color = colord(randomColor);
  
    colors.value = color.harmonies(selectedHarmonyMethod.value).map((item) => {
      const shades = item.shades(10).filter((shade) => shade.toHex() !== item.toHex());
      const tints = item.tints(10).reverse();
  
      const newColor: Color = {
        id: nanoid(),
        hex: item.toHex(),
        name: item.toName({ closest: true }) ?? '',
        shades: shades.map((item) => {
          const newColor: Color = {
            id: nanoid(),
            hex: item.toHex(),
            name: item.toName({ closest: true }) ?? ''
          };
  
          return newColor;
        }),
        tints: tints.map((item) => {
          const newColor: Color = {
            id: nanoid(),
            hex: item.toHex(),
            name: item.toName({ closest: true }) ?? ''
          };
  
          return newColor;
        })
      };
  
      return newColor;
    });
  };

  return {
    colors,
    generateColors,
    harmonyNames,
    selectedHarmonyMethod,
  };
});
