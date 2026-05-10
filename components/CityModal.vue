<template>
  <!-- Затемнение фона -->
  <div v-if="isOpen" class="modal-bg" @click.self="$emit('close')">
    <div class="modal">
      <!-- Заголовок -->
      <div class="modal__header">
        <h2 class="modal__title">Выбрать город</h2>
        <button class="modal__close" @click="$emit('close')">✕</button>
      </div>

      <!-- Поиск -->
      <input
        v-model="search"
        class="modal__search"
        type="text"
        placeholder="Поиск города..." />

      <!-- Список городов -->
      <ul class="modal__list">
        <li
          v-for="city in filteredCities"
          :key="city"
          class="modal__city"
          :class="{ 'modal__city--active': city === selectedCity }"
          @click="pickCity(city)">
          {{ city }}
        </li>
        <li v-if="filteredCities.length === 0" class="modal__empty">
          Город не найден
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  isOpen: Boolean,
  selectedCity: String,
});

const emit = defineEmits(["close", "selectCity"]);

// Список городов
const allCities = [
  "Ташкент",
  "Самарканд",
  "Бухара",
  "Наманган",
  "Андижан",
  "Фергана",
  "Нукус",
  "Карши",
  "Термез",
  "Коканд",
  "Маргилан",
  "Навои",

  "Санкт-Петербург",
  "Москва",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Краснодар",
  "Самара",
  "Ростов-на-Дону",
  "Омск",
  "Уфа",
  "Красноярск",
  "Воронеж",
  "Пермь",
  "Волгоград",
  "Тюмень",
];

const search = ref("");

// Фильтрация городов по введённому тексту
const filteredCities = computed(() =>
  allCities.filter((city) =>
    city.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

function pickCity(city) {
  emit("selectCity", city);
  emit("close");
  search.value = "";
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

// Затемнённый фон
.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: $white;
  border-radius: 20px;
  padding: 28px;
  width: 400px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(74, 158, 255, 0.18);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  &__title {
    font-size: 18px;
    font-weight: 800;
    color: $text-dark;
  }

  &__close {
    font-size: 18px;
    color: $text-gray;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f0f4fa;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #dde8f8;
    }
  }

  &__search {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #dde3ed;
    border-radius: $radius-sm;
    font-family: $font;
    font-size: 13px;
    color: $text-dark;
    outline: none;
    margin-bottom: 12px;
    transition: border-color 0.2s;

    &:focus {
      border-color: $blue;
    }

    &::placeholder {
      color: $text-light;
    }
  }

  &__list {
    list-style: none;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__city {
    padding: 10px 14px;
    border-radius: $radius-sm;
    font-size: 13px;
    font-weight: 600;
    color: $text-dark;
    cursor: pointer;
    transition: background 0.15s;

    &:hover {
      background: #f0f6ff;
    }

    &--active {
      background: #e8f2ff;
      color: $blue;
    }
  }

  &__empty {
    text-align: center;
    padding: 20px;
    color: $text-light;
    font-size: 13px;
  }
}
</style>
