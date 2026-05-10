<template>
  <div class="weekly">

    <!-- Панель кнопок -->
    <div class="weekly__bar">
      <button
        class="weekly__toggle"
        :class="{ 'weekly__toggle--active': isOpen }"
        @click="$emit('toggle')"
      >
        На неделю
      </button>

      <button v-if="isOpen" class="weekly__cancel" @click="$emit('toggle')">
        Отменить
      </button>
    </div>

    <!-- Карточки дней (показываем только если открыто) -->
    <div v-if="isOpen" class="weekly__grid">
      <div
        v-for="(day, index) in days"
        :key="index"
        class="day-card"
        :class="{ 'day-card--active': index === activeIndex }"
        @click="$emit('selectDay', index)"
      >
        <p class="day-card__name">{{ day.name }}</p>
        <p class="day-card__date">{{ day.date }}</p>

        <!-- Иконка погоды дня -->
        <img :src="getDayIcon(day.iconType)" alt="" class="day-card__icon" />

        <!-- Температуры: макс и мин -->
        <div class="day-card__temps">
          <span class="day-card__max">+{{ day.tempMax }}°</span>
          <span class="day-card__min">+{{ day.tempMin }}°</span>
        </div>

        <p class="day-card__desc">{{ day.description }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ICONS } from '@/assets/icons.js'

const props = defineProps({
  days:        Array,   // массив дней
  isOpen:      Boolean, // показывать или скрывать прогноз
  activeIndex: Number,  // индекс выбранного дня
})

defineEmits(['toggle', 'selectDay'])

const colorMode = useColorMode()

// Возвращает иконку для карточки дня
function getDayIcon(iconType) {
  if (iconType === 'sunny') return colorMode.value === 'dark' ? ICONS.moon : ICONS.sunny
  if (iconType === 'rainy') return ICONS.rainy
  return ICONS.cloudy
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.weekly {

  // Панель с кнопками
  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  &__toggle {
    padding: 9px 22px;
    border-radius: $radius-sm;
    font-size: 13px;
    font-weight: 700;
    color: $text-gray;
    background: #EDF1F7;
    transition: background 0.2s, color 0.2s;

    // Активное состояние (когда прогноз открыт)
    &--active {
      background: $blue;
      color: $white;
      box-shadow: 0 2px 10px rgba(74, 158, 255, 0.3);
    }
  }

  &__cancel {
    font-size: 13px;
    font-weight: 600;
    color: $text-gray;
    transition: color 0.2s;

    &:hover {
      color: $blue;
    }
  }

  // Сетка 7 карточек
  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;

    @media (max-width: 1000px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 400px) {
      grid-template-columns: 1fr;
    }
  }
}

// Карточка одного дня
.day-card {
  background: $card-day;
  border-radius: $radius-md;
  padding: 14px 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #c8dff5;
    transform: translateY(-2px);
  }

  // Выбранный день
  &--active {
    background: #c4dcf4;
    border-color: #9ec8f0;
  }

  &__name {
    font-size: 13.5px;
    font-weight: 700;
    color: $text-dark;
  }

  &__date {
    font-size: 11px;
    font-weight: 600;
    color: $text-gray;
    margin-bottom: 2px;
  }

  &__icon {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  &__temps {
    display: flex;
    align-items: baseline;
    gap: 3px;
  }

  &__max {
    font-size: 17px;
    font-weight: 800;
    color: $text-dark;
  }

  &__min {
    font-size: 11px;
    font-weight: 600;
    color: $text-gray;
  }

  &__desc {
    font-size: 10.5px;
    font-weight: 600;
    color: $text-gray;
    text-align: center;
  }
}
</style>
