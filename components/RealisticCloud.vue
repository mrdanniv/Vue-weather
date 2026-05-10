<template>
  <img
    src="/img/big_cloudy.png"
    alt=""
    :style="{ opacity: isNight ? 0.15 : 0.95, width: '100%', height: '100%', objectFit: 'cover' }"
  />
</template>

<script setup lang="ts">
defineProps<{ isNight?: boolean }>()
</script>
