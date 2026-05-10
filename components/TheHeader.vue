<template>
  <header class="header">
    <div class="logo">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
        <circle cx="21" cy="21" r="21" fill="#4A9EFF"/>
        <ellipse cx="25" cy="23" rx="9" ry="6.5" fill="white" fill-opacity=".97"/>
        <ellipse cx="19" cy="25" rx="7.5" ry="5.5" fill="white"/>
        <ellipse cx="29" cy="25" rx="6" ry="5" fill="white" fill-opacity=".92"/>
        <circle cx="18" cy="19" r="5" fill="white" fill-opacity=".9"/>
        <circle cx="25" cy="17" r="6" fill="white"/>
        <circle cx="31" cy="20.5" r="4" fill="white" fill-opacity=".85"/>
        <circle cx="15" cy="25" r="4" fill="#f5a623"/>
        <circle cx="15" cy="25" r="2.8" fill="#f9c74f"/>
      </svg>
      <span class="logo-text">VUE WEATHER</span>
    </div>
    <div class="header-right">
      <img
        src="/img/vec0.png"
        class="theme-btn"
        alt="theme"
        @click="$emit('toggleTheme')"
        :title="isNight ? 'Светлая тема' : 'Тёмная тема'"
      />
      <button class="city-btn" @click="$emit('openCityModal')">Выбрать город</button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ isNight: boolean }>()
defineEmits(['toggleTheme', 'openCityModal'])
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-text {
  font-size: 18px;
  font-weight: 800;
  color: $color-blue-primary;
  letter-spacing: 1px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-btn {
  width: 28px;
  height: 28px;
  object-fit: contain;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;

  &:hover { opacity: 1; }
}

.city-btn {
  padding: 9px 20px;
  border: 1.5px solid #dde3ed;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  background: var(--card-bg);
  transition: all 0.2s;

  &:hover {
    border-color: $color-blue-primary;
    color: $color-blue-primary;
  }
}
</style>
