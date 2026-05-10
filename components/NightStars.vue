<template>
  <div class="stars" :class="{ 'stars--visible': isNight }" aria-hidden="true">
    <span
      v-for="s in stars" :key="s.id"
      class="star"
      :style="{ left: s.x+'%', top: s.y+'%', width: s.r+'px', height: s.r+'px', opacity: s.o }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ isNight: boolean }>()

const stars = Array.from({ length: 130 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: Math.random() * 2 + 1,
  o: Math.random() * 0.7 + 0.2,
}))
</script>

<style lang="scss" scoped>
.stars {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0;
  opacity: 0; transition: opacity 0.6s;

  &--visible { opacity: 1; }
}
.star {
  position: absolute;
  background: #fff;
  border-radius: 50%;
}
</style>
