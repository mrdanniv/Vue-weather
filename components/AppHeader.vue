<template>
  <header class="header">

    <!-- Логотип -->
    <div class="header__logo">
      <img src="/img/logo.svg" alt="Vue Weather" class="header__logo-img" />
      <span class="header__logo-text">VUE WEATHER</span>
    </div>

    <!-- Кнопки справа -->
    <div class="header__right">
      <!-- Переключение темы -->
      <img
        :src="ICONS.theme"
        alt="Тема"
        class="header__theme-btn"
        @click="$emit('toggleTheme')"
      />

      <!-- Выбрать город -->
      <button class="header__city-btn" @click="$emit('openModal')">
        Выбрать город
      </button>
    </div>

  </header>
</template>

<script setup>
import { ICONS } from '@/assets/icons.js'

// Какие события компонент отправляет наверх
defineEmits(['toggleTheme', 'openModal'])
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  // Логотип
  &__logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__logo-img {
    width: 42px;
    height: 42px;
  }

  &__logo-text {
    font-size: 18px;
    font-weight: 800;
    color: $blue;
    letter-spacing: 1px;
  }

  // Кнопки справа
  &__right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__theme-btn {
    width: 28px;
    height: 28px;
    object-fit: contain;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;

    &__right {
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>
