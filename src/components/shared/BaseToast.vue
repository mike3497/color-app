<template>
  <Teleport to="#toast">
    <Transition>
      <div v-if="isVisible" class="fixed flex items-center justify-center inset-x-0 bottom-8">
        <div
          class="rounded-full px-6 py-2 drop-shadow-lg"
          :style="{ backgroundColor, color: textColor }"
        >
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { colord } from 'colord';
import { computed } from 'vue';

const props = defineProps({
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  isVisible: {
    type: Boolean,
    default: false
  }
});

const textColor = computed<string>(() => {
  const color = colord(props.backgroundColor);
  const blackTextContrastRatio = color.contrast('#000000');
  const whiteTextContrastRatio = color.contrast('#FFFFFF');

  if (blackTextContrastRatio > whiteTextContrastRatio) {
    return '#000000';
  }

  return '#FFFFFF';
});
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-32px);
  opacity: 0;
}
</style>
