<template>
  <div class="weather-main">
    <!-- Temperature card -->
    <div class="temp-card">
      <div class="temp-top">
        <div>
          <div class="temp-value">{{ weather.temp }}°</div>
          <div class="temp-label">{{ weather.dayLabel }}</div>
        </div>
        <img :src="mainIcon" class="temp-icon" alt="weather" />
      </div>
      <div class="temp-info">
        <div class="temp-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#aab6c8" stroke-width="2" />
            <polyline
              points="12 6 12 12 16 14"
              stroke="#aab6c8"
              stroke-width="2"
              stroke-linecap="round" />
          </svg>
          Время: {{ weather.time }}
        </div>
        <div class="temp-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              stroke="#aab6c8"
              stroke-width="2" />
            <circle cx="12" cy="9" r="2.5" stroke="#aab6c8" stroke-width="2" />
          </svg>
          Город: {{ weather.city }}
        </div>
      </div>
    </div>

    <!-- Details card -->
    <div class="details-card">
      <div class="cloud-bg-wrap">
        <RealisticCloud :is-night="isNight" />
      </div>
      <div class="details-list">
        <div class="detail-row">
          <img src="/img/vec1.png" class="d-icon" alt="temp" />
          <span class="d-lbl">Температура</span>
          <span class="d-val"
            >{{ weather.temp }}° - ощущается как {{ weather.feelsLike }}°</span
          >
        </div>
        <div class="detail-row">
          <img src="/img/vec2.png" class="d-icon" alt="pressure" />
          <span class="d-lbl">Давление</span>
          <span class="d-val"
            >{{ weather.pressure }} мм ртутного столба - нормальное</span
          >
        </div>
        <div class="detail-row">
          <img src="/img/vec3.png" class="d-icon" alt="precip" />
          <span class="d-lbl">Осадки</span>
          <span class="d-val">{{ weather.precipitation }}</span>
        </div>
        <div class="detail-row">
          <img src="/img/vec4.png" class="d-icon" alt="wind" />
          <span class="d-lbl">Ветер</span>
          <span class="d-val"
            >{{ weather.windSpeed }} м/с {{ weather.windDir }} -
            {{ weather.windDesc }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// import RealisticCloud from "./RealisticCloud.vue";

const props = defineProps<{
  weather: {
    temp: number;
    dayLabel: string;
    time: string;
    city: string;
    iconType: string;
    feelsLike: number;
    pressure: number;
    precipitation: string;
    windSpeed: number;
    windDir: string;
    windDesc: string;
  };
  isNight: boolean;
}>();

const mainIcon = computed(() => {
  if (props.weather.iconType === "sunny")
    return props.isNight ? "/img/shadow.png" : "/img/sunny.png";
  if (props.weather.iconType === "cloudy") return "/img/sunny2.png";
  if (props.weather.iconType === "rainy") return "/img/wind2.png";
  return "/img/cloudy.png";
});
</script>

<style lang="scss" scoped>
.weather-main {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.temp-card {
  background: var(--card-bg);
  border-radius: 18px;
  padding: 28px;
  border: 1.5px solid #eef1f6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  transition: background 0.4s;
}

.temp-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.temp-value {
  font-size: 72px;
  font-weight: 800;
  color: $color-blue-primary;
  line-height: 1;
  margin-bottom: 4px;
}

.temp-label {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  transition: color 0.4s;
}

.temp-icon {
  width: 96px;
  height: 96px;
  object-fit: contain;
  flex-shrink: 0;
}

.temp-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 16px;
}

.temp-row {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-sec);
}

/* Details */
.details-card {
  background: var(--card-bg);
  border-radius: 18px;
  padding: 28px 32px;
  border: 1.5px solid #eef1f6;
  position: relative;
  overflow: hidden;
  transition: background 0.4s;
}

.cloud-bg-wrap {
  position: absolute;
  right: -40px;
  top: -30px;
  width: 420px;
  height: 240px;
  pointer-events: none;
}

.details-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;
  z-index: 1;
}

.detail-row {
  display: grid;
  grid-template-columns: 24px 110px 1fr;
  align-items: center;
  gap: 10px;
}

.d-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.d-lbl {
  font-size: 12.5px;
  color: $color-text-label;
  font-weight: 600;
}

.d-val {
  font-size: 13.5px;
  color: var(--text-primary);
  font-weight: 600;
  transition: color 0.4s;
}
</style>
