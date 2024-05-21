<template>
  <div
    class="py-4 px-8 border-2 rounded-full"
    :style="{
      backgroundColor: toast.backgroundColor,
      borderColor: toast.textColor,
      color: toast.textColor
    }"
    role="alert"
  >
    <p>{{ toast.message }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Toast } from '@/models/toast';
import type { PropType } from 'vue';

defineProps({
  toast: {
    type: Object as PropType<Toast>,
    required: true
  }
});
</script>
