<template>
  <div class="weather-card">

    <!-- Верх: температура + иконка погоды -->
    <div class="weather-card__top">
      <div>
        <p class="weather-card__temp">{{ temp }}°</p>
        <p class="weather-card__day">{{ dayLabel }}</p>
      </div>

      <!-- Иконка меняется в зависимости от погоды -->
      <img :src="weatherIcon" alt="Погода" class="weather-card__icon" />
    </div>

    <!-- Низ: время и город -->
    <div class="weather-card__bottom">
      <p class="weather-card__info">Время: {{ time }}</p>
      <p class="weather-card__info">Город: {{ city }}</p>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ICONS } from '@/assets/icons.js'

const props = defineProps({
  temp:      Number,   // температура
  dayLabel:  String,   // "Сегодня" / "Завтра" / "Пн" и т.д.
  time:      String,   // текущее время
  city:      String,   // название города
  iconType:  String,   // тип погоды: 'sunny' | 'cloudy' | 'rainy'
})

const colorMode = useColorMode()

// Выбираем нужную иконку по типу погоды
const weatherIcon = computed(() => {
  if (props.iconType === 'sunny') {
    return colorMode.value === 'dark' ? ICONS.moon : ICONS.sunny
  }
  if (props.iconType === 'rainy') return ICONS.rainy
  return ICONS.cloudy
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.weather-card {
  background: $white;
  border-radius: $radius-lg;
  border: 1.5px solid $border;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;

  // Верх
  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__temp {
    font-size: 72px;
    font-weight: 800;
    color: $blue;
    line-height: 1;
  }

  &__day {
    font-size: 24px;
    font-weight: 700;
    color: $text-dark;
    margin-top: 4px;
  }

  &__icon {
    width: 96px;
    height: 96px;
    object-fit: contain;
    flex-shrink: 0;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 16px;
  }

  &__info {
    font-size: 13.5px;
    font-weight: 600;
    color: $text-gray;
  }
}
</style>
