<template>
  <img
    :src="src"
    :alt="type"
    class="w-icon"
    :style="{ width: size + 'px', height: size + 'px' }" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type: string;
    size?: number;
    isNight?: boolean;
  }>(),
  { size: 52, isNight: false },
);

import { computed } from "vue";
const src = computed(() => {
  if (props.type === "sunny")
    return props.isNight ? "/img/shadow.png" : "/img/sunny.png";
  if (props.type === "cloudy") return "/img/sunny2.png";
  if (props.type === "rainy") return "/img/rain.svg";
  return "/img/cloudy.png";
});
</script>

<style scoped>
.w-icon {
  object-fit: contain;
  display: block;
}
</style>
