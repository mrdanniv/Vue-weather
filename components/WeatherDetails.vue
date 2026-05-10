<template>
  <div class="details">
    <img
      :src="ICONS.bigCloud"
      alt=""
      class="details__cloud-bg"
      style="width: 100%; height: 100%" />

    <ul class="details__list">
      <li class="details__row">
        <img :src="ICONS.temperature" alt="" class="details__icon" />
        <span class="details__label">Температура</span>
        <span class="details__value"
          >{{ temp }}° - ощущается как {{ feelsLike }}°</span
        >
      </li>

      <li class="details__row">
        <img :src="ICONS.pressure" alt="" class="details__icon" />
        <span class="details__label">Давление</span>
        <span class="details__value"
          >{{ pressure }} мм ртутного столба - нормальное</span
        >
      </li>

      <li class="details__row">
        <img :src="ICONS.rain" alt="" class="details__icon" />
        <span class="details__label">Осадки</span>
        <span class="details__value">{{ precipitation }}</span>
      </li>

      <li class="details__row">
        <img :src="ICONS.wind" alt="" class="details__icon" />
        <span class="details__label">Ветер</span>
        <span class="details__value"
          >{{ windSpeed }} м/с {{ windDir }} - {{ windDesc }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ICONS } from "@/assets/icons.js";

defineProps({
  temp: Number,
  feelsLike: Number,
  pressure: Number,
  precipitation: String,
  windSpeed: Number,
  windDir: String,
  windDesc: String,
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.details {
  background: $white;
  border-radius: $radius-lg;
  border: 1.5px solid $border;
  padding: 28px 32px;
  position: relative; // нужно для абсолютного позиционирования облака
  overflow: hidden;

  // Облако на фоне (позиционируем в правый верхний угол)
  &__cloud-bg {
    position: absolute;
    right: -40px;
    top: -30px;
    width: 420px;
    height: 240px;
    object-fit: cover;
    opacity: 0.9;
    pointer-events: none; // чтобы не мешало кликам
  }

  // Список строк с деталями
  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: relative; // поверх облака
    z-index: 1;
  }

  // Одна строка: иконка | лейбл | значение
  &__row {
    display: grid;
    grid-template-columns: 24px 110px 1fr;
    align-items: center;
    gap: 10px;
  }

  &__icon {
    width: 22px;
    height: 22px;
    object-fit: contain;
    margin: 0 auto;
  }

  &__label {
    font-size: 12.5px;
    font-weight: 600;
    color: $text-light;
  }

  &__value {
    font-size: 13.5px;
    font-weight: 600;
    color: $text-dark;
  }
}
</style>
